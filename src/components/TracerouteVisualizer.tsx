'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';

// Dynamic import for Leaflet (must be client-side only)
const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
});

// Add this interface at the top of the file, below imports
interface HopData {
    ip: string;
    hostname: string;
    lat: number;
    lng: number;
    rtt: number;
    city?: string;
    country?: string;
    org?: string;
    dataSource?: 'real' | 'simulated' | 'preset';
}

// Then in your component, update the geoData type
const geoData: Record<string, Array<HopData>> = {
    "google.com": [
        { ip: "192.168.1.1", hostname: "Local Router", lat: 37.7749, lng: -122.4194, rtt: 1 },
        { ip: "10.0.0.1", hostname: "ISP Gateway", lat: 37.7833, lng: -122.4167, rtt: 8 },
        { ip: "172.31.0.1", hostname: "isp-core-router.net", lat: 37.7691, lng: -122.3842, rtt: 15 },
        { ip: "172.31.5.1", hostname: "isp-backbone-1.net", lat: 37.6879, lng: -122.4702, rtt: 18 },
        { ip: "172.31.10.1", hostname: "isp-backbone-2.net", lat: 37.6038, lng: -122.3810, rtt: 20 },
        { ip: "72.14.232.1", hostname: "google-peering-1.net", lat: 37.5630, lng: -122.3255, rtt: 22 },
        { ip: "108.170.241.1", hostname: "google-edge-router.net", lat: 37.4862, lng: -122.2282, rtt: 25 },
        { ip: "108.170.241.65", hostname: "google-datacenter-router.net", lat: 37.4194, lng: -122.0745, rtt: 28 },
        { ip: "172.217.6.78", hostname: "google.com", lat: 37.4189, lng: -122.0785, rtt: 32 },
    ],
    "facebook.com": [
        { ip: "192.168.1.1", hostname: "Local Router", lat: 37.7749, lng: -122.4194, rtt: 1 },
        { ip: "10.0.0.1", hostname: "ISP Gateway", lat: 37.7833, lng: -122.4167, rtt: 7 },
        { ip: "172.31.0.1", hostname: "isp-core-router.net", lat: 37.7691, lng: -122.3842, rtt: 12 },
        { ip: "172.31.5.1", hostname: "isp-backbone-1.net", lat: 37.6879, lng: -122.4702, rtt: 16 },
        { ip: "172.31.10.1", hostname: "isp-backbone-2.net", lat: 37.6038, lng: -122.3810, rtt: 19 },
        { ip: "157.240.0.1", hostname: "facebook-peering-1.net", lat: 37.5630, lng: -122.1255, rtt: 22 },
        { ip: "157.240.0.65", hostname: "facebook-edge-router.net", lat: 37.4855, lng: -121.9413, rtt: 25 },
        { ip: "157.240.11.35", hostname: "facebook.com", lat: 37.4852, lng: -121.9413, rtt: 31 },
    ],
    "amazon.com": [
        { ip: "192.168.1.1", hostname: "Local Router", lat: 37.7749, lng: -122.4194, rtt: 1 },
        { ip: "10.0.0.1", hostname: "ISP Gateway", lat: 37.7833, lng: -122.4167, rtt: 15 },
        { ip: "54.239.17.7", hostname: "Amazon Edge", lat: 39.0438, lng: -77.4874, rtt: 55 },
        { ip: "54.239.17.7", hostname: "AWS Router", lat: 38.9697, lng: -77.3493, rtt: 68 },
        { ip: "52.94.5.73", hostname: "AWS Core", lat: 38.9, lng: -77.275, rtt: 72 },
        { ip: "54.239.28.85", hostname: "amazon.com", lat: 38.8833, lng: -77.2, rtt: 76 },
    ],
    "github.com": [
        { ip: "192.168.1.1", hostname: "Local Router", lat: 37.7749, lng: -122.4194, rtt: 1 },
        { ip: "10.0.0.1", hostname: "ISP Gateway", lat: 37.7833, lng: -122.4167, rtt: 15 },
        { ip: "140.82.114.3", hostname: "github-edge", lat: 40.7163, lng: -74.0321, rtt: 65 },
        { ip: "140.82.114.3", hostname: "github.com", lat: 40.7128, lng: -74.006, rtt: 70 },
    ],
    "custom": [] // For custom routes
};

export default function TracerouteVisualizer() {
    const [hostname, setHostname] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('');
    const [isTracing, setIsTracing] = useState(false);
    const [error, setError] = useState('');
    const [hops, setHops] = useState<Array<HopData>>([]);
    const [activeHop, setActiveHop] = useState(-1);
    const mapRef = useRef<HTMLDivElement>(null);

    const startTrace = async () => {
        let target = ''; // Declare target outside try block so it's available in catch
        try {
            setError('');
            setHops([]);
            setActiveHop(-1);

            target = hostname.trim(); // Assign to the variable declared outside
            if (!target && !selectedPreset) {
                throw new Error('Please enter a hostname or select a preset');
            }

            setIsTracing(true);

            if (selectedPreset && geoData[selectedPreset]) {
                // Use preset data
                const data = geoData[selectedPreset];

                // Mark all preset data with the correct type
                const markedData = data.map(hop => ({
                    ...hop,
                    dataSource: 'preset' as const  // Use 'as const' to ensure correct type
                }));

                // Animate tracing through hops
                let currentHop = 0;
                const interval = setInterval(() => {
                    if (currentHop < markedData.length) {
                        setHops(prevHops => [...prevHops, markedData[currentHop]]);
                        setActiveHop(currentHop);
                        currentHop++;
                    } else {
                        clearInterval(interval);
                        setIsTracing(false);
                    }
                }, 800);
            } else {
                // Move the API logic to this self-contained block with its own error handling
                try {
                    if (!target) {
                        throw new Error('Please enter a hostname or IP address');
                    }

                    console.log("Starting fallback simulation for:", target);

                    // Use a completely simulated path that doesn't depend on the API at all
                    // This ensures we always have a visualization even if the API fails
                    const simulatedHops: HopData[] = [];

                    // Starting point is always San Francisco (as an example)
                    simulatedHops.push({
                        ip: "192.168.1.1",
                        hostname: "Local Router",
                        lat: 37.7749,
                        lng: -122.4194,
                        rtt: 1,
                        city: "San Francisco",
                        country: "United States",
                        dataSource: 'simulated'
                    });

                    // Generate a random endpoint somewhere in the world
                    // These are dummy locations that will work regardless of API response
                    const destinations = [
                        { lat: 40.7128, lng: -74.006, city: "New York", country: "United States" },
                        { lat: 51.5074, lng: -0.1278, city: "London", country: "United Kingdom" },
                        { lat: 35.6762, lng: 139.6503, city: "Tokyo", country: "Japan" },
                        { lat: 1.3521, lng: 103.8198, city: "Singapore", country: "Singapore" },
                        { lat: -33.8688, lng: 151.2093, city: "Sydney", country: "Australia" }
                    ];

                    // Choose a random destination
                    const dest = destinations[Math.floor(Math.random() * destinations.length)];

                    // Generate 4-6 intermediate hops between start and destination
                    const numHops = 4 + Math.floor(Math.random() * 3);

                    // Create a more realistic path with different types of network segments
                    // 1. Local network (1-2 hops)
                    // 2. ISP network (1-2 hops)
                    // 3. Internet backbone (1-2 hops)
                    // 4. Destination network (1-2 hops)

                    // 1. Local network hops
                    simulatedHops.push({
                        ip: "10.0.0.1",
                        hostname: "gateway.home",
                        lat: 37.7749 + (Math.random() - 0.5) * 0.01,
                        lng: -122.4194 + (Math.random() - 0.5) * 0.01,
                        rtt: 2 + Math.random() * 3,
                        city: "Local Network",
                        country: "United States",
                        dataSource: 'simulated' as const
                    });

                    // 2. ISP network hops (1-2)
                    const ispHops = 1 + Math.floor(Math.random() * 2);
                    for (let i = 0; i < ispHops; i++) {
                        const ratio = (i + 1) / (numHops + 3) * 0.2; // First 20% of the journey
                        simulatedHops.push({
                            ip: `68.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                            hostname: `isp-router-${i + 1}.example.net`,
                            lat: 37.7749 + (dest.lat - 37.7749) * ratio + (Math.random() - 0.5) * 0.5,
                            lng: -122.4194 + (dest.lng - (-122.4194)) * ratio + (Math.random() - 0.5) * 0.5,
                            rtt: 5 + ratio * 40 + (Math.random() * 5),
                            city: `ISP Network ${i + 1}`,
                            country: "United States",
                            dataSource: 'simulated' as const
                        });
                    }

                    // 3. Internet backbone hops (1-2)
                    const backboneHops = 1 + Math.floor(Math.random() * 2);
                    for (let i = 0; i < backboneHops; i++) {
                        const ratio = 0.2 + (i + 1) / (numHops + 3) * 0.6; // Middle 60% of the journey
                        simulatedHops.push({
                            ip: `198.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                            hostname: `backbone-${i + 1}.transit.net`,
                            lat: 37.7749 + (dest.lat - 37.7749) * ratio + (Math.random() - 0.5) * 1,
                            lng: -122.4194 + (dest.lng - (-122.4194)) * ratio + (Math.random() - 0.5) * 1,
                            rtt: 30 + ratio * 40 + (Math.random() * 10),
                            city: getIntermediateCity(ratio, dest),
                            country: getIntermediateCountry(ratio, dest),
                            dataSource: 'simulated' as const
                        });
                    }

                    // 4. Destination network hops (1-2)
                    const destHops = 1 + Math.floor(Math.random() * 2);
                    for (let i = 0; i < destHops; i++) {
                        const ratio = 0.8 + (i + 1) / (numHops + 3) * 0.2; // Last 20% of the journey
                        simulatedHops.push({
                            ip: `203.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                            hostname: `edge-${i + 1}.${target.split('.').slice(-2).join('.')}`,
                            lat: 37.7749 + (dest.lat - 37.7749) * ratio + (Math.random() - 0.5) * 0.3,
                            lng: -122.4194 + (dest.lng - (-122.4194)) * ratio + (Math.random() - 0.5) * 0.3,
                            rtt: 60 + ratio * 30 + (Math.random() * 5),
                            city: dest.city,
                            country: dest.country,
                            dataSource: 'simulated' as const
                        });
                    }

                    // Try the IP API call, but handle any failures gracefully
                    try {
                        console.log("Attempting API call for:", target);
                        const response = await fetch(`https://ipapi.co/${target}/json/`);
                        if (response.ok) {
                            const ipData = await response.json();
                            console.log("API response:", ipData);

                            // Only use the API data if it's valid and complete
                            if (ipData &&
                                typeof ipData === 'object' &&
                                !ipData.error &&
                                typeof ipData.ip === 'string' &&  // Ensure ip is a string
                                typeof ipData.latitude === 'number' &&
                                typeof ipData.longitude === 'number') {

                                // Make sure simulatedHops array has elements and access the last hop safely
                                if (simulatedHops.length > 0) {
                                    try {
                                        // Create a safety copy of the last hop with all required fields
                                        const lastHopIndex = simulatedHops.length - 1;
                                        const safeHopData: HopData = {
                                            ip: String(ipData.ip || 'Unknown'),
                                            hostname: target,
                                            lat: Number(ipData.latitude),
                                            lng: Number(ipData.longitude),
                                            rtt: simulatedHops[lastHopIndex].rtt, // Preserve the original RTT
                                            city: String(ipData.city || dest.city || 'Unknown'),
                                            country: String(ipData.country_name || dest.country || 'Unknown'),
                                            dataSource: 'real' as const  // Use 'as const' to ensure correct type
                                        };

                                        // Replace the last hop completely instead of modifying individual properties
                                        simulatedHops[lastHopIndex] = safeHopData;

                                        console.log("Successfully updated destination with real data:", safeHopData);
                                    } catch (updateError) {
                                        console.error("Error updating last hop:", updateError);
                                        // Continue with simulation using original data if update fails
                                    }
                                }
                            } else {
                                console.log("API response was invalid, using simulated destination");
                            }
                        } else {
                            console.log("API call failed:", response.status);
                        }
                    } catch (apiError) {
                        console.error("API call error:", apiError);
                        // Just log the error but continue with the simulation
                    }

                    // Animate tracing through hops - this happens regardless of API success/failure
                    let currentHop = 0;
                    const interval = setInterval(() => {
                        if (currentHop < simulatedHops.length) {
                            setHops(prevHops => [...prevHops, simulatedHops[currentHop]]);
                            setActiveHop(currentHop);
                            currentHop++;
                        } else {
                            clearInterval(interval);
                            setIsTracing(false);
                        }
                    }, 800);

                } catch (err: any) {
                    console.error("General error in custom trace:", err);
                    setError(`Error: ${err.message || 'Unknown error occurred'}`);
                    setIsTracing(false);
                }
            }
        } catch (err: any) {
            console.error("General error:", err);
            setError(`Error: ${err.message || 'Unknown error occurred'}`);
            setIsTracing(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card className='py-0 '>
                <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white">
                    <CardTitle className='py-6'>Traceroute Visualizer</CardTitle>
                </CardHeader>
                <CardContent className=" p-2 sm:p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 mb-1">
                                    Hostname or IP Address:
                                </label>
                                <input
                                    type="text"
                                    id="hostname"
                                    value={hostname}
                                    onChange={(e) => {
                                        setHostname(e.target.value);
                                        setSelectedPreset('');
                                    }}
                                    placeholder="e.g., example.com"
                                    className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={isTracing}
                                />
                            </div>
                            <div>
                                <label htmlFor="preset" className="block text-sm font-medium text-gray-700 mb-1">
                                    Or Select Preset:
                                </label>
                                <select
                                    id="preset"
                                    value={selectedPreset}
                                    onChange={(e) => {
                                        setSelectedPreset(e.target.value);
                                        setHostname('');
                                    }}
                                    className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={isTracing}
                                >
                                    <option value="">-- Select a preset --</option>
                                    <option value="google.com">Google</option>
                                    <option value="facebook.com">Facebook</option>
                                    <option value="amazon.com">Amazon</option>
                                    <option value="github.com">GitHub</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={startTrace}
                                disabled={isTracing}
                                className="bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:bg-indigo-300"
                            >
                                {isTracing ? 'Tracing...' : 'Start Trace'}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded border border-red-200">
                                Error: {error}
                            </div>
                        )}

                        {hops.length > 0 && (
                            <div className="mt-6 space-y-6">
                                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden h-[400px]">
                                    <LeafletMap
                                        hops={hops.filter(hop => hop !== undefined && typeof hop === 'object')}
                                        activeHop={activeHop}
                                    />
                                </div>

                                <div className="mb-3 text-sm text-gray-600">
                                    <p className="font-medium mb-1">Table Explanation:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><span className="font-medium">Hop:</span> The sequence number of the router or server in the path.</li>
                                        <li><span className="font-medium">IP Address:</span> The network address of the router or server.</li>
                                        <li><span className="font-medium">Hostname:</span> The domain name of the router or server (when available).</li>
                                        <li><span className="font-medium">RTT (ms):</span> Round-Trip Time in milliseconds - how long it takes for a packet to reach the hop and return.</li>
                                        <li><span className="font-medium">Location:</span> The geographic location of the hop (city and country).</li>
                                        <li><span className="font-medium">Data Source:</span> Indicates whether the data is real (from IP geolocation), from our preset examples, or simulated.</li>
                                    </ul>
                                </div>

                                <div className="overflow-x-auto ">
                                    <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hop</th>
                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hostname</th>
                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">RTT</th>
                                                <th className="hidden md:table-cell px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                                <th className="hidden sm:table-cell px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data Source</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {hops
                                                .filter(hop => hop !== undefined && typeof hop === 'object')
                                                .map((hop, index) => (
                                                    <tr key={index} className={index === activeHop ? 'bg-indigo-50' : 'bg-white'}>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">{index + 1}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-mono text-gray-900 truncate max-w-[100px] sm:max-w-none">{hop?.ip || 'Unknown'}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 truncate max-w-[100px] sm:max-w-none">{hop?.hostname || 'Unknown'}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">{hop?.rtt !== undefined ? `${hop.rtt} ms` : 'Unknown'}</td>
                                                        <td className="hidden md:table-cell px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">
                                                            {hop?.city && hop.city !== 'Unknown'
                                                                ? `${hop.city}, ${hop?.country || ''}`
                                                                : 'Unknown'
                                                            }
                                                        </td>
                                                        <td className="hidden sm:table-cell px-2 sm:px-4 py-2 text-xs sm:text-sm">
                                                            {hop?.dataSource === 'real' ? (
                                                                <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Real
                                                                </span>
                                                            ) : hop?.dataSource === 'preset' ? (
                                                                <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    Preset
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    Sim
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Add a mobile-only summary for the active hop */}
                                <div className="md:hidden mt-4 bg-indigo-50 p-3 rounded-lg">
                                    <h3 className="font-medium text-sm mb-1">Active Hop Details:</h3>
                                    {activeHop >= 0 && activeHop < hops.length && (
                                        <div className="text-xs space-y-1">
                                            <p><span className="font-medium">Location:</span> {hops[activeHop]?.city ? `${hops[activeHop].city}, ${hops[activeHop]?.country || ''}` : 'Unknown'}</p>
                                            <p><span className="font-medium">Data Source:</span> {hops[activeHop]?.dataSource === 'real' ? 'Real Data' : hops[activeHop]?.dataSource === 'preset' ? 'Preset Data' : 'Simulated'}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Update the legend to be responsive */}
                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <div className="flex items-center">
                                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                                        <span className="text-xs sm:text-sm">Real Data</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                                        <span className="text-xs sm:text-sm">Preset Data</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                                        <span className="text-xs sm:text-sm">Simulated</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-indigo-50 p-4 rounded text-sm text-indigo-800 mt-4">
                            <p className="font-semibold mb-2">Understanding This Visualization:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><span className="font-medium">What's Real:</span> For custom hostnames, we attempt to get the actual geographic location of the destination server using IP geolocation. This is marked as "Real Data" in the table.</li>
                                <li><span className="font-medium">What's Simulated:</span> Due to browser security restrictions, we cannot perform actual network traceroutes. The intermediate hops between your location and the destination are simulated based on typical network paths.</li>
                                <li><span className="font-medium">Starting Point:</span> The starting point is always shown as San Francisco (for demonstration purposes) and doesn't represent your actual location.</li>
                                <li><span className="font-medium">Preset Data:</span> When using preset destinations (Google, Facebook, etc.), we use predefined paths that approximate real-world routes but are not live data.</li>
                                <li><span className="font-medium">Accuracy:</span> Even when using real IP geolocation data, the locations shown are approximate and may be off by significant distances, especially for network infrastructure.</li>
                            </ul>
                            <p className="mt-2">For actual network diagnostics, use your operating system's traceroute/tracert command or a dedicated network tool.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Add these helper functions for more realistic city/country names
function getIntermediateCity(ratio: number, dest: any) {
    // List of major internet exchange cities
    const cities = [
        "Chicago", "Dallas", "Miami", "New York", "Seattle", "Los Angeles",
        "London", "Amsterdam", "Frankfurt", "Paris", "Tokyo", "Singapore",
        "Sydney", "Toronto", "Hong Kong"
    ];

    // Pick a city based on the ratio of the journey
    const cityIndex = Math.floor(ratio * cities.length);
    return cities[Math.min(cityIndex, cities.length - 1)];
}

function getIntermediateCountry(ratio: number, dest: any) {
    // Simplified - in reality would depend on the actual path
    if (dest.country === "United States") return "United States";

    const countries = [
        "United States", "United Kingdom", "Germany", "France",
        "Japan", "Singapore", "Australia", "Canada", "Hong Kong"
    ];

    const countryIndex = Math.floor(ratio * countries.length);
    return countries[Math.min(countryIndex, countries.length - 1)];
} 