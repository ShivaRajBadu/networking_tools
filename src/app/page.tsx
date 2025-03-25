import React from 'react';
import Calculator from './components/Calculator';
import Link from 'next/link';
import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IP Subnet Calculator | IPv4 & IPv6 Subnet Calculator Tool',
  description: 'Free online IP subnet calculator for IPv4 and IPv6 addresses. Calculate network address, broadcast address, usable host ranges, subnet masks, and more.',
  keywords: ['IP subnet calculator', 'IPv4 calculator', 'IPv6 calculator', 'CIDR calculator', 'network calculator', 'subnet mask', 'IP address', 'networking tools'],
  openGraph: {
    title: 'IP Subnet Calculator | IPv4 & IPv6 Subnet Calculator Tool',
    description: 'Free online IP subnet calculator for IPv4 and IPv6 addresses. Calculate network address, broadcast address, usable host ranges, subnet masks, and more.',
    type: 'website',
    url: 'https://yourwebsite.com/ip-subnet-calculator',
  },
  alternates: {
    canonical: 'https://yourwebsite.com/ip-subnet-calculator',
  },
};

const Page = () => {
  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <header>
          <h1 className="text-4xl font-bold text-center my-8">IP Subnet Calculator</h1>
          <p className="text-center mb-8 max-w-3xl mx-auto text-gray-700">
            This free online calculator provides comprehensive information about IPv4 and IPv6 subnets including network addresses, usable host ranges, subnet masks, CIDR notation, and IP class details.
          </p>
        </header>

        <main>
          <section id="calculator" aria-labelledby="calculator-heading">
            <h2 id="calculator-heading" className="sr-only">IP Subnet Calculator Tool</h2>
            <Calculator />
          </section>

          <section id="what-is-subnetting" aria-labelledby="what-is-subnetting-heading" className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="what-is-subnetting-heading" className="text-2xl font-semibold mb-4">What is IP Subnetting?</h2>
            <p className="mb-4">
              IP subnetting is the process of dividing an IP network into multiple smaller network segments, called subnets. This practice improves network security, reduces network congestion, and helps manage IP address allocation more efficiently.
            </p>
            <p className="mb-4">
              A subnet is a logical subdivision of an IP network. The practice of dividing a network into two or more networks is called subnetting. Computers that belong to the same subnet are addressed with an identical most-significant bit-group in their IP addresses.
            </p>
            <p className="mb-4">
              Subnetting works by applying the network portion of an IP address to identify the subnet's network address. Using a subnet mask determines which portion of an IP address is the network address and which is the host address.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Subnetting</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Improved network security</strong>: Subnetting allows you to isolate network problems and prevent them from affecting your entire network.</li>
              <li><strong>Reduced network traffic</strong>: By breaking up a large network into smaller subnets, you can reduce network congestion and improve performance.</li>
              <li><strong>More efficient use of IP addresses</strong>: Subnetting helps conserve IP addresses by allowing networks to be split into subnetworks without requiring a new network address for each one.</li>
              <li><strong>Better network management</strong>: Subnetting makes it easier to manage your network by organizing it into logical sections.</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Did You Know?</h4>
              <p className="text-blue-900">
                The Internet Protocol version 4 (IPv4) uses 32-bit addresses, which limits the address space to 4,294,967,296 (2^32) possible unique addresses. Due to the exhaustion of IPv4 addresses, IPv6 was developed with a much larger address space of 2^128 addresses.
              </p>
            </div>
          </section>

          <section id="subnet-tables" aria-labelledby="subnet-tables-heading" className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="subnet-tables-heading" className="text-2xl font-semibold mb-4">IPv4 Subnet Reference Tables</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Common Subnet Masks</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Prefix size</th>
                    <th className="p-2 border">Network mask</th>
                    <th className="p-2 border">Usable hosts per subnet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">/8</td><td className="p-2 border">255.0.0.0</td><td className="p-2 border">16,777,214</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border">/16</td><td className="p-2 border">255.255.0.0</td><td className="p-2 border">65,534</td></tr>
                  <tr><td className="p-2 border">/24</td><td className="p-2 border">255.255.255.0</td><td className="p-2 border">254</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border">/26</td><td className="p-2 border">255.255.255.192</td><td className="p-2 border">62</td></tr>
                  <tr><td className="p-2 border">/28</td><td className="p-2 border">255.255.255.240</td><td className="p-2 border">14</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border">/30</td><td className="p-2 border">255.255.255.252</td><td className="p-2 border">2</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Complete IPv4 Subnet Reference Table</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-2 border border-gray-300">Prefix size</th>
                    <th className="p-2 border border-gray-300">Network mask</th>
                    <th className="p-2 border border-gray-300">Usable hosts per subnet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border border-gray-300">/1</td><td className="p-2 border border-gray-300">128.0.0.0</td><td className="p-2 border border-gray-300">2,147,483,646</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/2</td><td className="p-2 border border-gray-300">192.0.0.0</td><td className="p-2 border border-gray-300">1,073,741,822</td></tr>
                  <tr><td className="p-2 border border-gray-300">/3</td><td className="p-2 border border-gray-300">224.0.0.0</td><td className="p-2 border border-gray-300">536,870,910</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/4</td><td className="p-2 border border-gray-300">240.0.0.0</td><td className="p-2 border border-gray-300">268,435,454</td></tr>
                  <tr><td className="p-2 border border-gray-300">/5</td><td className="p-2 border border-gray-300">248.0.0.0</td><td className="p-2 border border-gray-300">134,217,726</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/6</td><td className="p-2 border border-gray-300">252.0.0.0</td><td className="p-2 border border-gray-300">67,108,862</td></tr>
                  <tr><td className="p-2 border border-gray-300">/7</td><td className="p-2 border border-gray-300">254.0.0.0</td><td className="p-2 border border-gray-300">33,554,430</td></tr>

                  <tr className="bg-blue-100"><td colSpan={3} className="p-2 border border-gray-300 font-semibold text-center">Class A</td></tr>

                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/8</td><td className="p-2 border border-gray-300">255.0.0.0</td><td className="p-2 border border-gray-300">16,777,214</td></tr>
                  <tr><td className="p-2 border border-gray-300">/9</td><td className="p-2 border border-gray-300">255.128.0.0</td><td className="p-2 border border-gray-300">8,388,606</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/10</td><td className="p-2 border border-gray-300">255.192.0.0</td><td className="p-2 border border-gray-300">4,194,302</td></tr>
                  <tr><td className="p-2 border border-gray-300">/11</td><td className="p-2 border border-gray-300">255.224.0.0</td><td className="p-2 border border-gray-300">2,097,150</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/12</td><td className="p-2 border border-gray-300">255.240.0.0</td><td className="p-2 border border-gray-300">1,048,574</td></tr>
                  <tr><td className="p-2 border border-gray-300">/13</td><td className="p-2 border border-gray-300">255.248.0.0</td><td className="p-2 border border-gray-300">524,286</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/14</td><td className="p-2 border border-gray-300">255.252.0.0</td><td className="p-2 border border-gray-300">262,142</td></tr>
                  <tr><td className="p-2 border border-gray-300">/15</td><td className="p-2 border border-gray-300">255.254.0.0</td><td className="p-2 border border-gray-300">131,070</td></tr>

                  <tr className="bg-blue-100"><td colSpan={3} className="p-2 border border-gray-300 font-semibold text-center">Class B</td></tr>

                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/16</td><td className="p-2 border border-gray-300">255.255.0.0</td><td className="p-2 border border-gray-300">65,534</td></tr>
                  <tr><td className="p-2 border border-gray-300">/17</td><td className="p-2 border border-gray-300">255.255.128.0</td><td className="p-2 border border-gray-300">32,766</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/18</td><td className="p-2 border border-gray-300">255.255.192.0</td><td className="p-2 border border-gray-300">16,382</td></tr>
                  <tr><td className="p-2 border border-gray-300">/19</td><td className="p-2 border border-gray-300">255.255.224.0</td><td className="p-2 border border-gray-300">8,190</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/20</td><td className="p-2 border border-gray-300">255.255.240.0</td><td className="p-2 border border-gray-300">4,094</td></tr>
                  <tr><td className="p-2 border border-gray-300">/21</td><td className="p-2 border border-gray-300">255.255.248.0</td><td className="p-2 border border-gray-300">2,046</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/22</td><td className="p-2 border border-gray-300">255.255.252.0</td><td className="p-2 border border-gray-300">1,022</td></tr>
                  <tr><td className="p-2 border border-gray-300">/23</td><td className="p-2 border border-gray-300">255.255.254.0</td><td className="p-2 border border-gray-300">510</td></tr>

                  <tr className="bg-blue-100"><td colSpan={3} className="p-2 border border-gray-300 font-semibold text-center">Class C</td></tr>

                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/24</td><td className="p-2 border border-gray-300">255.255.255.0</td><td className="p-2 border border-gray-300">254</td></tr>
                  <tr><td className="p-2 border border-gray-300">/25</td><td className="p-2 border border-gray-300">255.255.255.128</td><td className="p-2 border border-gray-300">126</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/26</td><td className="p-2 border border-gray-300">255.255.255.192</td><td className="p-2 border border-gray-300">62</td></tr>
                  <tr><td className="p-2 border border-gray-300">/27</td><td className="p-2 border border-gray-300">255.255.255.224</td><td className="p-2 border border-gray-300">30</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/28</td><td className="p-2 border border-gray-300">255.255.255.240</td><td className="p-2 border border-gray-300">14</td></tr>
                  <tr><td className="p-2 border border-gray-300">/29</td><td className="p-2 border border-gray-300">255.255.255.248</td><td className="p-2 border border-gray-300">6</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/30</td><td className="p-2 border border-gray-300">255.255.255.252</td><td className="p-2 border border-gray-300">2</td></tr>
                  <tr><td className="p-2 border border-gray-300">/31</td><td className="p-2 border border-gray-300">255.255.255.254</td><td className="p-2 border border-gray-300">0</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border border-gray-300">/32</td><td className="p-2 border border-gray-300">255.255.255.255</td><td className="p-2 border border-gray-300">0</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="ip-classes" aria-labelledby="ip-classes-heading" className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="ip-classes-heading" className="text-2xl font-semibold mb-4">Understanding IP Classes</h2>
            <p className="mb-4">
              IP address classes were created to provide a structured method of addressing in the early days of the Internet. Although Classless Inter-Domain Routing (CIDR) has largely replaced the class system, understanding IP classes remains important for networking fundamentals.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Class A</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>First bit</strong>: 0</li>
                  <li><strong>Range</strong>: 1.0.0.0 - 126.255.255.255</li>
                  <li><strong>Default mask</strong>: 255.0.0.0 (/8)</li>
                  <li><strong>Networks</strong>: 126</li>
                  <li><strong>Hosts per network</strong>: 16,777,214</li>
                  <li><strong>Use case</strong>: Very large organizations</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Class B</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>First bits</strong>: 10</li>
                  <li><strong>Range</strong>: 128.0.0.0 - 191.255.255.255</li>
                  <li><strong>Default mask</strong>: 255.255.0.0 (/16)</li>
                  <li><strong>Networks</strong>: 16,384</li>
                  <li><strong>Hosts per network</strong>: 65,534</li>
                  <li><strong>Use case</strong>: Medium to large organizations</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Class C</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>First bits</strong>: 110</li>
                  <li><strong>Range</strong>: 192.0.0.0 - 223.255.255.255</li>
                  <li><strong>Default mask</strong>: 255.255.255.0 (/24)</li>
                  <li><strong>Networks</strong>: 2,097,152</li>
                  <li><strong>Hosts per network</strong>: 254</li>
                  <li><strong>Use case</strong>: Small networks</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Class D</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>First bits</strong>: 1110</li>
                  <li><strong>Range</strong>: 224.0.0.0 - 239.255.255.255</li>
                  <li><strong>Use</strong>: Multicast addresses</li>
                  <li><strong>Purpose</strong>: Used to address a group of hosts in a multicast distribution</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Class E</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>First bits</strong>: 1111</li>
                  <li><strong>Range</strong>: 240.0.0.0 - 255.255.255.255</li>
                  <li><strong>Use</strong>: Reserved for experimental purposes</li>
                  <li><strong>Purpose</strong>: Not available for general use on the public Internet</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="cidr-notation" aria-labelledby="cidr-notation-heading" className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="cidr-notation-heading" className="text-2xl font-semibold mb-4">CIDR Notation Explained</h2>
            <p className="mb-4">
              Classless Inter-Domain Routing (CIDR) is a method for allocating IP addresses and for IP routing. CIDR notation is a compact representation of an IP address and its associated routing prefix.
            </p>
            <p className="mb-4">
              The notation consists of an IP address, followed by a slash ("/") character, and then a decimal number. The decimal number is the count of leading 1 bits in the routing mask, traditionally called the network mask.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p className="font-mono">192.168.100.0/24</p>
              <p className="mt-2">This represents:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>IP address: 192.168.100.0</li>
                <li>Subnet mask: 255.255.255.0 (24 bits)</li>
                <li>Network address: 192.168.100.0</li>
                <li>Broadcast address: 192.168.100.255</li>
                <li>Usable host range: 192.168.100.1 - 192.168.100.254</li>
              </ul>
            </div>

            <p className="mb-4">
              CIDR notation allows for more flexible allocation of IP addresses than the original classful IP addressing architecture. It helps to slow the exhaustion of IPv4 addresses by allowing organizations to request address blocks of specific sizes rather than being limited to Class A, B, or C blocks.
            </p>
          </section>

          <section id="ipv6-subnetting" aria-labelledby="ipv6-subnetting-heading" className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="ipv6-subnetting-heading" className="text-2xl font-semibold mb-4">IPv6 Subnetting</h2>
            <p className="mb-4">
              IPv6 uses a 128-bit address space, providing approximately 3.4 × 10^38 unique addresses. This vast address space eliminates the need for techniques like NAT (Network Address Translation) that were developed to extend the life of IPv4.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">IPv6 Address Structure</h3>
            <p className="mb-4">
              An IPv6 address is represented as eight groups of four hexadecimal digits, with the groups being separated by colons (:). For example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Common IPv6 Prefix Lengths</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Prefix Length</th>
                    <th className="p-2 border">Common Use</th>
                    <th className="p-2 border">Number of Subnets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">/48</td><td className="p-2 border">Typical allocation to a site (e.g., a company)</td><td className="p-2 border">65,536 /64 networks</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border">/56</td><td className="p-2 border">Typical allocation to a small site</td><td className="p-2 border">256 /64 networks</td></tr>
                  <tr><td className="p-2 border">/64</td><td className="p-2 border">Typical subnet size (single network segment)</td><td className="p-2 border">1 network with 2^64 addresses</td></tr>
                  <tr className="bg-gray-100"><td className="p-2 border">/128</td><td className="p-2 border">Single host address</td><td className="p-2 border">1 address</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">IPv6 Subnetting Best Practices</h4>
              <ul className="list-disc pl-6 space-y-1 text-blue-900">
                <li>Use /64 for all general-purpose subnets</li>
                <li>Reserve /127 for point-to-point links (router-to-router)</li>
                <li>Use /128 for loopback addresses</li>
                <li>Plan your addressing scheme hierarchically</li>
                <li>Document your IPv6 address plan thoroughly</li>
              </ul>
            </div>
          </section>

          <section id="faq" aria-labelledby="faq-heading" className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="faq-heading" className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">What is a subnet mask?</h3>
                <p className="mt-2">
                  A subnet mask is a 32-bit number that masks an IP address, and divides the IP address into network address and host address. Subnet masks are used to specify which portion of an IP address refers to the network or subnet, and which part refers to the host.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800">How do I calculate the number of usable hosts in a subnet?</h3>
                <p className="mt-2">
                  To calculate the number of usable hosts in a subnet, use the formula 2^(32-prefix) - 2, where "prefix" is the CIDR prefix length. For example, a /24 network has 2^(32-24) - 2 = 2^8 - 2 = 254 usable hosts. We subtract 2 because the network address and broadcast address cannot be assigned to hosts.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800">What is the difference between IPv4 and IPv6?</h3>
                <p className="mt-2">
                  IPv4 uses 32-bit addresses, limiting it to about 4.3 billion unique addresses. IPv6 uses 128-bit addresses, providing approximately 3.4 × 10^38 addresses. IPv6 also has simplified headers, built-in security features, and eliminates the need for NAT (Network Address Translation).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800">What is a network address?</h3>
                <p className="mt-2">
                  A network address is the address of the network itself. It's the first address in a subnet and cannot be assigned to a host. For example, in the subnet 192.168.1.0/24, the network address is 192.168.1.0.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800">What is a broadcast address?</h3>
                <p className="mt-2">
                  A broadcast address is used to send data to all hosts on a network. It's the last address in a subnet and cannot be assigned to a host. For example, in the subnet 192.168.1.0/24, the broadcast address is 192.168.1.255.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800">How do I subnet a network?</h3>
                <p className="mt-2">
                  To subnet a network, you need to borrow bits from the host portion of the IP address and use them for the network portion. This increases the number of networks while decreasing the number of hosts per network. Our IP Subnet Calculator can help you determine the network address, broadcast address, and usable host range for any subnet.
                </p>
              </div>
            </div>
          </section>

          <section id="related-tools" aria-labelledby="related-tools-heading" className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 id="related-tools-heading" className="text-2xl font-semibold mb-4">Related Networking Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/" className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">Bandwidth Calculator</h3>
                <p className="text-sm text-gray-700">Calculate download/upload times and data transfer rates</p>
              </Link>

              <Link href="/" className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">Binary Calculator</h3>
                <p className="text-sm text-gray-700">Convert between binary, decimal, hexadecimal, and octal</p>
              </Link>

              <Link href="/" className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">CIDR Calculator</h3>
                <p className="text-sm text-gray-700">Calculate CIDR network and host ranges</p>
              </Link>

              <Link href="/" className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">IP Geolocation</h3>
                <p className="text-sm text-gray-700">Find the geographic location of an IP address</p>
              </Link>

              <Link href="/" className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">DNS Lookup</h3>
                <p className="text-sm text-gray-700">Query DNS records for a domain name</p>
              </Link>

              <Link href="/" className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800 mb-2">Ping Test</h3>
                <p className="text-sm text-gray-700">Test the reachability of a host on an IP network</p>
              </Link>
            </div>
          </section>
        </main>

        <footer className="mt-12 text-center text-gray-600 text-sm p-8 border-t">
          <div className="max-w-4xl mx-auto">
            <p className="mb-4">© 2023 IP Subnet Calculator. All rights reserved.</p>
            <p className="mb-4">
              This IP subnet calculator is provided for educational purposes. While we strive for accuracy, please verify critical network configurations independently.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="text-blue-600 hover:underline">Terms of Use</Link>
              <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;
