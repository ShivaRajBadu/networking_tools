'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Check, AlertCircle, Search, X, ExternalLink, RefreshCw, Filter } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// DNS record type mapping
const DNS_RECORD_TYPES: Record<number, string> = {
    1: 'A',
    2: 'NS',
    5: 'CNAME',
    6: 'SOA',
    12: 'PTR',
    15: 'MX',
    16: 'TXT',
    28: 'AAAA',
    33: 'SRV',
    43: 'DS',
    46: 'RRSIG',
    47: 'NSEC',
    48: 'DNSKEY',
    50: 'NSEC3',
    51: 'NSEC3PARAM',
    52: 'TLSA',
    257: 'CAA',
};

// Record type colors
const TYPE_COLORS: Record<string, string> = {
    'A': 'bg-blue-100 text-blue-800 border-blue-200',
    'AAAA': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'CNAME': 'bg-green-100 text-green-800 border-green-200',
    'MX': 'bg-purple-100 text-purple-800 border-purple-200',
    'TXT': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'NS': 'bg-orange-100 text-orange-800 border-orange-200',
    'SOA': 'bg-red-100 text-red-800 border-red-200',
    'PTR': 'bg-pink-100 text-pink-800 border-pink-200',
    'SRV': 'bg-teal-100 text-teal-800 border-teal-200',
    'CAA': 'bg-gray-100 text-gray-800 border-gray-200',
    'default': 'bg-sky-100 text-sky-800 border-sky-200',
};

// Record type descriptions
const TYPE_DESCRIPTIONS: Record<string, string> = {
    'A': 'Maps a domain to an IPv4 address',
    'AAAA': 'Maps a domain to an IPv6 address',
    'CNAME': 'Creates an alias pointing to another domain',
    'MX': 'Specifies mail servers for the domain',
    'TXT': 'Holds text information (often for SPF, DKIM)',
    'NS': 'Lists the nameservers for the domain',
    'SOA': 'Contains administrative information about the zone',
    'PTR': 'Maps an IP address to a domain name (reverse DNS)',
    'SRV': 'Specifies location of services (e.g., SIP, XMPP)',
    'CAA': 'Specifies which Certificate Authorities can issue certificates',
};

export default function DNSLookupTool() {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [queryType, setQueryType] = useState('ANY');
    const [recentLookups, setRecentLookups] = useState<string[]>([]);
    const [showRecent, setShowRecent] = useState(false);
    const [lookupTime, setLookupTime] = useState<number | null>(null);

    // Load recent lookups from localStorage on component mount
    useEffect(() => {
        const saved = localStorage.getItem('dnsLookupHistory');
        if (saved) {
            try {
                setRecentLookups(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse lookup history');
            }
        }
    }, []);

    const saveToRecent = (domainName: string) => {
        const updatedRecent = [
            domainName,
            ...recentLookups.filter(d => d !== domainName)
        ].slice(0, 5); // Keep only the 5 most recent

        setRecentLookups(updatedRecent);
        localStorage.setItem('dnsLookupHistory', JSON.stringify(updatedRecent));
    };

    const performLookup = async () => {
        if (!domain.trim()) {
            setError('Please enter a domain name');
            return;
        }

        try {
            setError('');
            setResults(null);
            setIsLoading(true);
            setActiveFilter(null);
            setShowRecent(false);
            const startTime = performance.now();

            // Using public DNS API with type parameter
            const typeParam = queryType !== 'ANY' ? `&type=${queryType}` : '';
            const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}${typeParam}`);

            if (!response.ok) {
                throw new Error(`DNS lookup failed: ${response.statusText}`);
            }

            const data = await response.json();
            const endTime = performance.now();
            setLookupTime(Math.round(endTime - startTime));

            if (data.Status === 0) { // 0 means no error
                setResults(data);
                saveToRecent(domain);
            } else {
                throw new Error(`DNS lookup failed with status: ${data.Status}`);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getRecordTypeName = (type: number): string => {
        return DNS_RECORD_TYPES[type] || `Type ${type}`;
    };

    const getTypeColor = (type: string): string => {
        return TYPE_COLORS[type] || TYPE_COLORS.default;
    };

    const getTypeDescription = (type: string): string => {
        return TYPE_DESCRIPTIONS[type] || `DNS record type ${type}`;
    };

    const copyToClipboard = () => {
        if (!results) return;

        const formattedResults = JSON.stringify(results, null, 2);
        navigator.clipboard.writeText(formattedResults);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const filteredRecords = activeFilter
        ? results?.Answer?.filter((record: any) => getRecordTypeName(record.type) === activeFilter)
        : results?.Answer;

    const availableTypes = results?.Answer
        ? [...new Set(results.Answer.map((record: any) => getRecordTypeName(record.type)))]
        : [];

    return (
        <div className="space-y-4 sm:space-y-6">
            <Card className="border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b px-4 sm:px-6">
                    <CardTitle className="text-sky-800 flex items-center gap-2 text-lg sm:text-xl">
                        <Search className="h-5 w-5" />
                        DNS Lookup Tool
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain Name:
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="domain"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        onFocus={() => recentLookups.length > 0 && setShowRecent(true)}
                                        onBlur={() => setTimeout(() => setShowRecent(false), 200)}
                                        placeholder="e.g., example.com"
                                        className="w-full p-3 pl-3 pr-10 border-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-base"
                                        onKeyDown={(e) => e.key === 'Enter' && performLookup()}
                                    />
                                    {domain && (
                                        <button
                                            onClick={() => setDomain('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100"
                                            aria-label="Clear input"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    )}

                                    {showRecent && recentLookups.length > 0 && (
                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                            <div className="p-2 border-b text-xs text-gray-500 font-medium">Recent lookups</div>
                                            <ul className="max-h-48 overflow-auto">
                                                {recentLookups.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-0"
                                                        onClick={() => {
                                                            setDomain(item);
                                                            setShowRecent(false);
                                                        }}
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="queryType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Record Type:
                                </label>
                                <select
                                    id="queryType"
                                    value={queryType}
                                    onChange={(e) => setQueryType(e.target.value)}
                                    className="w-full p-3 border-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 cursor-pointer text-base"
                                >
                                    <option value="ANY">ANY (All Records)</option>
                                    <option value="A">A (IPv4 Address)</option>
                                    <option value="AAAA">AAAA (IPv6 Address)</option>
                                    <option value="CNAME">CNAME (Canonical Name)</option>
                                    <option value="MX">MX (Mail Exchange)</option>
                                    <option value="TXT">TXT (Text)</option>
                                    <option value="NS">NS (Name Server)</option>
                                    <option value="SOA">SOA (Start of Authority)</option>
                                    <option value="SRV">SRV (Service)</option>
                                    <option value="CAA">CAA (Certification Authority)</option>
                                </select>
                            </div>

                            <button
                                onClick={performLookup}
                                disabled={isLoading}
                                className="w-full bg-sky-600 text-white px-4 py-3 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-sky-300 flex items-center justify-center gap-2 shadow-sm hover:shadow text-base font-medium"
                            >
                                {isLoading ? (
                                    <>
                                        <RefreshCw className="h-5 w-5 animate-spin" />
                                        Looking up...
                                    </>
                                ) : (
                                    <>
                                        <Search className="h-5 w-5" />
                                        Lookup DNS Records
                                    </>
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-fadeIn">
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {results && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <div>
                                            <h3 className="text-lg font-semibold text-sky-800">{domain}</h3>
                                            {lookupTime && (
                                                <p className="text-xs text-gray-500">Query completed in {lookupTime}ms</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <a
                                                href={`https://who.is/whois/${domain}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-md transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                WHOIS
                                            </a>

                                            <button
                                                onClick={copyToClipboard}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="h-4 w-4" />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clipboard className="h-4 w-4" />
                                                        Copy JSON
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {availableTypes.length > 1 && (
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto">
                                            <div className="flex flex-nowrap gap-2 min-w-max">
                                                <span className="text-sm text-gray-500 flex items-center">
                                                    <Filter className="h-4 w-4 mr-2" />
                                                    Filter:
                                                </span>
                                                <Badge
                                                    className={`cursor-pointer transition-colors ${!activeFilter ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                                    onClick={() => setActiveFilter(null)}
                                                >
                                                    All
                                                </Badge>
                                                {availableTypes.map((type: any) => (
                                                    <Badge
                                                        key={type}
                                                        className={`cursor-pointer transition-colors ${activeFilter === type ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                                        onClick={() => setActiveFilter(type === activeFilter ? null : type)}
                                                    >
                                                        {type}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Tabs defaultValue="records" className="w-full">
                                        <TabsList className="w-full flex rounded-lg mb-4">
                                            <TabsTrigger value="records" className="flex-1">Records</TabsTrigger>
                                            <TabsTrigger value="raw" className="flex-1">Raw Data</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="records">
                                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                                <div className="inline-block min-w-full align-middle">
                                                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TTL</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {filteredRecords?.map((record: any, index: number) => {
                                                                    const typeName = getRecordTypeName(record.type);
                                                                    return (
                                                                        <tr key={index} className="hover:bg-gray-50">
                                                                            <td className="px-3 py-4 whitespace-nowrap">
                                                                                <TooltipProvider>
                                                                                    <Tooltip>
                                                                                        <TooltipTrigger asChild>
                                                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(typeName)}`}>
                                                                                                {typeName}
                                                                                            </span>
                                                                                        </TooltipTrigger>
                                                                                        <TooltipContent>
                                                                                            <p>{getTypeDescription(typeName)}</p>
                                                                                        </TooltipContent>
                                                                                    </Tooltip>
                                                                                </TooltipProvider>
                                                                            </td>
                                                                            <td className="px-3 py-4 text-sm text-gray-900 font-mono break-all">
                                                                                {record.name}
                                                                            </td>
                                                                            <td className="px-3 py-4 text-sm text-gray-900 font-mono break-all">
                                                                                {record.data}
                                                                            </td>
                                                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                                {record.TTL}s
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="raw">
                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                <pre className="text-xs sm:text-sm overflow-x-auto font-mono text-gray-800 max-h-64 sm:max-h-96">
                                                    {JSON.stringify(results, null, 2)}
                                                </pre>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 