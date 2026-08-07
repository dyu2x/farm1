import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Smartphone
} from 'lucide-react';
import { FarmSettings } from '../types';

interface LocationMapProps {
  settings: FarmSettings;
}

export const LocationMap: React.FC<LocationMapProps> = ({ settings }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const [locError, setLocError] = useState<string | null>(null);

  // Haversine distance calculation in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleGetLocation = () => {
    setLocating(true);
    setLocError(null);

    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });

        const dist = calculateDistance(
          uLat,
          uLng,
          settings.coordinates.lat,
          settings.coordinates.lng
        );
        setDistanceKm(dist);
        setLocating(false);
      },
      (error) => {
        setLocError('Location permission denied or unavailable. Please enable GPS.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Google Maps / Waze / Apple Maps URLs
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${settings.coordinates.lat},${settings.coordinates.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${settings.coordinates.lat},${settings.coordinates.lng}&navigate=yes`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${settings.coordinates.lat},${settings.coordinates.lng}&q=Mesina+Farms+Catfish+Hatchery`;

  // Google Maps Embedded Iframe Source
  const googleEmbedStandardUrl = `https://maps.google.com/maps?q=${settings.coordinates.lat},${settings.coordinates.lng}&hl=en&z=15&output=embed`;

  return (
    <section id="location" className="py-12 lg:py-20 bg-[#F7F9F7] dark:bg-[#121E12] border-t border-[#D1D9D1] dark:border-[#2D422D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0E7E0] dark:bg-[#1E341E] text-[#2A4E2A] dark:text-[#A8CDA8] text-xs font-bold uppercase tracking-wider border border-[#D1D9D1] dark:border-[#2D422D]">
            <MapPin className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
            Farm Location & Directions
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A2E1A] dark:text-[#E2EFE2] tracking-tight">
            Mesina Farms <span className="text-[#3D6E3D] dark:text-[#A8CDA8]">Capiz Hatchery</span>
          </h1>
          <p className="text-sm sm:text-base text-[#637863] dark:text-[#8FA38F]">
            Located in Ivisan, Capiz, Philippines. Easily navigate using Google Maps, Apple Maps, or Waze for order pickup.
          </p>
        </div>

        {/* Map & Direction Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Embedded Google Maps */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1A281A] rounded-3xl p-4 sm:p-6 border border-[#D1D9D1] dark:border-[#2D422D] shadow-xl overflow-hidden space-y-4">
            
            {/* Embedded Map Header Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D1D9D1] dark:border-[#2D422D]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">
                <MapPin className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                <span>Google Map Embedded Location</span>
              </div>

              <span className="text-[11px] font-semibold text-[#637863] dark:text-[#8FA38F]">
                GPS: {settings.coordinates.lat.toFixed(4)}°N, {settings.coordinates.lng.toFixed(4)}°E
              </span>
            </div>

            {/* Map Frame Container */}
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-[#EDF1ED] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D]">
              <iframe
                title="Mesina Farms Google Map"
                src={googleEmbedStandardUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Location Discovery Action Bar */}
            <div className="p-4 bg-[#F7F9F7] dark:bg-[#121E12] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#D1D9D1] dark:border-[#2D422D]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8]">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1A2E1A] dark:text-[#E2EFE2]">
                    Route Distance & Driving Time
                  </div>
                  <div className="text-xs text-[#637863] dark:text-[#8FA38F]">
                    {distanceKm !== null
                      ? `Distance from your location: ~${distanceKm.toFixed(1)} km (~${Math.round(distanceKm * 1.5)} mins drive)`
                      : 'Grant location permission to calculate drive time'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGetLocation}
                disabled={locating}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 flex-shrink-0"
              >
                {locating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" />
                    <span>{distanceKm !== null ? 'Recalculate Distance' : 'Find My Distance'}</span>
                  </>
                )}
              </button>
            </div>

            {locError && (
              <div className="text-xs text-amber-600 dark:text-amber-400 px-3 font-medium">
                {locError}
              </div>
            )}
          </div>

          {/* Right Column: Address, Navigation Apps & Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white dark:bg-[#1A281A] rounded-3xl p-6 border border-[#D1D9D1] dark:border-[#2D422D] shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D1D9D1] dark:border-[#2D422D]">
                <div className="p-2.5 rounded-2xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif font-extrabold text-xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                    Hatchery Address
                  </h2>
                  <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                    Mesina Farms Capiz
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#2A3B2A] dark:text-[#C5D8C5] font-medium leading-relaxed bg-[#F7F9F7] dark:bg-[#121E12] p-4 rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D]">
                {settings.farmAddress}
              </p>

              <div className="space-y-2.5 text-xs text-[#637863] dark:text-[#8FA38F]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8] flex-shrink-0" />
                  <span>Operating Hours: <strong className="text-[#1A2E1A] dark:text-[#E2EFE2]">{settings.operatingHours}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8] flex-shrink-0" />
                  <span>Call Hotline: <a href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`} className="hover:underline font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">{settings.supportPhone}</a></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8] flex-shrink-0" />
                  <span>Email: <a href={`mailto:${settings.primaryEmail}`} className="hover:underline font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">{settings.primaryEmail}</a></span>
                </div>
              </div>

              {/* Navigation Apps Launcher Section */}
              <div className="pt-4 border-t border-[#D1D9D1] dark:border-[#2D422D] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A2E1A] dark:text-[#E2EFE2] flex items-center gap-1.5 uppercase tracking-wider">
                    <Smartphone className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                    Open in Navigation App
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* Google Maps Button */}
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs flex items-center justify-between transition-all shadow-md active:scale-95 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs">Google Maps</div>
                        <div className="text-[10px] font-normal opacity-80">Turn-by-turn driving directions</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Apple Maps Button */}
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-[#1E2E1E] dark:bg-[#121E12] hover:bg-[#2A3F2A] text-white font-bold text-xs flex items-center justify-between border border-[#3D6E3D]/40 transition-all shadow-md active:scale-95 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-sky-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs">Apple Maps</div>
                        <div className="text-[10px] font-normal text-slate-300">iOS & Apple CarPlay Navigation</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Waze Button */}
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-[#EDF1ED] dark:bg-[#121E12] hover:bg-[#E0E7E0] text-[#1A2E1A] dark:text-[#E2EFE2] font-bold text-xs flex items-center justify-between border border-[#D1D9D1] dark:border-[#2D422D] transition-all active:scale-95 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#3D6E3D]/20 flex items-center justify-center text-[#3D6E3D] dark:text-[#A8CDA8]">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs">Waze Navigation</div>
                        <div className="text-[10px] font-normal text-[#637863] dark:text-[#8FA38F]">Live traffic & road alerts</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#3D6E3D] dark:text-[#A8CDA8]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Pickup Advice Banner */}
            <div className="bg-[#E0E7E0] dark:bg-[#1E341E] rounded-3xl p-6 border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] space-y-2.5">
              <div className="font-bold text-sm text-[#1A2E1A] dark:text-[#E2EFE2] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                Pickup & Oxygen Transit Advice
              </div>
              <p className="leading-relaxed text-[#2A3B2A] dark:text-[#C5D8C5]">
                For customer pickups in open vehicles (pickups/tricycles), we strongly recommend collecting fingerlings early between <strong>6:00 AM – 9:00 AM</strong> to prevent oxygenated plastic bags from overheating under direct midday sunlight during transit.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
