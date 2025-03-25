import { Metadata } from 'next';
import CIDRCalculatorTool from '@/components/CIDRCalculatorTool';

export const metadata: Metadata = {
    title: 'CIDR Calculator | Network Tools',
    description: 'Calculate network address, subnet mask, broadcast address, and more from CIDR notation with our free online CIDR calculator.',
    keywords: 'CIDR calculator, subnet calculator, IP subnet, network address, broadcast address, subnet mask, networking tools',
};

export default function CIDRCalculatorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">CIDR Calculator</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The CIDR (Classless Inter-Domain Routing) Calculator helps network administrators and students
                        calculate network information from CIDR notation. Enter an IP address with a prefix length
                        (e.g., 192.168.1.0/24) to calculate network address, subnet mask, broadcast address, and more.
                    </p>
                </div>

                <CIDRCalculatorTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">What is CIDR Notation?</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            CIDR notation is a compact method for specifying IP addresses and their associated routing prefix.
                            It's an alternative to the older system of representing networks as classes (Class A, B, C).
                            The notation consists of an IP address, followed by a slash (/) and a number that tells how many bits
                            are in the network prefix.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">How to Use the CIDR Calculator</h3>
                        <ol className="list-decimal pl-6 space-y-1">
                            <li>Enter an IP address followed by a slash and prefix length (e.g., 192.168.1.0/24)</li>
                            <li>Click the "Calculate" button</li>
                            <li>View the results including network address, subnet mask, broadcast address, and more</li>
                        </ol>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common CIDR Notations</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">CIDR</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Subnet Mask</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Addresses</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 font-mono">/32</td>
                                        <td className="px-4 py-2 font-mono">255.255.255.255</td>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">Single host</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2 font-mono">/31</td>
                                        <td className="px-4 py-2 font-mono">255.255.255.254</td>
                                        <td className="px-4 py-2">2</td>
                                        <td className="px-4 py-2">Point-to-point link</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 font-mono">/30</td>
                                        <td className="px-4 py-2 font-mono">255.255.255.252</td>
                                        <td className="px-4 py-2">4 (2 usable)</td>
                                        <td className="px-4 py-2">Minimum subnet</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2 font-mono">/29</td>
                                        <td className="px-4 py-2 font-mono">255.255.255.248</td>
                                        <td className="px-4 py-2">8 (6 usable)</td>
                                        <td className="px-4 py-2">Small subnet</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 font-mono">/28</td>
                                        <td className="px-4 py-2 font-mono">255.255.255.240</td>
                                        <td className="px-4 py-2">16 (14 usable)</td>
                                        <td className="px-4 py-2">Small subnet</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2 font-mono">/24</td>
                                        <td className="px-4 py-2 font-mono">255.255.255.0</td>
                                        <td className="px-4 py-2">256 (254 usable)</td>
                                        <td className="px-4 py-2">Class C equivalent</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 font-mono">/16</td>
                                        <td className="px-4 py-2 font-mono">255.255.0.0</td>
                                        <td className="px-4 py-2">65,536 (65,534 usable)</td>
                                        <td className="px-4 py-2">Class B equivalent</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2 font-mono">/8</td>
                                        <td className="px-4 py-2 font-mono">255.0.0.0</td>
                                        <td className="px-4 py-2">16,777,216 (16,777,214 usable)</td>
                                        <td className="px-4 py-2">Class A equivalent</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Why Use CIDR?</h3>
                        <p>
                            CIDR was introduced to slow the exhaustion of IPv4 addresses and to help alleviate the growth of
                            routing tables. It allows for more efficient allocation of IP addresses than the previous
                            class-based system, where large blocks of addresses were allocated to organizations regardless of their needs.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">CIDR Calculator Terms</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Network Address</p>
                                <p className="text-sm">The first address in a subnet, used to identify the network.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Subnet Mask</p>
                                <p className="text-sm">A 32-bit number that masks an IP address, dividing it into network and host portions.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Broadcast Address</p>
                                <p className="text-sm">The last address in a subnet, used to send data to all devices on the subnet.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Wildcard Mask</p>
                                <p className="text-sm">The inverse of the subnet mask, often used in access control lists (ACLs).</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">First Usable Address</p>
                                <p className="text-sm">The first address that can be assigned to a host in the subnet.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Last Usable Address</p>
                                <p className="text-sm">The last address that can be assigned to a host in the subnet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 