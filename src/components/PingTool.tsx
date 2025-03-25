'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PingTool() {
    const [host, setHost] = useState('');
    const [isPinging, setIsPinging] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [pingCount, setPingCount] = useState(4);

    const startPing = () => {
        try {
            setError('');

            if (!host.trim()) {
                throw new Error('Please enter a hostname or IP address');
            }

            // Validate hostname/IP format
            const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
            const hostnamePattern = /^[a-zA-Z0-9]([a-zA-Z0-9\-\.]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;

            if (!ipPattern.test(host) && !hostnamePattern.test(host)) {
                throw new Error('Please enter a valid hostname or IP address');
            }

            setIsPinging(true);
            setResults([`Pinging ${host}...`]);

            // Since we can't actually ping from the browser, we'll simulate it
            simulatePing();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const simulatePing = () => {
        let count = 0;
        const newResults = [`Pinging ${host}...`];
        setResults(newResults);

        const interval = setInterval(() => {
            count++;

            // Simulate random ping times between 10-200ms
            const pingTime = Math.floor(Math.random() * 190) + 10;

            // Occasionally simulate packet loss
            if (Math.random() > 0.9) {
                newResults.push(`Request timed out.`);
            } else {
                newResults.push(`Reply from ${host}: time=${pingTime}ms`);
            }

            setResults([...newResults]);

            if (count >= pingCount) {
                clearInterval(interval);
                setIsPinging(false);

                // Calculate statistics
                const successfulPings = newResults.filter(r => r.includes('time=')).length;
                const packetLoss = ((pingCount - successfulPings) / pingCount) * 100;
                const pingTimes = newResults
                    .filter(r => r.includes('time='))
                    .map(r => parseInt(r.split('time=')[1].split('ms')[0]));

                const avgPing = pingTimes.length > 0
                    ? Math.round(pingTimes.reduce((a, b) => a + b, 0) / pingTimes.length)
                    : 0;

                newResults.push('');
                newResults.push(`Ping statistics for ${host}:`);
                newResults.push(`    Packets: Sent = ${pingCount}, Received = ${successfulPings}, Lost = ${pingCount - successfulPings} (${packetLoss}% loss)`);

                if (pingTimes.length > 0) {
                    newResults.push('Approximate round trip times in milli-seconds:');
                    newResults.push(`    Minimum = ${Math.min(...pingTimes)}ms, Maximum = ${Math.max(...pingTimes)}ms, Average = ${avgPing}ms`);
                }

                setResults([...newResults]);
            }
        }, 1000);
    };

    const stopPing = () => {
        setIsPinging(false);
    };

    return (
        <div>
            <Card className="overflow-hidden shadow-md border-sky-200 mb-6 py-0">
                <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-6">
                    <CardTitle className="text-xl font-bold">Ping Tool</CardTitle>
                    <p className="text-sky-100">Test network connectivity to a host</p>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-4">
                        <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">
                            Hostname or IP Address:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="host"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                placeholder="e.g., google.com or 8.8.8.8"
                                className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                                disabled={isPinging}
                            />
                            <select
                                value={pingCount}
                                onChange={(e) => setPingCount(parseInt(e.target.value))}
                                className="p-2 border-y bg-gray-50"
                                disabled={isPinging}
                            >
                                <option value="4">4 pings</option>
                                <option value="8">8 pings</option>
                                <option value="16">16 pings</option>
                                <option value="32">32 pings</option>
                            </select>
                            {!isPinging ? (
                                <button
                                    onClick={startPing}
                                    className="bg-sky-600 text-white px-4 py-2 rounded-r hover:bg-sky-700 transition"
                                >
                                    Ping
                                </button>
                            ) : (
                                <button
                                    onClick={stopPing}
                                    className="bg-red-600 text-white px-4 py-2 rounded-r hover:bg-red-700 transition"
                                >
                                    Stop
                                </button>
                            )}
                        </div>
                        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                    </div>

                    {results.length > 0 && (
                        <div className="mt-4">
                            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-80 overflow-y-auto">
                                {results.map((result, index) => (
                                    <div key={index}>{result}</div>
                                ))}
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Note: This is a simulated ping as browsers cannot send actual ICMP packets.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 