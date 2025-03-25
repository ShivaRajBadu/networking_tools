import { Metadata } from 'next';
import BinaryCalculatorTool from '@/components/BinaryCalculatorTool';

export const metadata: Metadata = {
    title: 'Binary Calculator | Network Tools',
    description: 'Convert between decimal, binary, hexadecimal, and octal number systems with our free online binary calculator.',
    keywords: 'binary calculator, decimal to binary, binary to decimal, hex converter, octal converter, number system conversion',
};

export default function BinaryCalculatorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">Binary Calculator</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The Binary Calculator helps network administrators and students convert between different number systems
                        commonly used in computing and networking. Convert between decimal, binary, hexadecimal, and octal with ease.
                    </p>
                </div>

                <BinaryCalculatorTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">Understanding Number Systems</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            Different number systems are used in computing and networking for various purposes. Understanding how to convert
                            between these systems is essential for network configuration, troubleshooting, and programming.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common Number Systems</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Decimal (Base 10)</p>
                                <p className="text-sm">The standard number system we use daily. Uses digits 0-9.</p>
                                <p className="text-sm mt-1">Example: 42</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Binary (Base 2)</p>
                                <p className="text-sm">Used by computers at the lowest level. Uses only 0 and 1.</p>
                                <p className="text-sm mt-1">Example: 101010 (= 42 in decimal)</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Hexadecimal (Base 16)</p>
                                <p className="text-sm">Commonly used in programming and networking. Uses 0-9 and A-F.</p>
                                <p className="text-sm mt-1">Example: 2A (= 42 in decimal)</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Octal (Base 8)</p>
                                <p className="text-sm">Less common today, but still used in some contexts. Uses digits 0-7.</p>
                                <p className="text-sm mt-1">Example: 52 (= 42 in decimal)</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Why Different Number Systems Matter in Networking</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Binary</strong>: IP addresses, subnet masks, and network traffic are all processed as binary at the machine level</li>
                            <li><strong>Hexadecimal</strong>: MAC addresses, IPv6 addresses, and network packets are often represented in hexadecimal</li>
                            <li><strong>Decimal</strong>: IPv4 addresses are typically written in decimal format for human readability</li>
                            <li><strong>Octal</strong>: Used in some Unix/Linux file permissions and older systems</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common Conversions in Networking</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">Decimal</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Binary</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Hexadecimal</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Networking Context</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">0</td>
                                        <td className="px-4 py-2 font-mono">0000</td>
                                        <td className="px-4 py-2 font-mono">0</td>
                                        <td className="px-4 py-2">Off bit in subnet mask</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">255</td>
                                        <td className="px-4 py-2 font-mono">11111111</td>
                                        <td className="px-4 py-2 font-mono">FF</td>
                                        <td className="px-4 py-2">On byte in subnet mask</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">10</td>
                                        <td className="px-4 py-2 font-mono">1010</td>
                                        <td className="px-4 py-2 font-mono">A</td>
                                        <td className="px-4 py-2">Common in hex notation</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">127</td>
                                        <td className="px-4 py-2 font-mono">01111111</td>
                                        <td className="px-4 py-2 font-mono">7F</td>
                                        <td className="px-4 py-2">First byte of loopback address</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">192</td>
                                        <td className="px-4 py-2 font-mono">11000000</td>
                                        <td className="px-4 py-2 font-mono">C0</td>
                                        <td className="px-4 py-2">Common in private IP ranges</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Bit Manipulation in Networking</h3>
                        <p>
                            Understanding binary is crucial for bit-level operations in networking:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>AND operations</strong>: Used to apply subnet masks to IP addresses</li>
                            <li><strong>OR operations</strong>: Used to calculate broadcast addresses</li>
                            <li><strong>NOT operations</strong>: Used to invert subnet masks to create wildcard masks</li>
                            <li><strong>Bit shifting</strong>: Used in CIDR notation and subnet calculations</li>
                        </ul>

                        <div className="bg-sky-50 p-4 rounded-lg mt-4 border border-sky-200">
                            <p className="font-medium text-sky-700">Example: Subnet Mask Application</p>
                            <p className="font-mono">IP Address:  192.168.1.10  (11000000.10101000.00000001.00001010)</p>
                            <p className="font-mono">Subnet Mask: 255.255.255.0 (11111111.11111111.11111111.00000000)</p>
                            <p className="font-mono">AND Result:  192.168.1.0   (11000000.10101000.00000001.00000000)</p>
                            <p className="mt-2">The AND operation reveals the network address of the IP.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 