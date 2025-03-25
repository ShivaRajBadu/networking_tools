import { Metadata } from 'next';
import MACAddressLookupTool from '@/components/MACAddressLookupTool';

export const metadata: Metadata = {
    title: 'MAC Address Lookup | Network Tools',
    description: 'Look up vendor information from MAC addresses with our free online MAC address lookup tool.',
    keywords: 'MAC address lookup, OUI lookup, vendor lookup, MAC address vendor, network tools',
};

export default function MACLookupPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">MAC Address Lookup</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The MAC Address Lookup tool helps you identify the manufacturer of network devices
                        using their MAC address. Enter a MAC address to find its vendor and other details.
                    </p>
                </div>

                <MACAddressLookupTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">Understanding MAC Addresses</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            A MAC (Media Access Control) address is a unique identifier assigned to network interfaces.
                            It consists of 6 bytes (48 bits), usually written as six pairs of hexadecimal digits.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">MAC Address Format</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">OUI (First 3 bytes)</p>
                                <p className="text-sm">Organizationally Unique Identifier - identifies the manufacturer</p>
                                <p className="text-sm mt-1 font-mono">Example: 00:00:0C (Cisco)</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">NIC Specific (Last 3 bytes)</p>
                                <p className="text-sm">Assigned by the manufacturer to uniquely identify the device</p>
                                <p className="text-sm mt-1 font-mono">Example: 12:34:56</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Special Bits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Universal/Local Bit</p>
                                <p className="text-sm">Second bit of the first byte</p>
                                <ul className="list-disc pl-6 text-sm mt-2">
                                    <li>0 = Globally Unique (OUI enforced)</li>
                                    <li>1 = Locally Administered</li>
                                </ul>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Unicast/Multicast Bit</p>
                                <p className="text-sm">Least significant bit of the first byte</p>
                                <ul className="list-disc pl-6 text-sm mt-2">
                                    <li>0 = Unicast</li>
                                    <li>1 = Multicast</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common MAC Address Types</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">Type</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Example</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Burned-in Address</td>
                                        <td className="px-4 py-2 font-mono">00:00:0C:12:34:56</td>
                                        <td className="px-4 py-2">Factory-assigned unique address</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">Virtual Interface</td>
                                        <td className="px-4 py-2 font-mono">02:00:0C:12:34:56</td>
                                        <td className="px-4 py-2">Locally administered address</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Broadcast</td>
                                        <td className="px-4 py-2 font-mono">FF:FF:FF:FF:FF:FF</td>
                                        <td className="px-4 py-2">Sends to all devices on network</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 