import { Metadata } from 'next';
import DNSLookupTool from '@/components/DNSLookupTool';

export const metadata: Metadata = {
    title: 'DNS Lookup | Network Tools',
    description: 'Query DNS records and check domain information with our free online DNS lookup tool.',
    keywords: 'DNS lookup, DNS records, A record, AAAA record, CNAME record, MX record, TXT record, domain lookup',
};

export default function DNSLookupPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-4 text-sky-800">DNS Lookup</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8 prose max-w-none">
                    <p className="text-gray-700">
                        The DNS Lookup tool helps you query DNS records for any domain. Check A records,
                        AAAA records, CNAME records, MX records, and more to understand how a domain is configured.
                        Use the filter options to focus on specific record types.
                    </p>
                </div>

                <DNSLookupTool />

                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-sky-800">Understanding DNS Records</h2>
                    <div className="prose max-w-none text-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">A Record</p>
                                <p className="text-sm">Maps a domain to an IPv4 address</p>
                                <p className="text-sm mt-1 font-mono">example.com → 93.184.216.34</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">AAAA Record</p>
                                <p className="text-sm">Maps a domain to an IPv6 address</p>
                                <p className="text-sm mt-1 font-mono">example.com → 2606:2800:220:1:248:1893:25c8:1946</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">CNAME Record</p>
                                <p className="text-sm">Creates an alias pointing to another domain</p>
                                <p className="text-sm mt-1 font-mono">www.example.com → example.com</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">MX Record</p>
                                <p className="text-sm">Specifies mail servers for the domain</p>
                                <p className="text-sm mt-1 font-mono">example.com → mail.example.com</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">TXT Record</p>
                                <p className="text-sm">Holds text information (often for SPF, DKIM)</p>
                                <p className="text-sm mt-1 font-mono">example.com → "v=spf1 ..."</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">NS Record</p>
                                <p className="text-sm">Lists the nameservers for the domain</p>
                                <p className="text-sm mt-1 font-mono">example.com → ns1.example.com</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">SOA Record</p>
                                <p className="text-sm">Start of Authority - contains admin info about the zone</p>
                                <p className="text-sm mt-1 font-mono">example.com → ns1.example.com admin.example.com 2023010101 ...</p>
                            </div>

                            <div className="border rounded p-3 bg-sky-50/50">
                                <p className="font-medium text-sky-700">CAA Record</p>
                                <p className="text-sm">Certificate Authority Authorization - specifies which CAs can issue certificates</p>
                                <p className="text-sm mt-1 font-mono">example.com → 0 issue "letsencrypt.org"</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-sky-700">Common DNS Issues</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Propagation Delays:</strong> DNS changes can take 24-48 hours to propagate globally</li>
                            <li><strong>Caching:</strong> DNS records are cached by resolvers, which can delay updates</li>
                            <li><strong>Misconfiguration:</strong> Incorrect records can cause email or website access issues</li>
                            <li><strong>Security:</strong> Missing or incorrect SPF/DKIM records can affect email deliverability</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
} 