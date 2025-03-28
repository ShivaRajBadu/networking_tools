'use client';
import React, { useState, useEffect } from 'react';
import { calculateIPv4Subnet } from '../utils/subnetting';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IPv4Calculator = () => {
    const router = useRouter();
    const [ip, setIp] = useState('192.168.1.1');
    const [mask, setMask] = useState('255.255.255.0');
    const [networkClass, setNetworkClass] = useState('Any');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    // Update mask when network class changes
    useEffect(() => {
        // Set default mask based on network class
        if (networkClass === 'A') {
            setMask('255.0.0.0');
        } else if (networkClass === 'B') {
            setMask('255.255.0.0');
        } else if (networkClass === 'C') {
            setMask('255.255.255.0');
        }
    }, [networkClass]);

    const validateIP = (ip: string) => {
        const pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        if (!pattern.test(ip)) return false;

        const octets = ip.split('.').map(Number);
        return octets.every(octet => octet >= 0 && octet <= 255);
    };

    const handleCalculate = () => {
        setError('');

        if (!validateIP(ip)) {
            setError('Please enter a valid IPv4 address');
            return;
        }

        // Validate IP address against selected class
        const firstOctet = parseInt(ip.split('.')[0], 10);
        if (networkClass === 'A' && (firstOctet < 1 || firstOctet > 126)) {
            setError('Class A addresses must be in range 1.0.0.0 to 126.255.255.255');
            return;
        } else if (networkClass === 'B' && (firstOctet < 128 || firstOctet > 191)) {
            setError('Class B addresses must be in range 128.0.0.0 to 191.255.255.255');
            return;
        } else if (networkClass === 'C' && (firstOctet < 192 || firstOctet > 223)) {
            setError('Class C addresses must be in range 192.0.0.0 to 223.255.255.255');
            return;
        }

        const subnetResult = calculateIPv4Subnet(ip, mask, networkClass);
        setResult(subnetResult);

        // Navigate to result page with query parameters
        router.push(`/result?cclass=${networkClass}&csubnet=${mask}&cip=${ip}&ctype=ipv4`);
    };

    const getMaskOptions = () => {
        const masks = [];

        // Different CIDR ranges based on class
        let startCidr = 1;
        let endCidr = 32;

        if (networkClass === 'A') {
            startCidr = 8;  // Default for Class A
            endCidr = 15;   // Typical range for Class A subnetting
        } else if (networkClass === 'B') {
            startCidr = 16; // Default for Class B
            endCidr = 23;   // Typical range for Class B subnetting
        } else if (networkClass === 'C') {
            startCidr = 24; // Default for Class C
            endCidr = 30;   // Typical range for Class C subnetting
        }

        // Add the default mask for the class first
        if (networkClass === 'A') {
            masks.push({ value: '255.0.0.0', cidr: 8 });
        } else if (networkClass === 'B') {
            masks.push({ value: '255.255.0.0', cidr: 16 });
        } else if (networkClass === 'C') {
            masks.push({ value: '255.255.255.0', cidr: 24 });
        }

        // Add all possible masks for the selected range
        for (let i = startCidr; i <= endCidr; i++) {
            let binary = '1'.repeat(i) + '0'.repeat(32 - i);
            let mask = '';
            for (let j = 0; j < 32; j += 8) {
                mask += parseInt(binary.substr(j, 8), 2) + (j < 24 ? '.' : '');
            }

            // Skip if it's already the default mask
            if ((networkClass === 'A' && i === 8) ||
                (networkClass === 'B' && i === 16) ||
                (networkClass === 'C' && i === 24)) {
                continue;
            }

            masks.push({ value: mask, cidr: i });
        }

        // If "Any" is selected, show all possible subnet masks
        if (networkClass === 'Any') {
            masks.length = 0; // Clear the array
            for (let i = 1; i <= 32; i++) {
                let binary = '1'.repeat(i) + '0'.repeat(32 - i);
                let mask = '';
                for (let j = 0; j < 32; j += 8) {
                    mask += parseInt(binary.substr(j, 8), 2) + (j < 24 ? '.' : '');
                }
                masks.push({ value: mask, cidr: i });
            }
        }

        return masks;
    };

    return (
        <Card className="max-w-xl mx-auto shadow-lg py-0 border-sky-200">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold text-center py-4">IPv4 Subnet Calculator</CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-2 sm:px-6 sm:p-6">
                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 rounded">
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-rose-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="form-card">
                        <label className="block text-sky-800 mb-3 font-semibold text-lg">Network Class</label>
                        <div className="grid grid-cols-4 gap-2">
                            {['Any', 'A', 'B', 'C'].map((cls) => (
                                <label key={cls} className={`flex items-center justify-center p-3 rounded-md cursor-pointer transition-all ${networkClass === cls ? 'bg-sky-100 border-2 border-sky-500 shadow-sm' : 'bg-white border border-sky-200 hover:bg-sky-50'}`}>
                                    <input
                                        type="radio"
                                        value={cls}
                                        checked={networkClass === cls}
                                        onChange={(e) => setNetworkClass(e.target.value)}
                                        className="hidden"
                                    />
                                    <span className={`font-medium ${networkClass === cls ? 'text-sky-700' : 'text-gray-700'}`}>{cls}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-2 text-sm text-sky-700">
                            {networkClass === 'A' && "Class A: 1.0.0.0 - 126.255.255.255 (Default mask: 255.0.0.0)"}
                            {networkClass === 'B' && "Class B: 128.0.0.0 - 191.255.255.255 (Default mask: 255.255.0.0)"}
                            {networkClass === 'C' && "Class C: 192.0.0.0 - 223.255.255.255 (Default mask: 255.255.255.0)"}
                            {networkClass === 'Any' && "Any class: All possible subnet masks"}
                        </div>
                    </div>

                    <div className="form-card">
                        <label className="block text-sky-800 mb-3 font-semibold text-lg">Subnet Mask</label>
                        <Select value={mask} onValueChange={setMask}>
                            <SelectTrigger className="border-sky-200 bg-white focus:border-sky-500 focus:ring-sky-500/20">
                                <SelectValue placeholder="Select a subnet mask" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-sky-200">
                                {getMaskOptions().map((option) => (
                                    <SelectItem key={option.cidr} value={option.value} className="hover:bg-sky-50 focus:bg-sky-50">
                                        {option.value} /{option.cidr}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="form-card">
                        <label className="block text-sky-800 mb-3 font-semibold text-lg">IP Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                                </svg>
                            </div>
                            <Input
                                type="text"
                                placeholder="Enter IP Address (e.g., 192.168.1.1)"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                className="pl-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500/20"
                            />
                        </div>
                        {networkClass !== 'Any' && (
                            <div className="mt-2 text-sm text-sky-700">
                                Enter an IP address in the range for Class {networkClass}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <Button onClick={handleCalculate} className="bg-sky-600 font-semibold hover:bg-sky-700 text-white shadow-md">
                        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        Calculate
                    </Button>
                    <Button variant="outline" onClick={() => {
                        setIp('192.168.1.1');
                        setMask('255.255.255.0');
                        setNetworkClass('Any');
                        setResult(null);
                        setError('');
                    }} className="border-sky-300 text-sky-700 hover:bg-sky-50">
                        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Clear
                    </Button>
                </div>

                <div className="mt-8 text-center text-sky-600 text-sm">
                    Enter an IP address and subnet mask to calculate network information
                </div>
            </CardContent>
        </Card>
    );
};

export default IPv4Calculator;