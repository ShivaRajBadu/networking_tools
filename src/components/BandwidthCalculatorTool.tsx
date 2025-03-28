'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BandwidthCalculatorTool() {
    const [fileSize, setFileSize] = useState('');
    const [fileSizeUnit, setFileSizeUnit] = useState('MB');
    const [bandwidth, setBandwidth] = useState('');
    const [bandwidthUnit, setBandwidthUnit] = useState('Mbps');
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState('');

    const calculateTransferTime = () => {
        try {
            setError('');

            if (!fileSize || !bandwidth) {
                throw new Error('Please enter both file size and bandwidth');
            }

            const fileSizeValue = parseFloat(fileSize);
            const bandwidthValue = parseFloat(bandwidth);

            if (isNaN(fileSizeValue) || isNaN(bandwidthValue)) {
                throw new Error('Please enter valid numbers');
            }

            if (fileSizeValue <= 0 || bandwidthValue <= 0) {
                throw new Error('Values must be greater than zero');
            }

            // Convert file size to bits
            let fileSizeBits = fileSizeValue;
            switch (fileSizeUnit) {
                case 'B': fileSizeBits *= 8; break;
                case 'KB': fileSizeBits *= 8 * 1024; break;
                case 'MB': fileSizeBits *= 8 * 1024 * 1024; break;
                case 'GB': fileSizeBits *= 8 * 1024 * 1024 * 1024; break;
                case 'TB': fileSizeBits *= 8 * 1024 * 1024 * 1024 * 1024; break;
            }

            // Convert bandwidth to bits per second
            let bandwidthBps = bandwidthValue;
            switch (bandwidthUnit) {
                case 'bps': break;
                case 'Kbps': bandwidthBps *= 1000; break;
                case 'Mbps': bandwidthBps *= 1000000; break;
                case 'Gbps': bandwidthBps *= 1000000000; break;
                case 'Tbps': bandwidthBps *= 1000000000000; break;
            }

            // Calculate time in seconds
            const timeInSeconds = fileSizeBits / bandwidthBps;

            // Format the result
            if (timeInSeconds < 60) {
                setResult(`${timeInSeconds.toFixed(2)} seconds`);
            } else if (timeInSeconds < 3600) {
                const minutes = Math.floor(timeInSeconds / 60);
                const seconds = timeInSeconds % 60;
                setResult(`${minutes} minutes, ${seconds.toFixed(2)} seconds`);
            } else if (timeInSeconds < 86400) {
                const hours = Math.floor(timeInSeconds / 3600);
                const minutes = Math.floor((timeInSeconds % 3600) / 60);
                const seconds = timeInSeconds % 60;
                setResult(`${hours} hours, ${minutes} minutes, ${seconds.toFixed(2)} seconds`);
            } else {
                const days = Math.floor(timeInSeconds / 86400);
                const hours = Math.floor((timeInSeconds % 86400) / 3600);
                const minutes = Math.floor((timeInSeconds % 3600) / 60);
                setResult(`${days} days, ${hours} hours, ${minutes} minutes`);
            }
        } catch (err: any) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <Card className="overflow-hidden shadow-md py-0 border-sky-200 mb-6">
                <CardHeader className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold">Bandwidth Calculator Tool</CardTitle>
                    <p className="text-sky-100 text-sm sm:text-base">Calculate file transfer time based on file size and bandwidth</p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="mb-4">
                        <label htmlFor="fileSize" className="block text-sm font-medium text-gray-700 mb-1">
                            File Size:
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <input
                                type="number"
                                id="fileSize"
                                value={fileSize}
                                onChange={(e) => setFileSize(e.target.value)}
                                placeholder="Enter file size"
                                className="w-full sm:flex-1 p-2 text-sm sm:text-base border rounded sm:rounded-r-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <select
                                value={fileSizeUnit}
                                onChange={(e) => setFileSizeUnit(e.target.value)}
                                className="w-full sm:w-auto p-2 text-sm sm:text-base border rounded sm:rounded-l-none bg-gray-50"
                            >
                                <option value="B">Bytes (B)</option>
                                <option value="KB">Kilobytes (KB)</option>
                                <option value="MB">Megabytes (MB)</option>
                                <option value="GB">Gigabytes (GB)</option>
                                <option value="TB">Terabytes (TB)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bandwidth" className="block text-sm font-medium text-gray-700 mb-1">
                            Bandwidth:
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                            <input
                                type="number"
                                id="bandwidth"
                                value={bandwidth}
                                onChange={(e) => setBandwidth(e.target.value)}
                                placeholder="Enter bandwidth"
                                className="w-full sm:flex-1 p-2 text-sm sm:text-base border rounded sm:rounded-r-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <select
                                value={bandwidthUnit}
                                onChange={(e) => setBandwidthUnit(e.target.value)}
                                className="w-full sm:w-auto p-2 text-sm sm:text-base border rounded sm:rounded-l-none bg-gray-50"
                            >
                                <option value="bps">bits per second (bps)</option>
                                <option value="Kbps">Kilobits per second (Kbps)</option>
                                <option value="Mbps">Megabits per second (Mbps)</option>
                                <option value="Gbps">Gigabits per second (Gbps)</option>
                                <option value="Tbps">Terabits per second (Tbps)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={calculateTransferTime}
                        className="w-full bg-sky-600 text-white px-4 py-2 text-sm sm:text-base rounded hover:bg-sky-700 transition"
                    >
                        Calculate Transfer Time
                    </button>

                    {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                </CardContent>
            </Card>

            {result && (
                <Card className="overflow-hidden shadow-xl border-sky-200">
                    <div className="bg-gradient-to-r from-sky-700 to-sky-500 text-white p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold">Transfer Time Result</h2>
                        <p className="opacity-90 text-sm sm:text-base">
                            File: {fileSize} {fileSizeUnit} at {bandwidth} {bandwidthUnit}
                        </p>
                    </div>

                    <CardContent className="p-4 sm:p-6">
                        <div className="border rounded p-3 sm:p-4 bg-blue-50">
                            <h3 className="text-base sm:text-lg font-semibold text-sky-800 mb-2">
                                Estimated Transfer Time:
                            </h3>
                            <p className="text-lg sm:text-xl font-semibold text-sky-700">{result}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6">
                            <div className="form-card">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">File Size Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Size in Bytes:</span>
                                        <span className="font-mono">
                                            {(() => {
                                                let bytes = parseFloat(fileSize);
                                                switch (fileSizeUnit) {
                                                    case 'B': return bytes;
                                                    case 'KB': return bytes * 1024;
                                                    case 'MB': return bytes * 1024 * 1024;
                                                    case 'GB': return bytes * 1024 * 1024 * 1024;
                                                    case 'TB': return bytes * 1024 * 1024 * 1024 * 1024;
                                                    default: return 0;
                                                }
                                            })().toLocaleString()} B
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Size in Bits:</span>
                                        <span className="font-mono">
                                            {(() => {
                                                let bits = parseFloat(fileSize) * 8;
                                                switch (fileSizeUnit) {
                                                    case 'B': return bits;
                                                    case 'KB': return bits * 1024;
                                                    case 'MB': return bits * 1024 * 1024;
                                                    case 'GB': return bits * 1024 * 1024 * 1024;
                                                    case 'TB': return bits * 1024 * 1024 * 1024 * 1024;
                                                    default: return 0;
                                                }
                                            })().toLocaleString()} b
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-card">
                                <h3 className="text-lg font-semibold text-sky-800 mb-3">Bandwidth Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Bandwidth in bps:</span>
                                        <span className="font-mono">
                                            {(() => {
                                                let bps = parseFloat(bandwidth);
                                                switch (bandwidthUnit) {
                                                    case 'bps': return bps;
                                                    case 'Kbps': return bps * 1000;
                                                    case 'Mbps': return bps * 1000000;
                                                    case 'Gbps': return bps * 1000000000;
                                                    case 'Tbps': return bps * 1000000000000;
                                                    default: return 0;
                                                }
                                            })().toLocaleString()} bps
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sky-700">Bandwidth in Bytes/s:</span>
                                        <span className="font-mono">
                                            {(() => {
                                                let bps = parseFloat(bandwidth);
                                                switch (bandwidthUnit) {
                                                    case 'bps': return bps / 8;
                                                    case 'Kbps': return (bps * 1000) / 8;
                                                    case 'Mbps': return (bps * 1000000) / 8;
                                                    case 'Gbps': return (bps * 1000000000) / 8;
                                                    case 'Tbps': return (bps * 1000000000000) / 8;
                                                    default: return 0;
                                                }
                                            })().toLocaleString()} B/s
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 