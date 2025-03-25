'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MACAddressLookupTool() {
    const [macAddress, setMacAddress] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const lookupVendor = () => {
        try {
            setError('');
            setResult(null);

            // Clean up MAC address format
            const cleanMac = macAddress.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();

            // Validate MAC address format
            if (cleanMac.length !== 12) {
                throw new Error('Invalid MAC address format. Please enter a valid MAC address.');
            }

            // Format MAC address with colons
            const formattedMac = cleanMac.match(/.{2}/g)?.join(':') || '';
            const oui = formattedMac.substring(0, 8);

            // Lookup vendor in database
            const vendor = macVendorDatabase[oui];
            if (!vendor) {
                throw new Error('Vendor not found for this MAC address.');
            }

            setResult({
                originalMac: macAddress,
                formattedMac: formattedMac,
                vendor: vendor,
                oui: oui,
                type: formattedMac[1] === '2' ? 'Locally Administered' : 'Globally Unique',
                unicast: parseInt(formattedMac[1], 16) % 2 === 0 ? 'Unicast' : 'Multicast'
            });

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>MAC Address Lookup</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="mac" className="block text-sm font-medium text-gray-700 mb-1">
                                MAC Address:
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="mac"
                                    value={macAddress}
                                    onChange={(e) => setMacAddress(e.target.value)}
                                    placeholder="e.g., 00:00:0C:12:34:56"
                                    className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={lookupVendor}
                                    className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
                                >
                                    Lookup
                                </button>
                            </div>
                            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                        </div>

                        {result && (
                            <div className="mt-4 space-y-4">
                                <div className="bg-gray-50 p-4 rounded border">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Results</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Formatted MAC:</span>
                                            <span className="font-mono">{result.formattedMac}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Vendor:</span>
                                            <span>{result.vendor}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">OUI:</span>
                                            <span className="font-mono">{result.oui}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Address Type:</span>
                                            <span>{result.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Cast Type:</span>
                                            <span>{result.unicast}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Sample MAC address vendor database (abbreviated)
const macVendorDatabase: Record<string, string> = {
    "00:00:0C": "Cisco Systems",
    "00:01:42": "Cisco Systems",
    "00:03:6B": "Cisco Systems",
    "00:04:9A": "Cisco Systems",
    "00:0A:41": "Cisco Systems",
    "00:0B:FD": "Cisco Systems",
    "00:0E:38": "Cisco Systems",
    "00:1A:A1": "Cisco Systems",
    "00:1B:54": "Cisco Systems",
    "00:00:0E": "Fujitsu Limited",
    "00:00:0F": "Next, Inc.",
    "00:00:10": "Sytek Inc.",
    "00:00:11": "Nortel Networks",
    "00:00:12": "Digital Equipment Corporation",
    "00:00:13": "Xerox Corporation",
    "00:00:14": "Netronix",
    "00:00:39": "TOSHIBA CORPORATION",
    "00:00:F0": "SAMSUNG ELECTRONICS CO., LTD.",
    // Add more vendors as needed
}; 