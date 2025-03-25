'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DNSLookupTool() {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const performLookup = async () => {
        try {
            setError('');
            setResults(null);
            setIsLoading(true);

            // Using public DNS API
            const response = await fetch(`https://dns.google/resolve?name=${domain}`);
            const data = await response.json();

            if (data.Status === 0) { // 0 means no error
                setResults(data);
            } else {
                throw new Error('DNS lookup failed');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>DNS Lookup</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                                Domain Name:
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="domain"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    placeholder="e.g., example.com"
                                    className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={performLookup}
                                    disabled={isLoading}
                                    className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition disabled:bg-sky-300"
                                >
                                    {isLoading ? 'Looking up...' : 'Lookup'}
                                </button>
                            </div>
                            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                        </div>

                        {results && (
                            <div className="mt-4 space-y-4">
                                <div className="bg-gray-50 p-4 rounded border">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">DNS Records</h3>
                                    <div className="space-y-2">
                                        {results.Answer?.map((record: any, index: number) => (
                                            <div key={index} className="flex justify-between p-2 bg-white rounded border">
                                                <span className="font-medium text-sky-700">
                                                    {record.type === 1 ? 'A' :
                                                        record.type === 5 ? 'CNAME' :
                                                            record.type === 28 ? 'AAAA' :
                                                                record.type === 15 ? 'MX' :
                                                                    record.type === 16 ? 'TXT' : 'Other'} Record
                                                </span>
                                                <span className="font-mono">{record.data}</span>
                                            </div>
                                        ))}
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