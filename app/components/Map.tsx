import { useEffect, useRef } from 'react';

interface MapProps {
  hubs: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    type: 'center' | 'drop-off' | 'specialized';
  }>;
  selectedHub: { id: string; lat: number; lng: number } | null;
  onHubSelect: (hubId: string) => void;
  center?: { lat: number; lng: number };
}

declare global {
  interface Window {
    L: any;
  }
}

export function Map({ hubs, selectedHub, onHubSelect, center = { lat: 19.0760, lng: 72.8777 } }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = window.L.map(mapRef.current).setView([center.lat, center.lng], 10);
    mapInstanceRef.current = map;

    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for hubs
    const markers: any[] = [];
    hubs.forEach(hub => {
      const markerColor = getMarkerColor(hub.type);
      const marker = window.L.marker([hub.lat, hub.lng], {
        icon: window.L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="w-6 h-6 rounded-full ${markerColor} border-2 border-white shadow-lg flex items-center justify-center">
                   <div class="w-2 h-2 bg-white rounded-full"></div>
                 </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(map);

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${hub.name}</h3>
          <p class="text-xs text-gray-600">${hub.type}</p>
        </div>
      `);

      marker.on('click', () => {
        onHubSelect(hub.id);
      });

      markers.push(marker);
    });

    markersRef.current = markers;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hubs, center, onHubSelect]);

  // Update selected hub
  useEffect(() => {
    if (selectedHub && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedHub.lat, selectedHub.lng], 14);
      
      // Highlight selected marker
      markersRef.current.forEach((marker, index) => {
        const hub = hubs[index];
        const isSelected = hub.id === selectedHub.id;
        const markerColor = getMarkerColor(hub.type, isSelected);
        
        marker.setIcon(window.L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="w-${isSelected ? '8' : '6'} h-${isSelected ? '8' : '6'} rounded-full ${markerColor} border-2 border-white shadow-lg flex items-center justify-center">
                   <div class="w-${isSelected ? '3' : '2'} h-${isSelected ? '3' : '2'} bg-white rounded-full"></div>
                 </div>`,
          iconSize: isSelected ? [32, 32] : [24, 24],
          iconAnchor: isSelected ? [16, 16] : [12, 12]
        }));
      });
    }
  }, [selectedHub, hubs]);

  const getMarkerColor = (type: string, isSelected = false) => {
    const baseColors = {
      'center': 'bg-green-500',
      'specialized': 'bg-purple-500',
      'drop-off': 'bg-blue-500'
    };
    
    const selectedColors = {
      'center': 'bg-green-600',
      'specialized': 'bg-purple-600',
      'drop-off': 'bg-blue-600'
    };
    
    return isSelected ? selectedColors[type as keyof typeof selectedColors] : baseColors[type as keyof typeof baseColors];
  };

  return (
    <div 
      ref={mapRef} 
      className="h-64 lg:h-96 w-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
}
