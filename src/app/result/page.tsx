import React, { Suspense } from 'react'
import ResultPage from './ResultPage'
import { Metadata } from 'next'
import Link from 'next/link'
import { calculateIPv4Subnet, calculateIPv6Subnet } from '../utils/subnetting'

// Generate dynamic metadata based on search params
export async function generateMetadata({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
    const params = await searchParams;
    // Convert searchParams to regular values to avoid the async issue
    const cip = typeof params.cip === 'string' ? params.cip : '';
    const ctype = typeof params.ctype === 'string' ? params.ctype : '';

    let title = 'IP Subnet Calculator Results';
    let description = 'Detailed subnet calculation results including network address, broadcast address, and usable host ranges.';
    let canonicalUrl = 'https://yourwebsite.com/result';

    if (ctype === 'ipv4' && cip) {
        const csubnet = typeof params.csubnet === 'string' ? params.csubnet : '';
        const cclass = typeof params.cclass === 'string' ? params.cclass : 'Any';
        const calculationResult = calculateIPv4Subnet(cip, csubnet, cclass);

        if (calculationResult && calculationResult.length > 0) {
            const result = calculationResult[0];
            title = `IPv4 Subnet ${result.networkAddress}${result.cidrNotation} | IP Subnet Calculator Results`;
            description = `Subnet calculation results for ${cip} with mask ${csubnet}: Network ${result.networkAddress}, Broadcast ${result.broadcastAddress}, Usable hosts ${result.usableHosts}.`;
            canonicalUrl = `https://yourwebsite.com/result?cip=${encodeURIComponent(cip)}&csubnet=${encodeURIComponent(csubnet)}&ctype=ipv4`;
        }
    } else if (ctype === 'ipv6' && cip) {
        const cprefix = typeof params.cprefix === 'string' ? params.cprefix : '64';
        const calculationResult = calculateIPv6Subnet(cip, parseInt(cprefix, 10));

        if (calculationResult) {
            title = `IPv6 Subnet ${calculationResult.networkAddress}/${cprefix} | IP Subnet Calculator Results`;
            description = `IPv6 subnet calculation results for ${cip}/${cprefix}: Network ${calculationResult.networkAddress}, Prefix Length /${cprefix}.`;
            canonicalUrl = `https://yourwebsite.com/result?cip=${encodeURIComponent(cip)}&cprefix=${encodeURIComponent(cprefix)}&ctype=ipv6`;
        }
    }

    return {
        title,
        description,
        keywords: ['IP subnet results', 'network configuration', 'subnet mask', 'CIDR notation', 'IPv4 calculator', 'IPv6 calculator', 'network address', 'broadcast address'],
        openGraph: {
            title,
            description,
            type: 'website',
            url: canonicalUrl,
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

const Page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-2 sm:px-4">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2 text-sky-700">IP Subnet Calculator Results</h1>
                <p className="text-center mb-8 text-sky-600">
                    Detailed subnet information and network analysis
                </p>

                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-600"></div>
                        <span className="ml-4 text-sky-700 font-medium">Calculating subnet information...</span>
                    </div>
                }>
                    <ResultPage />
                </Suspense>

                <div className="mt-10 max-w-5xl mx-auto form-card p-6">
                    <h2 className="text-xl font-semibold mb-4 text-sky-700">Understanding IP Subnet Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-sky-700 mb-2">Network Address</h3>
                            <p className="text-gray-700 mb-4">The base address of your network. This is the first address in your subnet and cannot be assigned to a device.</p>

                            <h3 className="font-semibold text-sky-700 mb-2">Broadcast Address</h3>
                            <p className="text-gray-700 mb-4">The last address in your subnet, used to send data to all devices on the network. Cannot be assigned to a device.</p>

                            <h3 className="font-semibold text-sky-700 mb-2">Usable Host Range</h3>
                            <p className="text-gray-700">The range of IP addresses that can be assigned to devices on your network, excluding the network and broadcast addresses.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-sky-700 mb-2">Subnet Mask</h3>
                            <p className="text-gray-700 mb-4">Determines which portion of an IP address refers to the network and which refers to hosts.</p>

                            <h3 className="font-semibold text-sky-700 mb-2">CIDR Notation</h3>
                            <p className="text-gray-700 mb-4">A compact representation of an IP address and its associated routing prefix, shown as a suffix indicating the number of bits in the prefix.</p>

                            <h3 className="font-semibold text-sky-700 mb-2">IP Class</h3>
                            <p className="text-gray-700">The traditional classification of IP addresses (A, B, C, D, or E) based on the value of the first octet.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="form-card">
                            <h2 className="text-xl font-semibold mb-4 text-sky-700">Common Subnet Applications</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-sky-700 mb-2">Network Segmentation</h3>
                                    <p className="text-gray-700">
                                        Subnetting allows you to divide a large network into smaller, more manageable segments. This improves security by isolating traffic and reduces network congestion by limiting broadcast domains.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sky-700 mb-2">VLANs and Routing</h3>
                                    <p className="text-gray-700">
                                        Each subnet typically corresponds to a VLAN in enterprise networks. Routers connect these subnets, allowing controlled communication between different network segments while maintaining isolation.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sky-700 mb-2">IP Address Management</h3>
                                    <p className="text-gray-700">
                                        Proper subnetting helps organizations efficiently allocate and manage IP addresses, reducing waste and making network administration more straightforward.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="form-card">
                            <h2 className="text-xl font-semibold mb-4 text-sky-700">Subnet Best Practices</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-sky-700 mb-2">Plan for Growth</h3>
                                    <p className="text-gray-700">
                                        Always allocate more IP addresses than currently needed. A good rule of thumb is to plan for 2-3 times your current requirements to accommodate future growth.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sky-700 mb-2">Document Your Network</h3>
                                    <p className="text-gray-700">
                                        Maintain detailed documentation of your subnet allocations, including which subnets are assigned to specific departments, functions, or locations.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sky-700 mb-2">Consistent Addressing Scheme</h3>
                                    <p className="text-gray-700">
                                        Use a consistent addressing scheme across your organization. For example, allocate the same third octet for a specific location or function across different sites.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 form-card">
                        <h2 className="text-xl font-semibold mb-4 text-sky-700">Troubleshooting Network Issues</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                When troubleshooting network connectivity issues, verify these subnet-related configurations:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Correct subnet mask</strong>: Ensure all devices on the same network segment use identical subnet masks.</li>
                                <li><strong>Default gateway</strong>: Verify the default gateway is within the same subnet as the host device.</li>
                                <li><strong>IP address conflicts</strong>: Check for duplicate IP addresses using tools like ping or arp.</li>
                                <li><strong>VLAN configuration</strong>: Confirm switch ports are assigned to the correct VLANs.</li>
                                <li><strong>Routing tables</strong>: Examine routing tables to ensure proper routes exist between subnets.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 bg-sky-50 p-6 rounded-lg border border-sky-200 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-sky-700">Related Resources</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Link href="/blog/subnetting-basics" className="block p-4 bg-white rounded-lg border border-sky-200 hover:border-sky-400 transition-colors">
                                <h3 className="font-semibold text-sky-700 mb-2">Subnetting Basics</h3>
                                <p className="text-sm text-gray-600">Learn the fundamentals of IP subnetting and CIDR notation</p>
                            </Link>
                            <Link href="/blog/ipv6-migration" className="block p-4 bg-white rounded-lg border border-sky-200 hover:border-sky-400 transition-colors">
                                <h3 className="font-semibold text-sky-700 mb-2">IPv6 Migration Guide</h3>
                                <p className="text-sm text-gray-600">Step-by-step guide to transitioning from IPv4 to IPv6</p>
                            </Link>
                            <Link href="/blog/network-security" className="block p-4 bg-white rounded-lg border border-sky-200 hover:border-sky-400 transition-colors">
                                <h3 className="font-semibold text-sky-700 mb-2">Network Security</h3>
                                <p className="text-sm text-gray-600">Best practices for securing your network infrastructure</p>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        <p>This subnet calculator provides results for educational and planning purposes.</p>
                        <p>Always verify critical network configurations with your network administrator.</p>
                    </div>
                </div>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "IP Subnet Calculator",
                            "applicationCategory": "NetworkingApplication",
                            "operatingSystem": "Any",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "description": "Calculate subnet information including network address, broadcast address, and usable host ranges for IPv4 and IPv6 networks."
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default Page
