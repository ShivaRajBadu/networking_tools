import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const macAddress = searchParams.get('mac');

    if (!macAddress) {
        return NextResponse.json({ error: 'MAC address is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://www.macvendorlookup.com/api/v2/${macAddress}`);
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch vendor information' }, { status: response.status });
        }

        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
            return NextResponse.json({ error: 'No vendor information found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
} 