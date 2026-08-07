import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Sun, Moon, Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { FarmSettings } from '../types';

interface NavbarProps {
  settings: FarmSettings;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onOpenSearch,
  isDarkMode,
  onToggleDarkMode,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'catalog', label: 'Fingerling Catalog' },
    { id: 'guides', label: 'Fish Care & Guides' },
    { id: 'location', label: 'Farm Location & Maps' },
    { id: 'inquiry', label: 'Order Inquiry' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-[#1A2E1A] text-[#E2EFE2] text-xs py-1.5 px-4 sm:px-6 border-b border-[#2D422D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#A8CDA8]">
              <span className="w-2 h-2 rounded-full bg-[#548C54] animate-pulse"></span>
              Clarias Batrachus Hatchery Open for Booking
            </span>
            <span className="hidden md:inline-block text-[#4E684E]">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#C5D8C5]">
              <MapPin className="w-3.5 h-3.5 text-[#A8CDA8]" />
              Ivisan, Capiz, Philippines
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-[#A8CDA8] transition-colors font-medium text-[#E2EFE2]"
            >
              <Phone className="w-3.5 h-3.5 text-[#A8CDA8]" />
              {settings.supportPhone}
            </a>
            <span className="text-[#4E684E]">|</span>
            <a
              href={`mailto:${settings.primaryEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-[#A8CDA8] transition-colors font-medium text-[#E2EFE2]"
            >
              <Mail className="w-3.5 h-3.5 text-[#A8CDA8]" />
              {settings.primaryEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#1A281A]/95 backdrop-blur-md shadow-sm border-[#D1D9D1] dark:border-[#2D422D] py-2.5'
            : 'bg-white dark:bg-[#1A281A] border-[#D1D9D1] dark:border-[#2D422D] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo - Blends smoothly with background */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[#3D6E3D] rounded-lg p-1"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#EDF1ED] dark:bg-[#121E12] p-1.5 rounded-full border border-[#D1D9D1] dark:border-[#2D422D]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#3D6E3D] text-white shadow-md shadow-[#3D6E3D]/20'
                      : 'text-[#2A3B2A] dark:text-[#C5D8C5] hover:text-[#3D6E3D] dark:hover:text-[#A8CDA8] hover:bg-white/80 dark:hover:bg-[#233623]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Dark Mode, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#E0E7E0] dark:hover:bg-[#233623] border border-[#D1D9D1] dark:border-[#2D422D] transition-colors text-xs font-medium"
              title="Search website"
            >
              <Search className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
              <span className="hidden sm:inline-block">Search</span>
            </button>

            {/* Order Inquiry Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-semibold text-xs shadow-md shadow-[#3D6E3D]/20 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Inquiry List</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-extrabold bg-[#E0E7E0] text-[#1A2E1A] rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] border border-[#D1D9D1] dark:border-[#2D422D]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1A281A] border-b border-[#D1D9D1] dark:border-[#2D422D] px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                activeSection === item.id
                  ? 'bg-[#3D6E3D] text-white'
                  : 'text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#EDF1ED] dark:hover:bg-[#121E12]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
