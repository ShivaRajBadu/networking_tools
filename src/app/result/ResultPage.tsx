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
                        <Button asChild className="bg-sky-600 text-white hover:bg-sky-700">
                            <Link href="/" className='text-white'>Back to Calculator</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto">
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

                            {/* New section: Network Configuration Examples */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Network Configuration Examples</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Linux Configuration</h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                            <div>sudo ip addr add {result.data[0].ipAddress}{result.data[0].cidrNotation} dev eth0</div>
                                            <div>sudo ip route add default via {result.data[0].networkAddress.split('.').slice(0, 3).join('.')}.1 dev eth0</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Windows Configuration</h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                            <div>netsh interface ip set address "Ethernet" static {result.data[0].ipAddress} {result.data[0].subnetMask} {result.data[0].networkAddress.split('.').slice(0, 3).join('.')}.1</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-medium text-sky-700 mb-2">Cisco Router Configuration</h4>
                                    <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                        <div>interface GigabitEthernet0/0</div>
                                        <div> ip address {result.data[0].ipAddress} {result.data[0].subnetMask}</div>
                                        <div> no shutdown</div>
                                    </div>
                                </div>
                            </div>

                            {/* New section: DHCP Server Configuration */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">DHCP Server Configuration</h3>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                    <div># ISC DHCP Server Configuration</div>
                                    <div>subnet {result.data[0].networkAddress} netmask {result.data[0].subnetMask} {'{'}</div>
                                    <div>  range {result.data[0].hostRange.split(' - ')[0]} {result.data[0].hostRange.split(' - ')[1]};</div>
                                    <div>  option routers {result.data[0].networkAddress.split('.').slice(0, 3).join('.')}.1;</div>
                                    <div>  option domain-name-servers 8.8.8.8, 8.8.4.4;</div>
                                    <div>  option domain-name "example.com";</div>
                                    <div>  default-lease-time 86400; # 24 hours</div>
                                    <div>  max-lease-time 172800; # 48 hours</div>
                                    <div>{'}'}</div>
                                </div>
                            </div>

                            {/* New section: Firewall Rules */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Sample Firewall Rules</h3>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                    <div># iptables rules to protect this network</div>
                                    <div>iptables -A INPUT -s {result.data[0].networkAddress}{result.data[0].cidrNotation} -j ACCEPT</div>
                                    <div>iptables -A INPUT -p tcp --dport 22 -j DROP</div>
                                    <div>iptables -A INPUT -p tcp --dport 80 -j ACCEPT</div>
                                    <div>iptables -A INPUT -p tcp --dport 443 -j ACCEPT</div>
                                    <div>iptables -A INPUT -j LOG</div>
                                    <div>iptables -A INPUT -j DROP</div>
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

                            {/* New IPv6 sections */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">IPv6 Address Formats</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Expanded Format</h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                            {result.data.ipAddress.replace(/::/g, ':0000:0000:0000:0000:0000:0000:').replace(/^:|:$/g, '').split(':').map((hex: string) => hex.padStart(4, '0')).join(':')}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Compressed Format</h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                            {result.data.ipAddress}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* IPv6 Network Configuration Examples */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Network Configuration Examples</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Linux Configuration</h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                            <div>sudo ip -6 addr add {result.data.ipAddress}{result.data.prefixLength} dev eth0</div>
                                            <div>sudo ip -6 route add default via fe80::1 dev eth0</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Windows Configuration</h4>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                            <div>netsh interface ipv6 add address "Ethernet" {result.data.ipAddress}{result.data.prefixLength}</div>
                                            <div>netsh interface ipv6 add route ::/0 "Ethernet" fe80::1</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-medium text-sky-700 mb-2">Cisco Router Configuration</h4>
                                    <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                                        <div>interface GigabitEthernet0/0</div>
                                        <div> ipv6 address {result.data.ipAddress}{result.data.prefixLength}</div>
                                        <div> ipv6 enable</div>
                                        <div> no shutdown</div>
                                    </div>
                                </div>
                            </div>

                            {/* IPv6 Subnet Planning */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">IPv6 Subnet Planning</h3>
                                <p className="mb-3 text-sm">Recommended subnet allocation for this prefix:</p>

                                <div className="space-y-4">
                                    {parseInt(result.data.prefixLength.replace('/', '')) <= 48 && (
                                        <div>
                                            <h4 className="font-medium text-sky-700 mb-2">Site Allocation Strategy</h4>
                                            <div className="bg-gray-100 p-3 rounded text-sm">
                                                <p>With a {result.data.prefixLength} prefix, you can create:</p>
                                                <ul className="list-disc pl-6 mt-2">
                                                    <li>{Math.pow(2, 64 - parseInt(result.data.prefixLength.replace('/', '')))} /64 networks (standard subnets)</li>
                                                    <li>{Math.pow(2, 56 - parseInt(result.data.prefixLength.replace('/', '')))} /56 networks (typical home/small business allocations)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-2">Recommended Address Assignments</h4>
                                        <div className="space-y-1 font-mono text-sm">
                                            <div><span className="text-sky-600">Infrastructure:</span> {result.data.networkAddress.split('::')[0]}::1:0/112</div>
                                            <div><span className="text-sky-600">User Networks:</span> {result.data.networkAddress.split('::')[0]}::2:0/112 to {result.data.networkAddress.split('::')[0]}::fffe:0/112</div>
                                            <div><span className="text-sky-600">Point-to-Point Links:</span> {result.data.networkAddress.split('::')[0]}::ffff:0/112</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* IPv6 Security Considerations */}
                            <div className="form-card mb-8">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">IPv6 Security Considerations</h3>
                                <div className="space-y-3">
                                    <p>When implementing IPv6, consider these security best practices:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Filter ICMPv6 messages but don't block them completely (needed for NDP)</li>
                                        <li>Implement RA Guard to prevent rogue Router Advertisements</li>
                                        <li>Use DHCPv6 snooping to prevent rogue DHCPv6 servers</li>
                                        <li>Consider using Unique Local Addresses (ULA) for internal networks</li>
                                        <li>Implement IPv6 firewall rules similar to your IPv4 policies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-sky-50 flex justify-between items-center border-t border-sky-200">
                        <Button asChild className="bg-sky-600 hover:bg-sky-700">
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




            </div>
        </div>
    );
};

export default ResultPage; 