'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculateIPv4Subnet, calculateIPv6Subnet } from '../utils/subnetting';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResultPage = () => {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cip = searchParams.get('cip');
        const ctype = searchParams.get('ctype');

        if (ctype === 'ipv4') {
            const csubnet = searchParams.get('csubnet');
            const cclass = searchParams.get('cclass');
            const calculationResult = calculateIPv4Subnet(cip || '', csubnet || '', cclass || 'Any');
            setResult({ type: 'ipv4', data: calculationResult });
        } else if (ctype === 'ipv6') {
            const cprefix = searchParams.get('cprefix');
            const calculationResult = calculateIPv6Subnet(cip || '', parseInt(cprefix || '64', 10));
            setResult({ type: 'ipv6', data: calculationResult });
        }

        setLoading(false);
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-50 to-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-600"></div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-50 to-white">
                <Card className="p-8 text-center shadow-lg border-rose-200">
                    <CardTitle className="text-2xl font-bold text-rose-600 mb-4">No Results Found</CardTitle>
                    <CardContent>
                        <p className="mb-6">Unable to calculate subnet information. Please try again with valid inputs.</p>
                        <Button asChild className="bg-sky-600 hover:bg-sky-700">
                            <Link href="/">Back to Calculator</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2 text-sky-700">IP Subnet Calculator</h1>
                <p className="text-center mb-8 text-sky-600">Detailed subnet information and network analysis</p>

                <Card className="max-w-5xl mx-auto overflow-hidden shadow-xl border-sky-200">
                    <div className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-6">
                        <h2 className="text-2xl font-bold">Subnet Calculation Results</h2>
                        <p className="opacity-90">IP: {result.type === 'ipv4' ? result.data[0].ipAddress : result.data.ipAddress}</p>
                    </div>

                    {result.type === 'ipv4' && result.data && result.data.length > 0 && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="form-card">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Network Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">IP Address:</span>
                                            <span className="font-mono">{result.data[0].ipAddress}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Network Address:</span>
                                            <span className="font-mono">{result.data[0].networkAddress}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Broadcast Address:</span>
                                            <span className="font-mono">{result.data[0].broadcastAddress}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Usable Host Range:</span>
                                            <span className="font-mono">{result.data[0].hostRange}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-card">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Subnet Details</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Subnet Mask:</span>
                                            <span className="font-mono">{result.data[0].subnetMask}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">CIDR Notation:</span>
                                            <span className="font-mono">{result.data[0].cidrNotation}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Wildcard Mask:</span>
                                            <span className="font-mono">{result.data[0].wildcardMask}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">IP Class:</span>
                                            <span className="font-mono">{result.data[0].ipClass}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="form-card">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Host Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Total Hosts:</span>
                                            <span className="font-mono">{result.data[0].totalHosts.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Usable Hosts:</span>
                                            <span className="font-mono">{result.data[0].usableHosts.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">IP Type:</span>
                                            <span className="font-mono">{result.data[0].ipType}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-card">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Binary Representation</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">IP Binary:</span>
                                            <span className="font-mono text-xs">{result.data[0].binaryId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Subnet Binary:</span>
                                            <span className="font-mono text-xs">{result.data[0].binarySubnetMask}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Hex ID:</span>
                                            <span className="font-mono">{result.data[0].hexId}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4 text-sky-700">
                                    All {result.data[0].allNetworks.length} of the Possible {result.data[0].cidrNotation} Networks for {result.data[0].ipAddress.split('.').slice(0, 3).join('.')}.*
                                </h3>
                                <div className="overflow-x-auto bg-white border border-sky-200 rounded-lg shadow">
                                    <table className="min-w-full divide-y divide-sky-200">
                                        <thead className="bg-sky-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Network Address</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Usable Host Range</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">Broadcast Address</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-sky-100">
                                            {result.data[0].allNetworks.map((network: any, index: number) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-sky-50/50' : 'bg-white'}>
                                                    <td className="px-6 py-2 whitespace-nowrap font-mono text-sm text-gray-700">{network.networkAddress}</td>
                                                    <td className="px-6 py-2 whitespace-nowrap font-mono text-sm text-gray-700">{network.hostRange}</td>
                                                    <td className="px-6 py-2 whitespace-nowrap font-mono text-sm text-gray-700">{network.broadcastAddress}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {result.type === 'ipv6' && result.data && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="form-card">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Network Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">IP Address:</span>
                                            <span className="font-mono">{result.data.ipAddress}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Network Address:</span>
                                            <span className="font-mono">{result.data.networkAddress}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Prefix Length:</span>
                                            <span className="font-mono">{result.data.prefixLength}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-card">
                                    <h3 className="text-lg font-semibold text-sky-800 mb-3">Host Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Usable Host Range:</span>
                                            <span className="font-mono text-xs">{result.data.hostRange}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sky-700">Total Hosts:</span>
                                            <span className="font-mono">2^{128 - parseInt(result.data.prefixLength.replace('/', ''))}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-sky-50 flex justify-between items-center border-t border-sky-200">
                        <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white shadow-md">
                            <Link href="/">Back to Calculator</Link>
                        </Button>
                        <Button variant="outline" onClick={() => window.print()} className="flex items-center border-sky-300 text-sky-700 hover:bg-sky-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Results
                        </Button>
                    </div>
                </Card>

                <div className="mt-10 max-w-5xl mx-auto form-card p-6">
                    <h3 className="text-xl font-semibold mb-4 text-sky-700">Understanding Your Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-sky-700 mb-2">Network Address</h4>
                            <p className="text-gray-700 mb-4">The base address of your network. This is the first address in your subnet and cannot be assigned to a device.</p>

                            <h4 className="font-semibold text-sky-700 mb-2">Broadcast Address</h4>
                            <p className="text-gray-700 mb-4">The last address in your subnet, used to send data to all devices on the network. Cannot be assigned to a device.</p>

                            <h4 className="font-semibold text-sky-700 mb-2">Usable Host Range</h4>
                            <p className="text-gray-700">The range of IP addresses that can be assigned to devices on your network, excluding the network and broadcast addresses.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sky-700 mb-2">Subnet Mask</h4>
                            <p className="text-gray-700 mb-4">Determines which portion of an IP address refers to the network and which refers to hosts.</p>

                            <h4 className="font-semibold text-sky-700 mb-2">CIDR Notation</h4>
                            <p className="text-gray-700 mb-4">A compact representation of an IP address and its associated routing prefix, shown as a suffix indicating the number of bits in the prefix.</p>

                            <h4 className="font-semibold text-sky-700 mb-2">IP Class</h4>
                            <p className="text-gray-700">The traditional classification of IP addresses (A, B, C, D, or E) based on the value of the first octet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage; 