'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IPConverterTool() {
    const [ipAddress, setIpAddress] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const convertIP = () => {
        try {
            setError('');

            // Basic validation
            const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
            const match = ipAddress.match(ipPattern);

            if (!match) {
                throw new Error('Invalid IP address format. Should be like 192.168.1.1');
            }

            // Parse IP address
            const ipParts = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4])];

            for (const part of ipParts) {
                if (part < 0 || part > 255) {
                    throw new Error('IP address parts must be between 0 and 255');
                }
            }

            // Convert to binary
            const binaryParts = ipParts.map(part => part.toString(2).padStart(8, '0'));
            const binaryIP = binaryParts.join('.');

            // Convert to hexadecimal
            const hexParts = ipParts.map(part => part.toString(16).padStart(2, '0').toUpperCase());
            const hexIP = hexParts.join('.');

            // Convert to decimal
            const decimalIP = (ipParts[0] * 16777216) + (ipParts[1] * 65536) + (ipParts[2] * 256) + ipParts[3];

            // Determine IP class
            let ipClass = '';
            if (ipParts[0] >= 0 && ipParts[0] <= 127) ipClass = 'A';
            else if (ipParts[0] >= 128 && ipParts[0] <= 191) ipClass = 'B';
            else if (ipParts[0] >= 192 && ipParts[0] <= 223) ipClass = 'C';
            else if (ipParts[0] >= 224 && ipParts[0] <= 239) ipClass = 'D (Multicast)';
            else if (ipParts[0] >= 240 && ipParts[0] <= 255) ipClass = 'E (Reserved)';

            // Determine if private
            let isPrivate = false;
            if (
                (ipParts[0] === 10) ||
                (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
                (ipParts[0] === 192 && ipParts[1] === 168)
            ) {
                isPrivate = true;
            }

            // Determine if special
            let specialType = '';
            if (ipParts[0] === 127) specialType = 'Loopback';
            else if (ipParts[0] === 169 && ipParts[1] === 254) specialType = 'Link-local';
            else if (ipParts[0] === 0) specialType = 'This Network';
            else if (ipParts[0] === 255 && ipParts[1] === 255 && ipParts[2] === 255 && ipParts[3] === 255) specialType = 'Broadcast';

            setResult({
                dotted: ipAddress,
                binary: binaryIP,
                hexadecimal: hexIP,
                decimal: decimalIP,
                ipClass,
                isPrivate,
                specialType
            });
        } catch (err: any) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <Card className="overflow-hidden shadow-md py-0 border-sky-200 mb-6">
                <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold">IP Address Converter Tool</CardTitle>
                    <p className="text-sky-100 text-sm sm:text-base">Convert IP addresses between different formats</p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="mb-4">
                        <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter IP Address:
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <input
                                type="text"
                                id="ipAddress"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                placeholder="e.g., 192.168.1.1"
                                className="w-full p-2 text-sm sm:text-base border rounded sm:rounded-r-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                onClick={convertIP}
                                className="w-full sm:w-auto bg-sky-600 text-white px-4 py-2 text-sm sm:text-base rounded sm:rounded-l-none hover:bg-sky-700 transition"
                            >
                                Convert
                            </button>
                        </div>
                        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="overflow-hidden shadow-xl border-sky-200  ">
                    <div className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold">IP Conversion Results</h2>
                        <p className="opacity-90 text-sm sm:text-base">IP: {result.dotted}</p>
                    </div>

                    <CardContent className="p-2 sm:p-6">
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div className="form-card">
                                <h3 className="text-base sm:text-lg font-semibold text-sky-800 mb-3">IP Address Formats</h3>
                                <div className="space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="font-medium text-sky-700">Dotted Decimal:</span>
                                        <span className="font-mono text-sm sm:text-base break-all">{result.dotted}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="font-medium text-sky-700">Binary:</span>
                                        <span className="font-mono text-xs sm:text-sm break-all">{result.binary}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="font-medium text-sky-700">Hexadecimal:</span>
                                        <span className="font-mono text-sm sm:text-base break-all">{result.hexadecimal}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="font-medium text-sky-700">Decimal (32-bit):</span>
                                        <span className="font-mono text-sm sm:text-base break-all">{result.decimal}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-card">
                                <h3 className="text-base sm:text-lg font-semibold text-sky-800 mb-3">IP Classification</h3>
                                <div className="space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="font-medium text-sky-700">IP Class:</span>
                                        <span className="font-mono text-sm sm:text-base">Class {result.ipClass}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                        <span className="font-medium text-sky-700">Address Type:</span>
                                        <span className="font-mono text-sm sm:text-base">{result.isPrivate ? 'Private' : 'Public'}</span>
                                    </div>
                                    {result.specialType && (
                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                            <span className="font-medium text-sky-700">Special Type:</span>
                                            <span className="font-mono text-sm sm:text-base">{result.specialType}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-sky-50 p-3 sm:p-4 rounded-lg border border-sky-200">
                            <h3 className="text-base sm:text-lg font-semibold text-sky-800 mb-2">IP Address Information</h3>
                            <p className="text-xs sm:text-sm text-gray-700">
                                {result.isPrivate
                                    ? 'This is a private IP address intended for use within private networks.'
                                    : 'This is a public IP address used on the global internet.'}
                                {result.specialType && ` It is a ${result.specialType.toLowerCase()} address.`}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-700 mt-2">
                                Class {result.ipClass} addresses {result.ipClass === 'A'
                                    ? 'have the first bit as 0 and use the first octet for the network portion.'
                                    : result.ipClass === 'B'
                                        ? 'start with bits 10 and use the first two octets for the network portion.'
                                        : result.ipClass === 'C'
                                            ? 'start with bits 110 and use the first three octets for the network portion.'
                                            : result.ipClass === 'D (Multicast)'
                                                ? 'are used for multicast groups.'
                                                : 'are reserved for experimental use.'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 