import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.macvendors.com';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const mac = searchParams.get('mac');

        if (!mac) {
            return NextResponse.json({ error: 'MAC address is required' }, { status: 400 });
        }

        const response = await fetch(`${API_BASE_URL}/${mac}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json({ error: 'Vendor not found for this MAC address' }, { status: 404 });
            }
            throw new Error('Failed to fetch vendor information');
        }

        const vendorName = await response.text();
        
        // Format the response to match our interface
        const data = {
            vendorName,
            macAddress: mac,
            isPrivate: mac.toLowerCase().startsWith('02:'),
            type: mac.toLowerCase().charAt(1) === '2' ? 'Locally Administered' : 'Globally Unique',
            cast: parseInt(mac.charAt(1), 16) % 2 === 0 ? 'Unicast' : 'Multicast'
        };

        return NextResponse.json(data);

    } catch (error) {
        console.error('MAC lookup error:', error);
        return NextResponse.json({ error: 'Failed to lookup MAC address' }, { status: 500 });
    }
} 