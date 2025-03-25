import { Metadata } from 'next';
import IPConverterTool from '@/components/IPConverterTool';

export const metadata: Metadata = {
    title: 'IP Converter | Network Tools',
    description: 'Convert IP addresses between decimal, binary, and hexadecimal formats with our free online IP converter tool.',
    keywords: 'IP converter, IP address format, binary IP, hexadecimal IP, decimal IP, IP class, private IP, public IP',
};

export default function IPConverterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">IP Address Converter</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The IP Address Converter helps network administrators and students convert IPv4 addresses between different formats
                        and provides information about the IP address classification. Convert between dotted decimal, binary, and hexadecimal formats.
                    </p>
                </div>

                <IPConverterTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">Understanding IP Address Formats</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            IP addresses can be represented in different formats, each useful in different networking contexts.
                            Understanding these formats is essential for network configuration and troubleshooting.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">IP Address Formats</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Dotted Decimal Notation</p>
                                <p className="text-sm">The standard format used by most networking tools and configurations.</p>
                                <p className="text-sm mt-1 font-mono">Example: 192.168.1.1</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Binary Notation</p>
                                <p className="text-sm">Used to understand subnet masks and network calculations.</p>
                                <p className="text-sm mt-1 font-mono">Example: 11000000.10101000.00000001.00000001</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Hexadecimal Notation</p>
                                <p className="text-sm">Often used in programming and some network protocols.</p>
                                <p className="text-sm mt-1 font-mono">Example: C0.A8.01.01</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Decimal (32-bit) Notation</p>
                                <p className="text-sm">A single decimal number representing the entire IP address.</p>
                                <p className="text-sm mt-1 font-mono">Example: 3232235777</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">IP Address Classes</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">Class</th>
                                        <th className="px-4 py-2 text-left text-sky-700">First Octet Range</th>
                                        <th className="px-4 py-2 text-left text-sky-700">First Bits</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Network/Host Bits</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Use</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">A</td>
                                        <td className="px-4 py-2 font-mono">1-127</td>
                                        <td className="px-4 py-2 font-mono">0</td>
                                        <td className="px-4 py-2 font-mono">8/24</td>
                                        <td className="px-4 py-2">Large networks</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">B</td>
                                        <td className="px-4 py-2 font-mono">128-191</td>
                                        <td className="px-4 py-2 font-mono">10</td>
                                        <td className="px-4 py-2 font-mono">16/16</td>
                                        <td className="px-4 py-2">Medium networks</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">C</td>
                                        <td className="px-4 py-2 font-mono">192-223</td>
                                        <td className="px-4 py-2 font-mono">110</td>
                                        <td className="px-4 py-2 font-mono">24/8</td>
                                        <td className="px-4 py-2">Small networks</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">D</td>
                                        <td className="px-4 py-2 font-mono">224-239</td>
                                        <td className="px-4 py-2 font-mono">1110</td>
                                        <td className="px-4 py-2 font-mono">N/A</td>
                                        <td className="px-4 py-2">Multicast</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">E</td>
                                        <td className="px-4 py-2 font-mono">240-255</td>
                                        <td className="px-4 py-2 font-mono">1111</td>
                                        <td className="px-4 py-2 font-mono">N/A</td>
                                        <td className="px-4 py-2">Reserved/Experimental</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Private IP Address Ranges</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">Class</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Private IP Range</th>
                                        <th className="px-4 py-2 text-left text-sky-700">CIDR Notation</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Common Use</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">A</td>
                                        <td className="px-4 py-2 font-mono">10.0.0.0 - 10.255.255.255</td>
                                        <td className="px-4 py-2 font-mono">10.0.0.0/8</td>
                                        <td className="px-4 py-2">Large enterprise networks</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">B</td>
                                        <td className="px-4 py-2 font-mono">172.16.0.0 - 172.31.255.255</td>
                                        <td className="px-4 py-2 font-mono">172.16.0.0/12</td>
                                        <td className="px-4 py-2">Medium-sized networks</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">C</td>
                                        <td className="px-4 py-2 font-mono">192.168.0.0 - 192.168.255.255</td>
                                        <td className="px-4 py-2 font-mono">192.168.0.0/16</td>
                                        <td className="px-4 py-2">Home and small office networks</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Special IP Addresses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Loopback Address</p>
                                <p className="text-sm font-mono">127.0.0.1</p>
                                <p className="text-sm mt-1">Used to refer to the local machine. Any address in the 127.0.0.0/8 range works as a loopback.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Link-Local Addresses</p>
                                <p className="text-sm font-mono">169.254.0.0/16</p>
                                <p className="text-sm mt-1">Automatically assigned when DHCP fails. Used for direct communication between devices on a single link.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Broadcast Address</p>
                                <p className="text-sm font-mono">255.255.255.255</p>
                                <p className="text-sm mt-1">Used to send packets to all devices on a network.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">This Network</p>
                                <p className="text-sm font-mono">0.0.0.0</p>
                                <p className="text-sm mt-1">Represents "this network" or "all networks" depending on context.</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Converting Between Formats</h3>
                        <p>
                            To convert between IP address formats:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Decimal to Binary</strong>: Convert each octet to an 8-bit binary number</li>
                            <li><strong>Binary to Decimal</strong>: Convert each 8-bit group to a decimal number</li>
                            <li><strong>Decimal to Hexadecimal</strong>: Convert each octet to a 2-digit hex number</li>
                            <li><strong>Decimal to 32-bit Integer</strong>: (First octet × 16,777,216) + (Second octet × 65,536) + (Third octet × 256) + Fourth octet</li>
                        </ul>

                        <div className="bg-sky-50 p-4 rounded-lg mt-4 border border-sky-200">
                            <p className="font-medium text-sky-700">Example: Converting 192.168.1.1</p>
                            <p><strong>To Binary</strong>: 11000000.10101000.00000001.00000001</p>
                            <p><strong>To Hexadecimal</strong>: C0.A8.01.01</p>
                            <p><strong>To 32-bit Integer</strong>: (192 × 16,777,216) + (168 × 65,536) + (1 × 256) + 1 = 3,232,235,777</p>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Why Different Formats Matter</h3>
                        <p>
                            Different IP address formats serve various purposes in networking:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Dotted Decimal</strong>: Human-readable format used in most configurations</li>
                            <li><strong>Binary</strong>: Essential for understanding subnet masks and network operations</li>
                            <li><strong>Hexadecimal</strong>: Compact representation used in some protocols and programming</li>
                            <li><strong>32-bit Integer</strong>: Used in some databases and programming languages</li>
                        </ul>

                        <p className="mt-4">
                            Understanding how to convert between these formats helps network administrators troubleshoot issues,
                            configure networks efficiently, and understand how networking protocols work at a fundamental level.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 