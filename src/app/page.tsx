import React from 'react';
import Calculator from './components/Calculator';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center my-8">IP Subnet Calculator</h1>
      <p className="text-center mb-8 max-w-3xl mx-auto text-gray-700">
        This calculator returns a variety of information regarding Internet Protocol version 4 (IPv4) and IPv6 subnets including possible network addresses, usable host ranges, subnet mask, and IP class, among others.
      </p>

      <Calculator />

      <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">About IP Subnetting</h2>
        <p className="mb-4">
          A subnet is a division of an IP network (internet protocol suite), where an IP network is a set of communications protocols used on the Internet and other similar networks. It is commonly known as TCP/IP (Transmission Control Protocol/Internet Protocol).
        </p>
        <p className="mb-4">
          The act of dividing a network into at least two separate networks is called subnetting, and routers are devices that allow traffic exchange between subnetworks, serving as a physical boundary. IPv4 is the most common network addressing architecture used, though the use of IPv6 has been growing since 2006.
        </p>
        <p className="mb-4">
          An IP address is comprised of a network number (routing prefix) and a rest field (host identifier). A rest field is an identifier that is specific to a given host or network interface. A routing prefix is often expressed using Classless Inter-Domain Routing (CIDR) notation for both IPv4 and IPv6.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Common Subnet Masks</h3>
        <div className="overflow-x-auto">
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

        <h3 className="text-xl font-semibold mt-6 mb-3">IP Classes</h3>
        <p className="mb-4">
          Prior to the introduction of CIDR, IPv4 network prefixes could be directly obtained from the IP address based on the class (A, B, or C, which vary based on the range of IP addresses they include) of the address and the network mask.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Class A</strong>: First bit is 0, addresses range from 1.0.0.0 to 126.255.255.255</li>
          <li><strong>Class B</strong>: First two bits are 10, addresses range from 128.0.0.0 to 191.255.255.255</li>
          <li><strong>Class C</strong>: First three bits are 110, addresses range from 192.0.0.0 to 223.255.255.255</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Related Tools</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">
            Bandwidth Calculator
          </Link>
          <Link href="/" className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">
            Binary Calculator
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© 2023 IP Subnet Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
