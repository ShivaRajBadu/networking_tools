'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from 'lucide-react';

interface MACLookupResult {
    vendorName: string;
    macAddress: string;
    isPrivate: boolean;
    type: string;
    cast: string;
}

export default function MACAddressLookupTool() {
    const [macAddress, setMacAddress] = useState('');
    const [result, setResult] = useState<MACLookupResult | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const lookupVendor = async () => {
        try {
            setError('');
            setResult(null);
            setIsLoading(true);

            // Clean up MAC address format
            const cleanMac = macAddress.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();

            // Validate MAC address format
            if (cleanMac.length !== 12) {
                throw new Error('Invalid MAC address format. Please enter a valid MAC address.');
            }

            // Format MAC address with colons for display
            const formattedMac = cleanMac.match(/.{2}/g)?.join(':') || '';

            const response = await fetch(`/api/mac-lookup?mac=${formattedMac}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to fetch vendor information');
            }

            const data = await response.json();
            setResult(data);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 w-full  mx-auto px-0 sm:px-6">
            <Card className="border-t-4 border-t-sky-500 shadow-lg">
                <CardHeader className="sm:px-6">
                    <CardTitle className="text-xl sm:text-2xl text-sky-900 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        MAC Address Lookup
                    </CardTitle>
                </CardHeader>
                <CardContent className="sm:px-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="mac" className="block text-sm font-medium text-gray-700 mb-1">
                                Enter MAC Address:
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    id="mac"
                                    value={macAddress}
                                    onChange={(e) => setMacAddress(e.target.value)}
                                    placeholder="e.g., 00:00:0C:12:34:56"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 bg-gray-50"
                                />
                                <button
                                    onClick={lookupVendor}
                                    disabled={isLoading}
                                    className="w-full sm:w-auto cursor-pointer bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isLoading ? 'Looking...' : 'Lookup'}
                                </button>
                            </div>
                            {error && (
                                <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    <span className="flex-1">{error}</span>
                                </div>
                            )}
                        </div>

                        {result && (
                            <div className="mt-6 animate-fadeIn">
                                <div className="bg-gradient-to-r from-sky-50 to-white p-4 sm:p-6 rounded-lg border">
                                    <h3 className="text-lg sm:text-xl font-semibold text-sky-900 mb-4">MAC Address Details</h3>
                                    <div className="grid gap-3 sm:gap-4">
                                        <InfoItem
                                            label="Vendor"
                                            value={result.vendorName}
                                            highlight={true}
                                        />
                                        <InfoItem
                                            label="MAC Address"
                                            value={result.macAddress}
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <InfoItem
                                                label="Address Type"
                                                value={result.type}
                                            />
                                            <InfoItem
                                                label="Cast Type"
                                                value={result.cast}
                                            />
                                        </div>
                                        {result.isPrivate && (
                                            <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 text-sm rounded">
                                                <p className="break-words">Note: This is a locally administered address</p>
                                            </div>
                                        )}
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

function InfoItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`p-3 rounded-lg border ${highlight ? 'bg-sky-50 border-sky-200' : 'bg-white'}`}>
            <div className="text-sm text-gray-500">{label}</div>
            <div className="font-medium text-gray-900 break-words">{value || 'N/A'}</div>
        </div>
    );
} 