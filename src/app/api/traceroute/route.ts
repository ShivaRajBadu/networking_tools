import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const response = await fetch(`${API_URL}/api/traceroute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.error }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Traceroute error:', error);
        return NextResponse.json({ error: 'Failed to perform traceroute' }, { status: 500 });
    }
}
