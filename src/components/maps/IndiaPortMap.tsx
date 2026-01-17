import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L, { DivIcon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Port {
  name: string;
  lat: number;
  lng: number;
  volume: number;
  growth: number;
}

interface IndiaPortMapProps {
  ports: Port[];
  selectedPort?: string;
  onPortSelect?: (portName: string) => void;
}

// Create custom port marker icons
const createPortIcon = (isSelected: boolean, growth: number, volume: number, zoom: number) => {
  const color = growth > 0 ? '#10b981' : growth < 0 ? '#ef4444' : '#f59e0b';
  // Scale with zoom
  const zoomScale = Math.pow(1.3, zoom - 5);
  const baseSize = (18 + (volume / 50)) * zoomScale;
  const size = isSelected ? baseSize + 6 : baseSize;
  const pulseAnimation = isSelected ? 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;' : '';
  
  return L.divIcon({
    className: 'custom-port-marker',
    html: `
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .port-marker-inner:hover {
          transform: translate(-50%, -50%) scale(1.2);
          box-shadow: 0 0 30px rgba(0,0,0,0.7), 0 0 50px ${color};
        }
      </style>
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
      ">
        <!-- Outer glow ring -->
        <div style="
          position: absolute;
          width: ${size + 12}px;
          height: ${size + 12}px;
          background: ${color};
          border-radius: 50%;
          opacity: 0.3;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          ${pulseAnimation}
        "></div>
        <!-- Main marker -->
        <div class="port-marker-inner" style="
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(0,0,0,0.5), 0 0 30px ${color}80;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: all 0.3s ease;
        "></div>
      </div>
    `,
    iconSize: [size + 12, size + 12],
    iconAnchor: [(size + 12) / 2, (size + 12) / 2],
  });
};

// Create port label with leader line
const createPortLabel = (portName: string, isSelected: boolean, direction: 'left' | 'right', zoom: number) => {
  const fontSize = 11 + (zoom - 5) * 1.5;
  // Estimate text width based on character count
  const estimatedWidth = portName.length * (fontSize * 0.6);
  
  return L.divIcon({
    className: 'port-label',
    html: `
      <div style="
        font-size: ${fontSize}px;
        font-weight: 700;
        white-space: nowrap;
        color: #1e293b;
        pointer-events: none;
        text-shadow: 
          -1px -1px 0 #fff,
          1px -1px 0 #fff,
          -1px 1px 0 #fff,
          1px 1px 0 #fff,
          0 0 8px rgba(255,255,255,0.9);
        text-align: ${direction === 'left' ? 'right' : 'left'};
      ">
        ${portName}
      </div>
    `,
    iconSize: [estimatedWidth, 20],
    iconAnchor: direction === 'left' ? [estimatedWidth, 10] : [0, 10],
  });
};

// Label offset positions for each port to avoid overlap
const labelOffsets: Record<string, { lat: number; lng: number; direction: 'left' | 'right' }> = {
  "JNPT": { lat: 0, lng: 0, direction: 'right' },
  "Mundra": { lat: 0, lng: 0, direction: 'left' },
  "Kandla": { lat: 0, lng: 0, direction: 'right' },
  "Chennai": { lat: 0, lng: 0, direction: 'right' },
  "Visakhapatnam": { lat: 0, lng: 0, direction: 'right' },
  "Paradip": { lat: 0, lng: 0, direction: 'right' },
  "Mangalore": { lat: 0, lng: 0, direction: 'left' },
  "Kochi": { lat: 0, lng: 0, direction: 'left' }
};

export default function IndiaPortMap({ ports, selectedPort, onPortSelect }: IndiaPortMapProps) {
  // Calculate bounds from all port coordinates
  const bounds = new LatLngBounds(
    ports.map(port => [port.lat, port.lng] as [number, number])
  );
  const [zoom, setZoom] = useState(5);

  // Component to track zoom changes and handle popup auto-dismiss
  function ZoomTracker() {
    const map = useMap();
    
    useEffect(() => {
      const onZoom = () => {
        setZoom(map.getZoom());
      };
      
      map.on('zoomend', onZoom);
      return () => {
        map.off('zoomend', onZoom);
      };
    }, [map]);

    // Auto-dismiss popup after timeout
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      
      const onPopupOpen = () => {
        timeoutId = setTimeout(() => {
          map.closePopup();
        }, 3000); // 3 seconds
      };
      
      const onPopupClose = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
      
      map.on('popupopen', onPopupOpen);
      map.on('popupclose', onPopupClose);
      
      return () => {
        map.off('popupopen', onPopupOpen);
        map.off('popupclose', onPopupClose);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [map]);
    
    return null;
  }

  // Calculate arrow length based on zoom
  const getArrowLength = (zoom: number) => {
    // Base length at zoom 5, scales inversely with zoom
    return 1.5 / Math.pow(1.5, zoom - 5);
  };

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [50, 50] }}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      zoomControl={true}
      scrollWheelZoom={false}
    >
      <ZoomTracker />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {ports.map((port) => {
        const isSelected = selectedPort === port.name;
        const offset = labelOffsets[port.name] || { lat: 0, lng: 0, direction: 'right' };
        
        // Horizontal arrow from port to label
        const arrowLength = getArrowLength(zoom);
        const labelPosition: [number, number] = [
          port.lat,
          port.lng + (offset.direction === 'right' ? arrowLength : -arrowLength)
        ];
        
        return (
          <div key={port.name}>
            {/* Horizontal arrow line */}
            <Polyline
              positions={[
                [port.lat, port.lng],
                labelPosition
              ]}
              pathOptions={{
                color: '#334155',
                weight: 2,
                opacity: 0.8
              }}
            />
            
            {/* Port marker */}
            <Marker
              position={[port.lat, port.lng]}
              icon={createPortIcon(isSelected, port.growth, port.volume, zoom)}
              eventHandlers={{
                click: () => onPortSelect?.(port.name),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                <div className="text-xs">
                  <div className="font-semibold">{port.name}</div>
                  <div className="text-muted-foreground">
                    Volume: {port.volume}K TEU
                  </div>
                  <div className={port.growth > 0 ? 'text-green-600' : port.growth < 0 ? 'text-red-600' : 'text-orange-600'}>
                    Growth: {port.growth > 0 ? '+' : ''}{port.growth}%
                  </div>
                </div>
              </Tooltip>
              <Popup autoClose={true} closeOnClick={false}>
                <div className="text-sm">
                  <div className="font-semibold text-base mb-1">{port.name}</div>
                  <div className="space-y-1">
                    <div>Volume: <strong>{port.volume}K TEU</strong></div>
                    <div>
                      Growth: <strong className={port.growth > 0 ? 'text-green-600' : port.growth < 0 ? 'text-red-600' : 'text-orange-600'}>
                        {port.growth > 0 ? '+' : ''}{port.growth}%
                      </strong>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Port label */}
            <Marker
              position={labelPosition}
              icon={createPortLabel(port.name, isSelected, offset.direction, zoom)}
              interactive={false}
            />
          </div>
        );
      })}
    </MapContainer>
  );
}
