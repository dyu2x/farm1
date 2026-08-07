import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { FarmSettings } from '../types';

interface FooterProps {
  settings: FarmSettings;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  return (
    <footer className="bg-[#121E12] text-[#C5D8C5] pt-16 pb-12 border-t border-[#2D422D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-xs text-[#8FA38F] leading-relaxed pt-2">
              Mesina Farms is Pampanga’s premier hatchery and grower specializing in high-viability <em className="text-[#A8CDA8] font-serif">Clarias batrachus</em> (Asian Walking Catfish / Native Hito) fingerlings.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A8CDA8] bg-[#1E341E] p-2.5 rounded-xl border border-[#2D422D]">
              <ShieldCheck className="w-4 h-4 text-[#A8CDA8] flex-shrink-0" />
              <span>Bio-Secure Hatchery Operations</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E2EFE2] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#8FA38F]">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#A8CDA8] transition-colors">
                  Fingerling Product Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guides')} className="hover:text-[#A8CDA8] transition-colors">
                  Catfish Care Guides & Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-[#A8CDA8] transition-colors">
                  Farm Store Location & Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inquiry')} className="hover:text-[#A8CDA8] transition-colors">
                  Order Inquiry Form
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Fingerling Sizes */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E2EFE2] uppercase tracking-wider">
              Catfish Sizes
            </h4>
            <ul className="space-y-2 text-xs text-[#8FA38F]">
              <li className="flex justify-between">
                <span>Starter Fingerlings</span>
                <span className="font-mono text-[#A8CDA8]">1.0 - 1.5 in</span>
              </li>
              <li className="flex justify-between">
                <span>Standard Grow-out</span>
                <span className="font-mono text-[#A8CDA8]">2.0 - 2.5 in</span>
              </li>
              <li className="flex justify-between">
                <span>Advance Stocker</span>
                <span className="font-mono text-[#A8CDA8]">3.0 - 3.5 in</span>
              </li>
              <li className="flex justify-between">
                <span>Jumbo Stocker</span>
                <span className="font-mono text-[#A8CDA8]">4.0 - 5.0 in</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#E2EFE2] uppercase tracking-wider">
              Contact & Location
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8FA38F]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8CDA8] flex-shrink-0 mt-0.5" />
                <span>{settings.farmAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A8CDA8] flex-shrink-0" />
                <a href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`} className="hover:text-white font-bold text-[#E2EFE2]">
                  {settings.supportPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A8CDA8] flex-shrink-0" />
                <a href={`mailto:${settings.primaryEmail}`} className="hover:text-white font-bold text-[#E2EFE2]">
                  {settings.primaryEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A8CDA8] flex-shrink-0" />
                <span>{settings.operatingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar — No Direct Admin Link in Footer */}
        <div className="pt-8 border-t border-[#2D422D] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8FA38F] gap-4">
          <div>
            © {new Date().getFullYear()} Mesina Farms. All rights reserved. Santa Rita, Pampanga, Philippines.
          </div>
          <div className="flex items-center gap-1">
            <span>Quality • Sustainability • Excellence</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
