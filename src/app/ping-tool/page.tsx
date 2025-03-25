import { Metadata } from 'next';
import PingTool from '@/components/PingTool';

export const metadata: Metadata = {
    title: 'Ping Tool | Network Tools',
    description: 'Test network connectivity to hosts with our online ping tool. Check response times and packet loss.',
    keywords: 'ping tool, network connectivity, latency test, packet loss, network troubleshooting',
};

export default function PingToolPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">Ping Tool</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The Ping Tool helps you test network connectivity to a host and measure response times.
                        Enter a hostname or IP address to check if it's reachable and see how quickly it responds.
                    </p>
                    <p className="text-gray-700">
                        <strong>Note:</strong> This is a simulated ping tool as browsers cannot send actual ICMP packets.
                        For accurate results, use the ping command in your operating system's terminal.
                    </p>
                </div>

                <PingTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">Understanding Ping</h2>
                    <div className="prose max-w-none text-gray-700">
                        <p>
                            Ping is one of the most fundamental network diagnostic tools. It sends ICMP Echo Request packets to a target
                            host and waits for ICMP Echo Reply packets in response. This simple test can tell you if a host is reachable
                            and how long it takes for packets to travel to the host and back.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">What Ping Measures</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Round-Trip Time (RTT)</p>
                                <p className="text-sm">The time it takes for a packet to travel from your computer to the target host and back.</p>
                                <p className="text-sm mt-1">Lower RTT means better network performance.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Packet Loss</p>
                                <p className="text-sm">The percentage of packets that don't receive a response.</p>
                                <p className="text-sm mt-1">High packet loss indicates network congestion or connectivity issues.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Jitter</p>
                                <p className="text-sm">The variation in ping response times.</p>
                                <p className="text-sm mt-1">High jitter can cause issues with real-time applications like VoIP or video calls.</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Reachability</p>
                                <p className="text-sm">Whether the host is accessible over the network.</p>
                                <p className="text-sm mt-1">No response may indicate the host is down or blocked by a firewall.</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Interpreting Ping Results</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-sky-200 rounded">
                                <thead className="bg-sky-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sky-700">Metric</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Good</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Acceptable</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Poor</th>
                                        <th className="px-4 py-2 text-left text-sky-700">Impact</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-100">
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Ping Time</td>
                                        <td className="px-4 py-2">&lt; 20ms</td>
                                        <td className="px-4 py-2">20-100ms</td>
                                        <td className="px-4 py-2">&gt; 100ms</td>
                                        <td className="px-4 py-2">Affects responsiveness of applications</td>
                                    </tr>
                                    <tr className="bg-sky-50/50">
                                        <td className="px-4 py-2">Packet Loss</td>
                                        <td className="px-4 py-2">0%</td>
                                        <td className="px-4 py-2">1-2%</td>
                                        <td className="px-4 py-2">&gt; 2%</td>
                                        <td className="px-4 py-2">Causes retransmissions and slowdowns</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2">Jitter</td>
                                        <td className="px-4 py-2">&lt; 5ms</td>
                                        <td className="px-4 py-2">5-20ms</td>
                                        <td className="px-4 py-2">&gt; 20ms</td>
                                        <td className="px-4 py-2">Affects real-time applications</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common Ping Issues and Solutions</h3>
                        <div className="space-y-4">
                            <div className="border rounded p-4 bg-sky-50/50">
                                <p className="font-medium text-sky-700">Request Timed Out</p>
                                <p className="text-sm">This means the target host didn't respond within the expected time.</p>
                                <p className="text-sm mt-2"><strong>Possible causes:</strong></p>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>Host is offline or unreachable</li>
                                    <li>Firewall is blocking ICMP packets</li>
                                    <li>Network congestion</li>
                                    <li>Routing issues</li>
                                </ul>
                                <p className="text-sm mt-2"><strong>Solutions:</strong></p>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>Check your internet connection</li>
                                    <li>Verify the hostname or IP address</li>
                                    <li>Try pinging other hosts to isolate the issue</li>
                                    <li>Check firewall settings</li>
                                </ul>
                            </div>

                            <div className="border rounded p-4 bg-sky-50/50">
                                <p className="font-medium text-sky-700">High Ping Times</p>
                                <p className="text-sm">Response times are higher than expected.</p>
                                <p className="text-sm mt-2"><strong>Possible causes:</strong></p>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>Network congestion</li>
                                    <li>Physical distance to the server</li>
                                    <li>Bandwidth limitations</li>
                                    <li>Routing inefficiencies</li>
                                </ul>
                                <p className="text-sm mt-2"><strong>Solutions:</strong></p>
                                <ul className="list-disc pl-6 text-sm">
                                    <li>Try at different times of day</li>
                                    <li>Use a wired connection instead of Wi-Fi</li>
                                    <li>Contact your ISP if consistently poor</li>
                                    <li>Consider using a closer server if applicable</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Ping Command in Different Operating Systems</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3">
                                <p className="font-medium text-sky-700">Windows</p>
                                <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm mt-2">
                                    ping example.com
                                </div>
                                <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm mt-1">
                                    ping -n 10 example.com
                                </div>
                            </div>

                            <div className="border rounded p-3">
                                <p className="font-medium text-sky-700">Linux/macOS</p>
                                <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm mt-2">
                                    ping example.com
                                </div>
                                <div className="bg-gray-900 text-gray-100 p-2 rounded font-mono text-sm mt-1">
                                    ping -c 10 example.com
                                </div>
                            </div>
                        </div>

                        <p className="mt-6">
                            Remember that some hosts and networks may be configured to ignore ping requests for security reasons.
                            Just because a host doesn't respond to ping doesn't necessarily mean it's offline.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 