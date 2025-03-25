'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CIDRCalculatorTool() {
    const [cidr, setCidr] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const calculateCIDR = () => {
        try {
            setError('');

            // Basic validation
            const cidrPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/;
            const match = cidr.match(cidrPattern);

            if (!match) {
                throw new Error('Invalid CIDR notation. Format should be like 192.168.1.0/24');
            }

            const prefix = parseInt(match[5]);
            if (prefix < 0 || prefix > 32) {
                throw new Error('Prefix must be between 0 and 32');
            }

            // Parse IP address
            const ipParts = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4])];

            for (const part of ipParts) {
                if (part < 0 || part > 255) {
                    throw new Error('IP address parts must be between 0 and 255');
                }
            }

            // Calculate subnet mask
            const subnetMaskBinary = '1'.repeat(prefix) + '0'.repeat(32 - prefix);
            const subnetMaskParts = [
                parseInt(subnetMaskBinary.slice(0, 8), 2),
                parseInt(subnetMaskBinary.slice(8, 16), 2),
                parseInt(subnetMaskBinary.slice(16, 24), 2),
                parseInt(subnetMaskBinary.slice(24, 32), 2)
            ];

            // Calculate network address
            const networkParts = ipParts.map((part, i) => part & subnetMaskParts[i]);

            // Calculate broadcast address
            const invertedMaskParts = subnetMaskParts.map(part => 255 - part);
            const broadcastParts = ipParts.map((part, i) => part | invertedMaskParts[i]);

            // Calculate first and last usable addresses
            const firstUsableParts = [...networkParts];
            const lastUsableParts = [...broadcastParts];

            if (prefix < 31) {
                firstUsableParts[3] += 1;
                lastUsableParts[3] -= 1;
            }

            // Calculate total hosts
            const totalHosts = Math.pow(2, 32 - prefix);
            const usableHosts = prefix < 31 ? totalHosts - 2 : totalHosts;

            setResult({
                networkAddress: networkParts.join('.'),
                subnetMask: subnetMaskParts.join('.'),
                broadcastAddress: broadcastParts.join('.'),
                firstUsableAddress: firstUsableParts.join('.'),
                lastUsableAddress: lastUsableParts.join('.'),
                totalHosts: totalHosts,
                usableHosts: usableHosts,
                binarySubnetMask: subnetMaskBinary.match(/.{1,8}/g)?.join('.'),
                wildcardMask: invertedMaskParts.join('.'),
                ipAddress: ipParts.join('.'),
                cidrNotation: `/${prefix}`,
                binaryIp: ipParts.map(part => part.toString(2).padStart(8, '0')).join('.'),
                prefix: prefix
            });
        } catch (err: any) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <Card className="overflow-hidden shadow-md border-sky-200 mb-6">
                <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-6">
                    <CardTitle className="text-xl font-bold">CIDR Calculator Tool</CardTitle>
                    <p className="text-sky-100">Enter CIDR notation to calculate network details</p>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-4">
                        <label htmlFor="cidr" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter CIDR Notation:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="cidr"
                                value={cidr}
                                onChange={(e) => setCidr(e.target.value)}
                                placeholder="e.g., 192.168.1.0/24"
                                className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                onClick={calculateCIDR}
                                className="bg-sky-600 text-white px-4 py-2 rounded-r hover:bg-sky-700 transition"
                            >
                                Calculate
                            </button>
                        </div>
                        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="overflow-hidden shadow-xl border-sky-200">
                    <div className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-6">
                        <h2 className="text-2xl font-bold">CIDR Calculation Results</h2>
                        <p className="opacity-90">IP: {result.ipAddress}{result.cidrNotation}</p>
                    </div>

                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="form-card">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Network Information</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">IP Address:</span>
                                        <span className="font-mono">{result.ipAddress}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Network Address:</span>
                                        <span className="font-mono">{result.networkAddress}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Broadcast Address:</span>
                                        <span className="font-mono">{result.broadcastAddress}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Usable Host Range:</span>
                                        <span className="font-mono">{result.firstUsableAddress} - {result.lastUsableAddress}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-card">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Subnet Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Subnet Mask:</span>
                                        <span className="font-mono">{result.subnetMask}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">CIDR Notation:</span>
                                        <span className="font-mono">{result.cidrNotation}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Wildcard Mask:</span>
                                        <span className="font-mono">{result.wildcardMask}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Total Hosts:</span>
                                        <span className="font-mono">{result.totalHosts.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="form-card">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Binary Representation</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">IP Binary:</span>
                                        <span className="font-mono text-xs">{result.binaryIp}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Subnet Binary:</span>
                                        <span className="font-mono text-xs">{result.binarySubnetMask}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-card">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Network Size</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Total Addresses:</span>
                                        <span className="font-mono">{result.totalHosts.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Usable Hosts:</span>
                                        <span className="font-mono">{result.usableHosts.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Prefix Length:</span>
                                        <span className="font-mono">{result.cidrNotation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <div className="p-6 bg-sky-50 flex justify-between items-center border-t border-sky-200">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Results
                        </button>
                    </div>
                </Card>
            )}
        </div>
    );
} 