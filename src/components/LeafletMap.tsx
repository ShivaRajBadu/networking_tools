'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Need to fix Leaflet icons
const fixLeafletIcons = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
};

interface LeafletMapProps {
    hops: Array<{
        ip: string;
        hostname: string;
        lat: number;
        lng: number;
        rtt: number;
        city?: string;
        country?: string;
        dataSource?: 'real' | 'simulated' | 'preset';
    }>;
    activeHop: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ hops, activeHop }) => {
    const mapRef = useRef(null);
    const leafletMapRef = useRef<L.Map | null>(null);
    const markersLayerRef = useRef<L.LayerGroup | null>(null);
    const pathLayerRef = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        // Initialize the map
        if (mapRef.current && !leafletMapRef.current) {
            fixLeafletIcons();

            // Adjust initial zoom level based on screen size
            const isMobile = window.innerWidth < 768;

            leafletMapRef.current = L.map(mapRef.current, {
                center: [20, 0], // Default center
                zoom: isMobile ? 1 : 2, // Smaller zoom for mobile
                layers: [
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                ],
                zoomControl: !isMobile // Hide zoom controls on mobile
            });

            // Add zoom controls to top-right on desktop
            if (!isMobile) {
                L.control.zoom({
                    position: 'topright'
                }).addTo(leafletMapRef.current);
            }

            markersLayerRef.current = L.layerGroup().addTo(leafletMapRef.current);
            pathLayerRef.current = L.layerGroup().addTo(leafletMapRef.current);
        }

        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
            }
        };
    }, []);

    // Update map when hops or activeHop changes
    useEffect(() => {
        if (!leafletMapRef.current || !markersLayerRef.current || !pathLayerRef.current) return;

        // Clear existing markers and paths
        markersLayerRef.current.clearLayers();
        pathLayerRef.current.clearLayers();

        // Extra validation - make sure hops is an array
        if (!Array.isArray(hops) || hops.length === 0) {
            return;
        }

        // Filter valid hops with coordinates and make sure they have all required properties
        const validHops = hops.filter(hop =>
            hop && typeof hop.lat === 'number' && typeof hop.lng === 'number' &&
            !isNaN(hop.lat) && !isNaN(hop.lng) && // Additional validation
            Math.abs(hop.lat) <= 90 && Math.abs(hop.lng) <= 180 // Make sure coordinates are in valid range
        );

        if (validHops.length < 1) return;

        // Create bounds to fit all points
        const bounds = L.latLngBounds(validHops.map(hop => [hop.lat, hop.lng]));

        // Create markers for each hop
        validHops.forEach((hop, index) => {
            const hopIndex = hops.indexOf(hop);
            let markerOptions: L.MarkerOptions = {};
            let iconOptions: L.DivIconOptions = {
                className: `hop-marker hop-${index}`,
                html: `<div class="marker-content"></div>`,
                iconSize: [14, 14]
            };

            // Style based on hop status
            if (index === 0) {
                iconOptions.html = `<div class="marker-content source"></div>`;
            } else if (index === validHops.length - 1) {
                iconOptions.html = `<div class="marker-content destination"></div>`;
            } else if (hopIndex === activeHop) {
                iconOptions.html = `<div class="marker-content active"></div>`;
            } else if (hopIndex < activeHop) {
                iconOptions.html = `<div class="marker-content completed"></div>`;
            } else {
                iconOptions.html = `<div class="marker-content pending"></div>`;
            }

            // Add data source indicator to marker style
            if (hop.dataSource === 'real') {
                iconOptions.html = `<div class="marker-content ${iconOptions.html.includes('source') ? 'source' :
                    iconOptions.html.includes('destination') ? 'destination' :
                        iconOptions.html.includes('active') ? 'active' :
                            iconOptions.html.includes('completed') ? 'completed' :
                                'pending'} real-data"></div>`;
            } else if (hop.dataSource === 'preset') {
                iconOptions.html = `<div class="marker-content ${iconOptions.html.includes('source') ? 'source' :
                    iconOptions.html.includes('destination') ? 'destination' :
                        iconOptions.html.includes('active') ? 'active' :
                            iconOptions.html.includes('completed') ? 'completed' :
                                'pending'} preset-data"></div>`;
            }

            const icon = L.divIcon(iconOptions);
            markerOptions.icon = icon;

            const marker = L.marker([hop.lat, hop.lng], markerOptions)
                .addTo(markersLayerRef.current!);

            // Add popup with hop information
            const popupContent = `
        <div class="font-bold text-sm">${hop.hostname || 'Unknown Host'} (Hop #${hopIndex + 1})</div>
        <div class="font-mono text-xs">${hop.ip || 'Unknown IP'}</div>
        <div class="text-xs">RTT: ${hop.rtt !== undefined ? hop.rtt + ' ms' : 'Unknown'}</div>
        ${hop.city ? `<div class="text-xs">Location: ${hop.city}, ${hop.country || ''}</div>` : ''}
        <div class="text-xs mt-1">
            <span class="px-1.5 py-0.5 rounded text-xs ${hop.dataSource === 'real' ? 'bg-green-100 text-green-800' :
                    hop.dataSource === 'preset' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                }">
                ${hop.dataSource === 'real' ? 'Real Data' :
                    hop.dataSource === 'preset' ? 'Preset Data' :
                        'Simulated'}
            </span>
        </div>
      `;

            marker.bindPopup(popupContent);
        });

        // Draw paths between hops
        for (let i = 1; i < validHops.length; i++) {
            const prevHop = validHops[i - 1];
            const currentHop = validHops[i];
            const hopIndex = hops.indexOf(currentHop);

            const pathOptions: L.PolylineOptions = {
                weight: hopIndex <= activeHop ? 3 : 2,
                color: hopIndex <= activeHop ? '#6366f1' : '#d1d5db',
                opacity: hopIndex <= activeHop ? 0.8 : 0.5,
                dashArray: hopIndex <= activeHop ? undefined : '4, 4'
            };

            const path = L.polyline([
                [prevHop.lat, prevHop.lng],
                [currentHop.lat, currentHop.lng]
            ], pathOptions).addTo(pathLayerRef.current!);

            // Add animated marker for active path
            if (hopIndex === activeHop && hopIndex > 0) {
                const prevLatLng = L.latLng(prevHop.lat, prevHop.lng);
                const currentLatLng = L.latLng(currentHop.lat, currentHop.lng);

                // Create a marker that moves along the path
                const animatedMarker = L.circleMarker(prevLatLng, {
                    radius: 5,
                    color: '#8b5cf6',
                    fillColor: '#8b5cf6',
                    fillOpacity: 1
                }).addTo(pathLayerRef.current!);

                // Animation frames
                let start: number | null = null;
                const duration = 1500; // 1.5 seconds

                const animateMarker = (timestamp: number) => {
                    if (!start) start = timestamp;
                    const progress = (timestamp - start) / duration;

                    if (progress < 1) {
                        const newLat = prevHop.lat + (currentHop.lat - prevHop.lat) * progress;
                        const newLng = prevHop.lng + (currentHop.lng - prevHop.lng) * progress;
                        animatedMarker.setLatLng([newLat, newLng]);
                        requestAnimationFrame(animateMarker);
                    } else {
                        animatedMarker.setLatLng([currentHop.lat, currentHop.lng]);
                    }
                };

                requestAnimationFrame(animateMarker);
            }
        }

        // Fit map to bounds with padding
        leafletMapRef.current.fitBounds(bounds, {
            padding: window.innerWidth < 768 ? [20, 20] : [50, 50],
            maxZoom: window.innerWidth < 768 ? 4 : 8 // Limit zoom level on mobile
        });

        // Add custom CSS for styling markers
        if (!document.getElementById('leaflet-marker-styles')) {
            const style = document.createElement('style');
            style.id = 'leaflet-marker-styles';
            style.textContent = `
        .marker-content {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
        }
        .source {
          background-color: #3b82f6;
          border-width: 3px;
        }
        .destination {
          background-color: #ef4444;
          border-width: 3px;
        }
        .active {
          background-color: #8b5cf6;
          box-shadow: 0 0 0 6px rgba(139, 92, 246, 0.3);
          animation: pulse-map 1.5s infinite;
        }
        .completed {
          background-color: #6366f1;
        }
        .pending {
          background-color: #d1d5db;
        }
        @keyframes pulse-map {
          0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(139, 92, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }
        .real-data {
            position: relative;
        }
        
        .real-data::after {
            content: '';
            position: absolute;
            top: -3px;
            right: -3px;
            width: 8px;
            height: 8px;
            background-color: #10b981;
            border-radius: 50%;
            border: 1px solid white;
        }
        
        .preset-data::after {
            content: '';
            position: absolute;
            top: -3px;
            right: -3px;
            width: 8px;
            height: 8px;
            background-color: #3b82f6;
            border-radius: 50%;
            border: 1px solid white;
        }
        
        @media (max-width: 768px) {
            .hop-marker {
                width: 12px !important;
                height: 12px !important;
                margin-left: -6px !important;
                margin-top: -6px !important;
            }
            
            .real-data::after, .preset-data::after {
                width: 6px;
                height: 6px;
                top: -2px;
                right: -2px;
            }
        }
      `;
            document.head.appendChild(style);
        }
    }, [hops, activeHop]);

    return (
        <div ref={mapRef} className="w-full h-full" />
    );
};

export default LeafletMap; 