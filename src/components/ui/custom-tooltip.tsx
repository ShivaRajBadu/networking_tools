'use client';

import React from 'react';
import {
    Tooltip as ShadcnTooltip,
    TooltipContent as ShadcnTooltipContent,
    TooltipProvider as ShadcnTooltipProvider,
    TooltipTrigger as ShadcnTooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

export function CustomTooltip({ children, content }: CustomTooltipProps) {
    return (
        <ShadcnTooltipProvider>
            <ShadcnTooltip>
                <ShadcnTooltipTrigger asChild className="cursor-help">
                    <span>{children}</span>
                </ShadcnTooltipTrigger>
                <ShadcnTooltipContent
                    className="bg-white text-gray-800 p-2 rounded shadow-md border border-gray-200 z-50"
                    sideOffset={5}
                >
                    {content}
                </ShadcnTooltipContent>
            </ShadcnTooltip>
        </ShadcnTooltipProvider>
    );
} 