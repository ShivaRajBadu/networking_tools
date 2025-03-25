import { Metadata } from 'next';
import TracerouteVisualizer from '@/components/TracerouteVisualizer';

export const metadata: Metadata = {
    title: 'Traceroute Visualizer | Network Tools',
    description: 'Visualize network paths between your device and servers with our online traceroute visualization tool.',
    keywords: 'traceroute, network visualization, network path, network map, hop visualization, network diagnostics',
};

export default function TraceroutePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8 px-2 sm:px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-indigo-800">Traceroute Visualizer</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The Traceroute Visualizer shows you the journey your data takes across the internet.
                        Visualize each network hop between your computer and a destination server on an interactive map.
                    </p>
                </div>

                <TracerouteVisualizer />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Understanding Traceroute</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            Traceroute is a network diagnostic tool that shows the path packets take across an IP network,
                            and measures transit delays at each hop. It helps identify routing problems, network congestion,
                            and provides insight into how the internet works.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-700">How Traceroute Works</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">1. Time-to-Live (TTL)</p>
                                <p className="text-sm">Traceroute sends packets with increasing TTL values, starting with 1</p>
                            </div>

                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">2. ICMP Time Exceeded</p>
                                <p className="text-sm">When a packet's TTL reaches zero, routers send back an ICMP "time exceeded" message</p>
                            </div>

                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">3. Round-Trip Time</p>
                                <p className="text-sm">Traceroute measures the time between sending a packet and receiving the ICMP reply</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-700">Interpreting Traceroute Results</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-indigo-200 rounded">
                                <thead className="bg-indigo-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-indigo-700">Pattern</th>
                                        <th className="px-4 py-2 text-left text-indigo-700">Meaning</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-indigo-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 font-mono">* * *</td>
                                        <td className="px-4 py-2">No response from hop (firewall blocking, ICMP filtered)</td>
                                    </tr>
                                    <tr className="bg-indigo-50/50">
                                        <td className="px-4 py-2">Increasing RTT</td>
                                        <td className="px-4 py-2">Distance or congestion increasing</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Large jump in RTT</td>
                                        <td className="px-4 py-2">Geographic distance, satellite link, or congestion</td>
                                    </tr>
                                    <tr className="bg-indigo-50/50">
                                        <td className="px-4 py-2">Same RTT for multiple hops</td>
                                        <td className="px-4 py-2">Network devices in same location/datacenter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-700">Use Cases for Traceroute</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">Network Troubleshooting</p>
                                <p className="text-sm">Identify where connection issues occur in the network path</p>
                            </div>

                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">Performance Analysis</p>
                                <p className="text-sm">Determine if routing is efficient or if there are high-latency segments</p>
                            </div>

                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">Network Mapping</p>
                                <p className="text-sm">Discover how traffic flows between networks</p>
                            </div>

                            <div className="border rounded p-3 bg-indigo-50/50">
                                <p className="font-medium text-indigo-700">ISP Verification</p>
                                <p className="text-sm">Verify that traffic flows through expected providers</p>
                            </div>
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-lg mt-6 border border-indigo-200">
                            <p className="font-medium text-indigo-700">Traceroute Commands on Different Systems</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="font-medium">Windows:</p>
                                    <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm mt-1">
                                        tracert example.com
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium">Linux/macOS:</p>
                                    <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm mt-1">
                                        traceroute example.com
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 