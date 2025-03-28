'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BinaryCalculatorTool() {
    const [decimal, setDecimal] = useState('');
    const [binary, setBinary] = useState('');
    const [hex, setHex] = useState('');
    const [octal, setOctal] = useState('');
    const [error, setError] = useState('');

    const convertFromDecimal = (value: string) => {
        try {
            setError('');
            if (!value.trim()) {
                setBinary('');
                setHex('');
                setOctal('');
                return;
            }

            const num = parseInt(value, 10);
            if (isNaN(num)) {
                throw new Error('Please enter a valid decimal number');
            }

            setBinary(num.toString(2));
            setHex(num.toString(16).toUpperCase());
            setOctal(num.toString(8));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const convertFromBinary = (value: string) => {
        try {
            setError('');
            if (!value.trim()) {
                setDecimal('');
                setHex('');
                setOctal('');
                return;
            }

            // Validate binary input
            if (!/^[01]+$/.test(value)) {
                throw new Error('Binary can only contain 0s and 1s');
            }

            const num = parseInt(value, 2);
            setDecimal(num.toString());
            setHex(num.toString(16).toUpperCase());
            setOctal(num.toString(8));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const convertFromHex = (value: string) => {
        try {
            setError('');
            if (!value.trim()) {
                setDecimal('');
                setBinary('');
                setOctal('');
                return;
            }

            // Validate hex input
            if (!/^[0-9A-Fa-f]+$/.test(value)) {
                throw new Error('Hexadecimal can only contain 0-9 and A-F');
            }

            const num = parseInt(value, 16);
            setDecimal(num.toString());
            setBinary(num.toString(2));
            setOctal(num.toString(8));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const convertFromOctal = (value: string) => {
        try {
            setError('');
            if (!value.trim()) {
                setDecimal('');
                setBinary('');
                setHex('');
                return;
            }

            // Validate octal input
            if (!/^[0-7]+$/.test(value)) {
                throw new Error('Octal can only contain digits 0-7');
            }

            const num = parseInt(value, 8);
            setDecimal(num.toString());
            setBinary(num.toString(2));
            setHex(num.toString(16).toUpperCase());
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Card className="overflow-hidden shadow-md py-0 border-sky-200 mb-6">
                <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold">Binary Calculator Tool</CardTitle>
                    <p className="text-sky-100 text-sm sm:text-base">Convert between decimal, binary, hexadecimal, and octal</p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div>
                            <label htmlFor="decimal" className="block text-sm font-medium text-gray-700 mb-1">
                                Decimal:
                            </label>
                            <input
                                type="text"
                                id="decimal"
                                value={decimal}
                                onChange={(e) => {
                                    setDecimal(e.target.value);
                                    convertFromDecimal(e.target.value);
                                }}
                                placeholder="Enter decimal number"
                                className="w-full p-2 text-sm sm:text-base border rounded focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="binary" className="block text-sm font-medium text-gray-700 mb-1">
                                Binary:
                            </label>
                            <input
                                type="text"
                                id="binary"
                                value={binary}
                                onChange={(e) => {
                                    setBinary(e.target.value);
                                    convertFromBinary(e.target.value);
                                }}
                                placeholder="Enter binary number"
                                className="w-full p-2 text-sm sm:text-base border rounded focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="hex" className="block text-sm font-medium text-gray-700 mb-1">
                                Hexadecimal:
                            </label>
                            <input
                                type="text"
                                id="hex"
                                value={hex}
                                onChange={(e) => {
                                    setHex(e.target.value);
                                    convertFromHex(e.target.value);
                                }}
                                placeholder="Enter hexadecimal number"
                                className="w-full p-2 text-sm sm:text-base border rounded focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="octal" className="block text-sm font-medium text-gray-700 mb-1">
                                Octal:
                            </label>
                            <input
                                type="text"
                                id="octal"
                                value={octal}
                                onChange={(e) => {
                                    setOctal(e.target.value);
                                    convertFromOctal(e.target.value);
                                }}
                                placeholder="Enter octal number"
                                className="w-full p-2 text-sm sm:text-base border rounded focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 p-3 sm:p-4 bg-blue-50 rounded border border-blue-100">
                        <h3 className="text-base sm:text-lg font-medium mb-2 text-sky-700">How to use:</h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                            Enter a value in any of the fields above, and the calculator will automatically convert it to the other number systems.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 