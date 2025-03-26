"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const dotenv_1 = __importDefault(require("dotenv"));
const execPromise = util_1.default.promisify(child_process_1.exec);
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3002' || 'https://networking-tools.vercel.app/';
const MAC_VENDOR_API = 'https://api.macvendors.com';
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
}));
// MAC lookup endpoint
app.get('/api/mac-lookup', async (req, res) => {
    try {
        const mac = req.query.mac;
        if (!mac) {
            return res.status(400).json({ error: 'MAC address is required' });
        }
        const response = await fetch(`${MAC_VENDOR_API}/${mac}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ error: 'Vendor not found for this MAC address' });
            }
            throw new Error('Failed to fetch vendor information');
        }
        const vendorName = await response.text();
        const data = {
            vendorName,
            macAddress: mac,
            isPrivate: mac.toLowerCase().startsWith('02:'),
            type: mac.toLowerCase().charAt(1) === '2' ? 'Locally Administered' : 'Globally Unique',
            cast: parseInt(mac.charAt(1), 16) % 2 === 0 ? 'Unicast' : 'Multicast'
        };
        res.json(data);
    }
    catch (error) {
        console.error('MAC lookup error:', error);
        res.status(500).json({ error: 'Failed to lookup MAC address' });
    }
});
// Traceroute endpoint
app.post('/api/traceroute', async (req, res) => {
    try {
        const { hostname } = req.body;
        if (!hostname) {
            return res.status(400).json({ error: 'Hostname is required' });
        }
        if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) {
            return res.status(400).json({ error: 'Invalid hostname format' });
        }
        const resolveCmd = process.platform === 'win32'
            ? `nslookup ${hostname} | findstr /R /C:"Address:"`
            : `dig +short ${hostname}`;
        const { stdout: resolveOutput } = await execPromise(resolveCmd);
        const destinationIP = resolveOutput.split('\n')[0].trim();
        if (!destinationIP || !/^\d+\.\d+\.\d+\.\d+$/.test(destinationIP)) {
            return res.status(400).json({ error: 'Could not resolve hostname to IP' });
        }
        const tracerouteCmd = process.platform === 'win32'
            ? `tracert -d ${hostname}`
            : `traceroute -q 1 -m 30 ${hostname}`;
        const { stdout } = await execPromise(tracerouteCmd);
        const hops = parseTracerouteOutput(stdout, destinationIP);
        const hopsWithGeo = await Promise.all(hops.map(async (hop) => {
            if (hop.ip === '*') {
                return { ...hop, lat: null, lng: null, city: null, country: null };
            }
            try {
                const geoResponse = await fetch(`http://ip-api.com/json/${hop.ip}`);
                const geoData = await geoResponse.json();
                return {
                    ...hop,
                    lat: geoData.lat,
                    lng: geoData.lon,
                    city: geoData.city || 'Unknown',
                    country: geoData.country || 'Unknown',
                    network: geoData.network || 'Unknown',
                    asn: geoData.as || 'Unknown',
                    isp: geoData.isp || 'Unknown',
                };
            }
            catch {
                return { ...hop, lat: null, lng: null, city: null, country: null };
            }
        }));
        res.json({ hostname, destinationIP, hops: hopsWithGeo });
    }
    catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Helper function to parse traceroute output
function parseTracerouteOutput(output, destinationIP) {
    const lines = output.split('\n').filter(line => line.trim() !== '');
    const hopLines = lines.slice(1);
    const hops = [];
    for (let line of hopLines) {
        const match = line.match(/^\s*(\d+)\s+(?:([^\s]+)\s+\(([^\)]+)\)|(\*))(?:\s+(\d+\.\d+)\s*ms)?/);
        if (!match)
            continue;
        const hop = {
            hop: parseInt(match[1], 10),
            hostname: match[2] || '*',
            ip: match[3] || '*',
            rtt: match[5] ? parseFloat(match[5]) : null,
        };
        hops.push(hop);
        if (hop.ip === destinationIP)
            break;
    }
    return hops;
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
