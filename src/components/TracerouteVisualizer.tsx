'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomTooltip } from "@/components/ui/custom-tooltip";
import { Loader2 } from "lucide-react";

// Dynamic import for Leaflet (must be client-side only)
const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Loading map...</p>
        </div>
    </div>
});

// Update the HopData interface to include the new fields from our API
interface HopData {
    ip: string;
    hostname: string;
    lat: number | null;
    lng: number | null;
    rtt: number | null;
    city?: string;
    country?: string;
    network?: string;
    asn?: string;
    isp?: string;
    dataSource?: 'real' | 'simulated' | 'preset';
    hop?: number;
}

// Example domains for suggestions
const popularDomains = [
    "google.com",
    "amazon.com",
    "facebook.com",
    "microsoft.com",
    "apple.com",
    "netflix.com",
    "github.com",
    "cloudflare.com"
];

export default function TracerouteVisualizer() {
    const [hostname, setHostname] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('');
    const [isTracing, setIsTracing] = useState(false);
    const [error, setError] = useState('');
    const [hops, setHops] = useState<Array<HopData>>([]);
    const [activeHop, setActiveHop] = useState(-1);
    const mapRef = useRef<HTMLDivElement>(null);
    const [destinationIP, setDestinationIP] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [loadingStage, setLoadingStage] = useState<string>('');

    // Filter suggestions based on input
    useEffect(() => {
        if (hostname.trim() === '') {
            setFilteredSuggestions([]);
            return;
        }

        const filtered = popularDomains.filter(domain =>
            domain.toLowerCase().includes(hostname.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    }, [hostname]);

    const startTrace = async () => {
        try {
            setError('');
            setHops([]);
            setActiveHop(-1);
            setLoadingStage('');

            const target = hostname.trim();
            if (!target) {
                throw new Error('Please enter a hostname or IP address');
            }

            setIsTracing(true);
            try {
                // Call our backend API
                setLoadingStage('Resolving hostname...');

                const response = await fetch('/api/traceroute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ hostname: target }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Traceroute failed');
                }

                setLoadingStage('Processing traceroute results...');
                const data = await response.json();

                if (!data.hops || !Array.isArray(data.hops)) {
                    throw new Error('Invalid response from traceroute API');
                }

                // Store the destination IP for display
                setDestinationIP(data.destinationIP);

                // Mark all hops as real data
                const realHops = data.hops.map((hop: any) => ({
                    ...hop,
                    dataSource: 'real'
                }));

                setLoadingStage('Visualizing network path...');

                // Animate the real traceroute results
                let currentHop = 0;
                const interval = setInterval(() => {
                    if (currentHop < realHops.length) {
                        setHops(prevHops => [...prevHops, realHops[currentHop]]);
                        setActiveHop(currentHop);
                        currentHop++;
                    } else {
                        clearInterval(interval);
                        setIsTracing(false);
                        setLoadingStage('');
                    }
                }, 800);
            } catch (err: any) {
                console.error("API error:", err);
                setError(`Error: ${err.message || 'Failed to perform traceroute'}`);
                setIsTracing(false);
                setLoadingStage('');
            }

        } catch (err: any) {
            console.error("General error:", err);
            setError(`Error: ${err.message || 'Unknown error occurred'}`);
            setIsTracing(false);
            setLoadingStage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            startTrace();
        }
    };

    const selectSuggestion = (suggestion: string) => {
        setHostname(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="space-y-6">
            <Card className='py-0'>
                <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white">
                    <CardTitle className='py-6'>Traceroute Visualizer</CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="col-span-3">
                                <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 mb-1">
                                    Hostname or IP Address:
                                </label>
                                <div className="relative">
                                    <div className="flex">
                                        <div className="relative flex-grow">
                                            <input
                                                type="text"
                                                id="hostname"
                                                value={hostname}
                                                onChange={(e) => {
                                                    setHostname(e.target.value);
                                                    setSelectedPreset('');
                                                    setShowSuggestions(true);
                                                }}
                                                onKeyDown={handleKeyDown}
                                                onFocus={() => setShowSuggestions(true)}
                                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                                placeholder="e.g., example.com, google.com, 8.8.8.8"
                                                className="w-full p-2 border-2 rounded-l outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                disabled={isTracing}
                                            />
                                            {showSuggestions && filteredSuggestions.length > 0 && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <ul className="py-1 overflow-auto text-base">
                                                        {filteredSuggestions.map((suggestion, index) => (
                                                            <li
                                                                key={index}
                                                                className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                                                                onClick={() => selectSuggestion(suggestion)}
                                                            >
                                                                {suggestion}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={startTrace}
                                            disabled={isTracing || !hostname.trim()}
                                            className="bg-indigo-600 cursor-pointer font-semibold text-white px-4 py-2 rounded-r hover:bg-indigo-700 transition disabled:bg-indigo-300 flex items-center"
                                        >
                                            {isTracing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                    Tracing...
                                                </>
                                            ) : (
                                                'Trace'
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Enter a domain name or IP address to trace the network path</p>
                                </div>
                            </div>
                        </div>

                        {isTracing && loadingStage && (
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-center">
                                <Loader2 className="h-5 w-5 animate-spin text-indigo-600 mr-3" />
                                <div>
                                    <p className="font-medium text-indigo-800">{loadingStage}</p>
                                    <p className="text-xs text-gray-600">This may take a few moments...</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded border border-red-200 flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-medium">Error</p>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {hops.length > 0 && (
                            <div className="mt-6 space-y-6">
                                {destinationIP && (
                                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                        <h3 className="font-medium text-indigo-800 mb-1">Destination Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">Hostname:</span>
                                                <span className="text-sm ml-2">{hostname}</span>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">IP Address:</span>
                                                <span className="text-sm ml-2 font-mono">{destinationIP}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {destinationIP && (
                                    <div className="bg-white p-4 rounded-lg border border-indigo-100 mb-4">
                                        <h3 className="font-medium text-indigo-800 mb-2">Traceroute Summary</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-indigo-50 p-3 rounded">
                                                <p className="text-sm font-medium text-indigo-700">Total Hops</p>
                                                <p className="text-xl font-semibold">{hops.length}</p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {hops.length < 15 ? "Direct path" : hops.length < 25 ? "Average path length" : "Long path"}
                                                </p>
                                            </div>

                                            <div className="bg-indigo-50 p-3 rounded">
                                                <p className="text-sm font-medium text-indigo-700">Response Rate</p>
                                                <p className="text-xl font-semibold">
                                                    {Math.round((hops.filter(h => h.ip !== '*').length / hops.length) * 100)}%
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {hops.filter(h => h.ip === '*').length} hops didn't respond
                                                </p>
                                            </div>

                                            <div className="bg-indigo-50 p-3 rounded">
                                                <p className="text-sm font-medium text-indigo-700">Avg. Response Time</p>
                                                <p className="text-xl font-semibold">
                                                    {Math.round(hops.filter(h => h.rtt !== null).reduce((sum, h) => sum + (h.rtt || 0), 0) /
                                                        hops.filter(h => h.rtt !== null).length)} ms
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {hops.filter(h => h.rtt !== null && h.rtt > 100).length} hops with high latency
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-sm text-gray-700">
                                            <p className="mb-2"><span className="font-medium">Path Analysis:</span></p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>
                                                    <span className="font-medium">Network Traversal:</span> Your connection to {hostname} passes through {
                                                        Array.from(new Set(hops.filter(h => h.asn).map(h => h.asn))).length
                                                    } different autonomous systems.
                                                </li>
                                                <li>
                                                    <span className="font-medium">Geographic Path:</span> Your data travels through {
                                                        Array.from(new Set(hops.filter(h => h.country && h.country !== "Unknown").map(h => h.country))).length
                                                    } different countries.
                                                </li>
                                                <li>
                                                    <span className="font-medium">Path Quality:</span> {
                                                        hops.filter(h => h.rtt !== null && h.rtt > 100).length > 3
                                                            ? "Several high-latency hops detected, which may affect connection quality."
                                                            : "Most hops have good response times, suggesting a healthy connection path."
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden" style={{ height: '400px' }}>
                                    <LeafletMap
                                        hops={hops.filter(hop => hop !== undefined && typeof hop === 'object')}
                                        activeHop={activeHop}
                                    />
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    <div className="flex items-center">
                                                        <span>Hop</span>
                                                        <CustomTooltip
                                                            content={<p className="max-w-xs">The sequence number of the router or server in the path</p>}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400 inline-block">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </CustomTooltip>
                                                    </div>
                                                </th>

                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    <div className="flex items-center">
                                                        <span>IP Address</span>
                                                        <CustomTooltip
                                                            content={<p className="max-w-xs">The network address of the router or server</p>}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </CustomTooltip>
                                                    </div>
                                                </th>

                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    <div className="flex items-center">
                                                        <span>Hostname</span>
                                                        <CustomTooltip
                                                            content={<p className="max-w-xs">The domain name of the router or server (when available)</p>}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </CustomTooltip>
                                                    </div>
                                                </th>

                                                <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    <div className="flex items-center">
                                                        <span>RTT</span>
                                                        <CustomTooltip
                                                            content={<p className="max-w-xs">Round-Trip Time in milliseconds - how long it takes for a packet to reach the hop and return</p>}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </CustomTooltip>
                                                    </div>
                                                </th>

                                                <th className="hidden md:table-cell px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    <div className="flex items-center">
                                                        <span>Location</span>
                                                        <CustomTooltip
                                                            content={<p className="max-w-xs">The geographic location of the hop (city and country)</p>}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </CustomTooltip>
                                                    </div>
                                                </th>

                                                <th className="hidden lg:table-cell px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    <div className="flex items-center">
                                                        <span>Network Info</span>
                                                        <CustomTooltip
                                                            content={<p className="max-w-xs">ASN (Autonomous System Number) and ISP information when available</p>}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 text-gray-400">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </CustomTooltip>
                                                    </div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {hops
                                                .filter(hop => hop !== undefined && typeof hop === 'object')
                                                .map((hop, index) => (
                                                    <tr key={index} className={index === activeHop ? 'bg-indigo-50' : 'bg-white'}>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">{hop?.hop || index + 1}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-mono text-gray-900 truncate max-w-[100px] sm:max-w-none">
                                                            {hop?.ip === '*' ?
                                                                <span className="text-gray-400">*</span> :
                                                                hop?.ip || 'Unknown'}
                                                        </td>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 truncate max-w-[100px] sm:max-w-none">
                                                            {hop?.hostname === '*' ?
                                                                <span className="text-gray-400">*</span> :
                                                                hop?.hostname || 'Unknown'}
                                                        </td>
                                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">
                                                            {hop?.rtt !== null ? `${hop.rtt} ms` :
                                                                <span className="text-gray-400">*</span>}
                                                        </td>
                                                        <td className="hidden md:table-cell px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">
                                                            {hop?.city && hop.city !== 'Unknown' && hop.country
                                                                ? `${hop.city}, ${hop.country}`
                                                                : hop?.country || 'Unknown'}
                                                        </td>
                                                        <td className="hidden lg:table-cell px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900">
                                                            {hop?.asn ? (
                                                                <div className="space-y-1">
                                                                    {hop.asn && <div className="text-xs text-gray-600">{hop.asn}</div>}
                                                                    {hop.isp && <div className="text-xs">{hop.isp}</div>}
                                                                </div>
                                                            ) : 'Unknown'}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="md:hidden mt-4 bg-indigo-50 p-3 rounded-lg">
                                    <h3 className="font-medium text-sm mb-1">Active Hop Details:</h3>
                                    {activeHop >= 0 && activeHop < hops.length && (
                                        <div className="text-xs space-y-1">
                                            <p><span className="font-medium">Location:</span> {
                                                hops[activeHop]?.city && hops[activeHop]?.country
                                                    ? `${hops[activeHop].city}, ${hops[activeHop].country}`
                                                    : hops[activeHop]?.country || 'Unknown'
                                            }</p>
                                            <p><span className="font-medium">Network:</span> {hops[activeHop]?.network || 'Unknown'}</p>
                                            <p><span className="font-medium">ASN:</span> {hops[activeHop]?.asn || 'Unknown'}</p>
                                            <p><span className="font-medium">ISP:</span> {hops[activeHop]?.isp || 'Unknown'}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-indigo-50 p-4 rounded text-sm text-indigo-800 mt-4">
                                    <p className="font-semibold mb-2">About This Traceroute:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><span className="font-medium">Real Data:</span> This visualization shows the actual network path from our server to the destination.</li>
                                        <li><span className="font-medium">Missing Hops:</span> Entries with asterisks (*) represent routers that didn't respond to our traceroute packets. This is common and doesn't necessarily indicate a problem.</li>
                                        <li><span className="font-medium">Hop Count:</span> The number of routers between our server and the destination. Fewer hops generally means a more direct connection. Most internet paths have between 10-20 hops.</li>
                                        <li><span className="font-medium">Response Time:</span> The Round-Trip Time (RTT) shows how long it takes for a packet to reach each hop and return. Higher values indicate greater latency.</li>
                                        <li><span className="font-medium">Geolocation Accuracy:</span> IP geolocation is approximate and may not represent the exact physical location of network equipment. Some routers may appear in unexpected locations due to IP assignment practices.</li>
                                        <li><span className="font-medium">Network Information:</span> ASN (Autonomous System Number) identifies the network operator. Each ASN represents a different network under single administrative control.</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
