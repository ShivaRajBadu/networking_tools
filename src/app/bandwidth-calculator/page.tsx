import BandwidthCalculatorTool from '@/components/BandwidthCalculatorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bandwidth Calculator | Network Tools',
    description: 'Calculate file transfer times based on file size and bandwidth with our free online bandwidth calculator.',
    keywords: 'bandwidth calculator, network speed, file transfer time, download time, upload time, network tools',
};

export default function BandwidthCalculatorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">Bandwidth Calculator</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The Bandwidth Calculator helps you estimate how long it will take to transfer files over a network connection.
                        Enter the file size and your connection speed to calculate the transfer time.
                    </p>
                </div>

                <BandwidthCalculatorTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">Understanding Bandwidth and Data Transfer</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            Bandwidth refers to the maximum rate of data transfer across a network connection. It's typically measured in bits per second (bps)
                            or multiples like Kbps, Mbps, or Gbps. Understanding bandwidth is crucial for network planning and troubleshooting.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common Bandwidth Units</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">Unit</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Abbreviation</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Bits per Second</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Example Use Case</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Bits per second</td>
                                        <td className="px-4 py-2 font-mono">bps</td>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">Legacy serial connections</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">Kilobits per second</td>
                                        <td className="px-4 py-2 font-mono">Kbps</td>
                                        <td className="px-4 py-2">1,000</td>
                                        <td className="px-4 py-2">Dial-up connections</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Megabits per second</td>
                                        <td className="px-4 py-2 font-mono">Mbps</td>
                                        <td className="px-4 py-2">1,000,000</td>
                                        <td className="px-4 py-2">Broadband internet</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">Gigabits per second</td>
                                        <td className="px-4 py-2 font-mono">Gbps</td>
                                        <td className="px-4 py-2">1,000,000,000</td>
                                        <td className="px-4 py-2">Fiber optic connections</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Terabits per second</td>
                                        <td className="px-4 py-2 font-mono">Tbps</td>
                                        <td className="px-4 py-2">1,000,000,000,000</td>
                                        <td className="px-4 py-2">Backbone internet connections</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Bits vs. Bytes</h3>
                        <p>
                            It's important to understand the difference between bits and bytes when calculating data transfer times:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Bit (b)</strong>: The smallest unit of digital information (0 or 1)</li>
                            <li><strong>Byte (B)</strong>: A group of 8 bits</li>
                            <li>Network speeds are typically measured in bits per second (bps)</li>
                            <li>File sizes are typically measured in bytes (B, KB, MB, GB, TB)</li>
                            <li>To convert from bytes to bits, multiply by 8</li>
                        </ul>

                        <div className="bg-sky-50 p-4 rounded-lg mt-4 border border-sky-200">
                            <p className="font-medium text-sky-700">Example:</p>
                            <p>A 10 MB (megabyte) file = 10 × 8 = 80 Mb (megabits)</p>
                            <p>On a 10 Mbps connection, it would take approximately 8 seconds to transfer (80 Mb ÷ 10 Mbps = 8 seconds)</p>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Factors Affecting Transfer Speed</h3>
                        <p>
                            In real-world scenarios, actual transfer speeds may differ from theoretical calculations due to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Network congestion</li>
                            <li>Protocol overhead</li>
                            <li>Server limitations</li>
                            <li>Hardware performance</li>
                            <li>Distance to the server</li>
                            <li>Quality of service (QoS) settings</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common Internet Connection Speeds</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">DSL</p>
                                <p className="text-sm">1-100 Mbps, typically around 10-25 Mbps for downloads</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Cable</p>
                                <p className="text-sm">10-1,000 Mbps, typically around 100-300 Mbps for downloads</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Fiber</p>
                                <p className="text-sm">250-10,000 Mbps, typically around 500-1,000 Mbps for downloads</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">4G LTE</p>
                                <p className="text-sm">5-50 Mbps, depending on signal strength and congestion</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">5G</p>
                                <p className="text-sm">50-1,000+ Mbps, depending on implementation and signal</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Satellite</p>
                                <p className="text-sm">12-100 Mbps, with higher latency than wired connections</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 