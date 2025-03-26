'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the interface for hop data
interface HopProps {
    ip: string;
    hostname: string;
    lat: number | null;
    lng: number | null;
    rtt: number | null;
    city?: string;
    country?: string;
    dataSource?: 'real' | 'simulated' | 'preset';
    asn?: string;
    isp?: string;
}

interface LeafletMapProps {
    hops: HopProps[];
    activeHop: number;
}

export default function LeafletMap({ hops, activeHop }: LeafletMapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const linesRef = useRef<L.Polyline[]>([]);

    // Fix Leaflet icon issues
    useEffect(() => {
        // This needs to run before any Leaflet code
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
    }, []);

    // Initialize map
    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Clean up previous map instance if it exists
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        // Create new map instance
        const map = L.map(mapContainerRef.current, {
            center: [20, 0],
            zoom: 2,
            attributionControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapRef.current = map;

        // Clean up on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update markers and lines when hops or activeHop changes
    useEffect(() => {
        if (!mapRef.current) return;

        // Clear existing markers and lines
        markersRef.current.forEach(marker => marker.remove());
        linesRef.current.forEach(line => line.remove());
        markersRef.current = [];
        linesRef.current = [];

        // Filter out hops with null coordinates
        const validHops = hops.filter(hop =>
            hop !== undefined &&
            hop.lat !== null &&
            hop.lng !== null
        );

        if (validHops.length === 0) return;

        // Create markers and lines for valid hops
        const points: L.LatLng[] = [];
        const validMarkers: L.Marker[] = [];

        validHops.forEach((hop, index) => {
            if (hop.lat === null || hop.lng === null) return;

            const latLng = L.latLng(hop.lat, hop.lng);
            points.push(latLng);

            // Determine marker color based on data source
            let markerColor = '#3388ff'; // Default blue
            if (hop.dataSource === 'real') {
                markerColor = '#22c55e'; // Green
            } else if (hop.dataSource === 'preset') {
                markerColor = '#3b82f6'; // Blue
            } else if (hop.dataSource === 'simulated') {
                markerColor = '#eab308'; // Yellow
            }

            // Create custom icon
            const icon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            // Create active icon (larger)
            const activeIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${markerColor}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.6);"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            // Create marker
            const marker = L.marker(latLng, {
                icon: index === activeHop ? activeIcon : icon,
                zIndexOffset: index === activeHop ? 1000 : 0
            }).addTo(mapRef.current!);

            // Add popup with hop information
            const popupContent = `
        <div style="font-family: sans-serif; font-size: 12px;">
          <div style="font-weight: bold; margin-bottom: 4px;">Hop ${index + 1}</div>
          <div>IP: ${hop.ip}</div>
          <div>Hostname: ${hop.hostname}</div>
          ${hop.rtt !== null ? `<div>RTT: ${hop.rtt} ms</div>` : ''}
          ${hop.city ? `<div>Location: ${hop.city}, ${hop.country}</div>` : hop.country ? `<div>Country: ${hop.country}</div>` : ''}
          ${hop.asn ? `<div>ASN: ${hop.asn}</div>` : ''}
          ${hop.isp ? `<div>ISP: ${hop.isp}</div>` : ''}
        </div>
      `;

            marker.bindPopup(popupContent);
            markersRef.current.push(marker);
            validMarkers.push(marker);
        });

        // Create lines connecting the points
        if (points.length > 1) {
            const line = L.polyline(points, {
                color: '#6366f1',
                weight: 2,
                opacity: 0.7,
                dashArray: '5, 5',
            }).addTo(mapRef.current!);
            linesRef.current.push(line);
        }

        // Fit map to bounds if we have points
        if (points.length > 0) {
            const bounds = L.latLngBounds(points);
            mapRef.current!.fitBounds(bounds, { padding: [30, 30] });
        }

        // Open popup for active hop
        const activeMarkerIndex = validMarkers.findIndex((_, i) => i === activeHop);
        if (activeMarkerIndex >= 0 && activeMarkerIndex < validMarkers.length) {
            validMarkers[activeMarkerIndex].openPopup();
        }

        // Force a map redraw
        mapRef.current.invalidateSize();

    }, [hops, activeHop]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
} 