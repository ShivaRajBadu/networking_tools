'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? 'bg-blue-700' : '';
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <Link href="/" className="text-xl font-bold mb-3 lg:mb-0">
                        Network Tools
                    </Link>

                    <nav className="flex flex-wrap gap-2">
                        <Link href="/" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/')}`}>
                            IP Subnet
                        </Link>
                        <Link href="/cidr-calculator" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/cidr-calculator')}`}>
                            CIDR
                        </Link>
                        <Link href="/bandwidth-calculator" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/bandwidth-calculator')}`}>
                            Bandwidth
                        </Link>
                        <Link href="/binary-calculator" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/binary-calculator')}`}>
                            Binary
                        </Link>
                        <Link href="/ip-converter" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/ip-converter')}`}>
                            IP Converter
                        </Link>
                        <Link href="/ping-tool" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/ping-tool')}`}>
                            Ping
                        </Link>
                        <Link href="/mac-lookup" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/mac-lookup')}`}>
                            MAC Lookup
                        </Link>
                        <Link href="/dns-lookup" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/dns-lookup')}`}>
                            DNS Lookup
                        </Link>
                        <Link href="/traceroute-visualizer" className={`px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/traceroute-visualizer')}`}>
                            Traceroute Visualizer
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

