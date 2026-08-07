import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  BookOpen,
  ShoppingBag,
  CheckCircle2,
  Phone,
  Clock,
  ChevronRight,
  Droplets,
  Layers
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { ImageGallerySlideshow } from './ImageGallerySlideshow';
import { FingerlingProduct, FarmSettings, BlogArticle } from '../types';

interface HomePageProps {
  products: FingerlingProduct[];
  settings: FarmSettings;
  blogArticles: BlogArticle[];
  onNavigate: (page: string) => void;
  onAddToInquiry: (product: FingerlingProduct, quantity: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  settings,
  blogArticles,
  onNavigate,
  onAddToInquiry,
}) => {
  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <HeroSection
        products={products}
        settings={settings}
        onNavigate={onNavigate}
        onSelectProductForInquiry={onAddToInquiry}
      />

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1A281A] p-6 rounded-3xl border border-[#D1D9D1] dark:border-[#2D422D] shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A2E1A] dark:text-[#E2EFE2]">
              Bio-Secure Hatchery
            </h3>
            <p className="text-xs text-[#637863] dark:text-[#8FA38F] leading-relaxed">
              Strict water conditioning, pathogen monitoring, and broodstock selection ensuring 98%+ viability upon arrival at your farm.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A281A] p-6 rounded-3xl border border-[#D1D9D1] dark:border-[#2D422D] shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8] flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A2E1A] dark:text-[#E2EFE2]">
              Pure Oxygenated Transit
            </h3>
            <p className="text-xs text-[#637863] dark:text-[#8FA38F] leading-relaxed">
              Double-bagged pure oxygen packing engineered for up to 12 hours safe transit time for pickups and deliveries across Luzon.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A281A] p-6 rounded-3xl border border-[#D1D9D1] dark:border-[#2D422D] shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8] flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A2E1A] dark:text-[#E2EFE2]">
              Uniform Size Grading
            </h3>
            <p className="text-xs text-[#637863] dark:text-[#8FA38F] leading-relaxed">
              Precision mechanical size grading prevents cannibalism in early growth stages and promotes synchronized harvest cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Farm Image Gallery Slideshow */}
      <ImageGallerySlideshow />

      {/* Catalog Preview Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-[#D1D9D1] dark:border-[#2D422D]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0E7E0] dark:bg-[#1E341E] text-[#2A4E2A] dark:text-[#A8CDA8] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
              Catfish Fingerlings
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A2E1A] dark:text-[#E2EFE2]">
              Available Growth Sizes
            </h2>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="px-5 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Featured Products Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-[#1A281A] rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#121E12]/90 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-full border border-[#2D422D]">
                    {p.sizeInInches}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-serif font-bold text-base text-[#1A2E1A] dark:text-[#E2EFE2]">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#637863] dark:text-[#8FA38F] line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-[#D1D9D1] dark:border-[#2D422D] mt-3">
                <div>
                  <span className="text-[10px] text-[#637863] uppercase font-bold block">Starting at</span>
                  <span className="font-mono font-bold text-sm text-[#3D6E3D] dark:text-[#A8CDA8]">
                    ₱{p.basePrice.toFixed(2)}/pc
                  </span>
                </div>

                <button
                  onClick={() => onAddToInquiry(p, 1000)}
                  className="px-3.5 py-2 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] hover:bg-[#3D6E3D] hover:text-white text-[#2A3B2A] dark:text-[#C5D8C5] text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fish Care Guides Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#121E12] via-[#1A2C1A] to-[#121E12] rounded-3xl p-8 sm:p-12 text-white border border-[#2D422D] shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2D422D] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D6E3D]/30 border border-[#3D6E3D]/50 text-[#A8CDA8] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Aquaculture Knowledge Center
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Expert Fish Care & Feeding Guides
              </h2>
            </div>

            <button
              onClick={() => onNavigate('guides')}
              className="px-6 py-3 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <span>Explore All Guides & Calculators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogArticles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate('guides')}
                className="bg-[#1C2C1C] rounded-2xl p-5 border border-[#2D422D] hover:border-[#3D6E3D] transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#A8CDA8] uppercase tracking-wider bg-[#121E12] px-2.5 py-0.5 rounded-full border border-[#2D422D] inline-block">
                    {article.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-[#A8CDA8] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#C5D8C5] line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#A8CDA8] pt-2 border-t border-[#2D422D]">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-[#1A281A] rounded-3xl p-8 sm:p-10 border border-[#D1D9D1] dark:border-[#2D422D] shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3D6E3D] dark:text-[#A8CDA8] bg-[#E0E7E0] dark:bg-[#1E341E] px-3 py-1 rounded-full border border-[#D1D9D1] dark:border-[#2D422D]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Pampanga Hatchery Facility</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A2E1A] dark:text-[#E2EFE2]">
              Visit Farm in Santa Rita, Pampanga
            </h2>
            <p className="text-xs sm:text-sm text-[#637863] dark:text-[#8FA38F] max-w-xl">
              Open Monday to Saturday for order pickups, water parameter consultations, and commercial grower inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('location')}
              className="px-6 py-3.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <MapPin className="w-4 h-4" />
              <span>Interactive Map & Directions</span>
            </button>
            <button
              onClick={() => onNavigate('inquiry')}
              className="px-6 py-3.5 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] hover:bg-[#E0E7E0] dark:hover:bg-[#233623] text-[#2A3B2A] dark:text-[#C5D8C5] border border-[#D1D9D1] dark:border-[#2D422D] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Submit Order Inquiry</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
