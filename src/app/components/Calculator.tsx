'use client'
import React from 'react';
import IPv4Calculator from './IPv4Calculator';
import IPv6Calculator from './IPv6Calculator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Calculator = () => {
    return (
        <div className="">
            <Tabs defaultValue="ipv4" className="w-full">
                <div className="flex justify-center mb-6">
                    <TabsList className="custom-tabs-list">
                        <TabsTrigger value="ipv4" className="custom-tab-trigger cursor-pointer flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            IPv4
                        </TabsTrigger>
                        <TabsTrigger value="ipv6" className="custom-tab-trigger cursor-pointer flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                            IPv6
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="ipv4">
                    <IPv4Calculator />
                </TabsContent>
                <TabsContent value="ipv6">
                    <IPv6Calculator />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Calculator; 