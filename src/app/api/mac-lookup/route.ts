import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const mac = searchParams.get('mac');

        if (!mac) {
            return NextResponse.json({ error: 'MAC address is required' }, { status: 400 });
        }

        const response = await fetch(`${API_URL}/api/mac-lookup?mac=${mac}`);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.error }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('MAC lookup error:', error);
        return NextResponse.json({ error: 'Failed to lookup MAC address' }, { status: 500 });
    }
} 