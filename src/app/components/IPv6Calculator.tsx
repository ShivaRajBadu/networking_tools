'use client';
import React, { useState } from 'react';
import { calculateIPv6Subnet } from '../utils/subnetting';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IPv6Calculator = () => {
    const router = useRouter();
    const [ip, setIp] = useState('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    const [prefixLength, setPrefixLength] = useState('64');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const validateIPv6 = (ip: string) => {
        // Basic IPv6 validation
        const pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$/;
        return pattern.test(ip);
    };

    const handleCalculate = () => {
        setError('');

        if (!validateIPv6(ip)) {
            setError('Please enter a valid IPv6 address');
            return;
        }

        const subnetResult = calculateIPv6Subnet(ip, parseInt(prefixLength, 10));
        setResult(subnetResult);

        // Navigate to result page with query parameters
        router.push(`/result?cip=${ip}&cprefix=${prefixLength}&ctype=ipv6`);
    };

    return (
        <Card className="max-w-xl mx-auto shadow-lg py-0 border-sky-200">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold text-center py-4">IPv6 Subnet Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
                        <label className="block text-sky-800 mb-3 font-semibold text-lg">Prefix Length</label>
                        <Select value={prefixLength} onValueChange={setPrefixLength}>
                            <SelectTrigger className="border-sky-200 bg-white focus:border-sky-500 focus:ring-sky-500/20">
                                <SelectValue placeholder="Select prefix length" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-sky-200">
                                {Array.from({ length: 128 }, (_, i) => i + 1).map((value) => (
                                    <SelectItem key={value} value={value.toString()} className="hover:bg-sky-50 focus:bg-sky-50">
                                        /{value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="mt-2 text-sm text-sky-700">
                            Common prefix lengths: /48 (site), /64 (subnet), /128 (interface)
                        </div>
                    </div>

                    <div className="form-card">
                        <label className="block text-sky-800 mb-3 font-semibold text-lg">IPv6 Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                                </svg>
                            </div>
                            <Input
                                type="text"
                                placeholder="Enter IPv6 Address (e.g., 2001:0db8:85a3::8a2e:0370:7334)"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                className="pl-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500/20"
                            />
                        </div>
                        <div className="mt-2 text-sm text-sky-700">
                            Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334 or 2001:db8:85a3::8a2e:370:7334
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <Button onClick={handleCalculate} className="bg-sky-600 hover:bg-sky-700 text-white shadow-md">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        Calculate
                    </Button>
                    <Button variant="outline" onClick={() => {
                        setIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
                        setPrefixLength('64');
                        setResult(null);
                        setError('');
                    }} className="border-sky-300 text-sky-700 hover:bg-sky-50">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Clear
                    </Button>
                </div>

                <div className="mt-8 text-center text-sky-600 text-sm">
                    Enter an IPv6 address and prefix length to calculate network information
                </div>
            </CardContent>
        </Card>
    );
};

export default IPv6Calculator; 