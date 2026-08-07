import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, MapPin, Calculator, CheckCircle2, Fish } from 'lucide-react';
import { FingerlingProduct, FarmSettings } from '../types';

interface HeroSectionProps {
  products: FingerlingProduct[];
  settings: FarmSettings;
  onNavigate: (section: string) => void;
  onSelectProductForInquiry: (product: FingerlingProduct, quantity: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  products,
  settings,
  onNavigate,
  onSelectProductForInquiry,
}) => {
  const [calcProductId, setCalcProductId] = useState<string>(products[0]?.id || '');
  const [calcQuantity, setCalcQuantity] = useState<number>(2000);

  const selectedProduct = products.find((p) => p.id === calcProductId) || products[0];

  const calculatePrice = () => {
    if (!selectedProduct) return { pricePerPc: 0, total: 0 };
    let rate = selectedProduct.basePrice;
    if (selectedProduct.priceTiers && selectedProduct.priceTiers.length > 0) {
      for (const tier of selectedProduct.priceTiers) {
        if (calcQuantity >= tier.minQty && (tier.maxQty === null || calcQuantity <= tier.maxQty)) {
          rate = tier.pricePerPc;
          break;
        }
      }
    }
    return {
      pricePerPc: rate,
      total: rate * calcQuantity,
      bagsNeeded: Math.ceil(calcQuantity / settings.oxygenPackingCapacityPerBag),
    };
  };

  const calcResult = calculatePrice();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#121E12] via-[#1A2C1A] to-[#121E12] text-white">
      {/* Decorative background glow & water pattern */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3D6E3D]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2E572E]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Branding */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D6E3D]/20 border border-[#3D6E3D]/40 text-[#A8CDA8] text-xs font-semibold backdrop-blur-md">
              <MapPin className="w-4 h-4 text-[#A8CDA8]" />
              <span>Santa Rita, Pampanga, Philippines</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8CDA8]"></span>
              <span className="text-[#C5D8C5] font-normal">Clarias Batrachus Hatchery</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Premier <span className="text-[#A8CDA8]">Clarias Batrachus</span> Fingerlings & Hatchery
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#C5D8C5] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Mesina Farms produces high-viability, disease-resistant Asian Walking Catfish (<em className="text-[#A8CDA8] font-serif">Clarias batrachus</em> / native hito) fingerlings. Grown with strict bio-security in Santa Rita, Pampanga for commercial growers across Central Luzon and nationwide.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#C5D8C5] pt-2">
              <div className="flex items-center gap-1.5 bg-[#1C2C1C] px-3.5 py-2 rounded-xl border border-[#2D422D]">
                <CheckCircle2 className="w-4 h-4 text-[#A8CDA8]" />
                <span>98%+ Survival Rate</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1C2C1C] px-3.5 py-2 rounded-xl border border-[#2D422D]">
                <ShieldCheck className="w-4 h-4 text-[#A8CDA8]" />
                <span>Pure Oxygenated Transport</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1C2C1C] px-3.5 py-2 rounded-xl border border-[#2D422D]">
                <Truck className="w-4 h-4 text-[#A8CDA8]" />
                <span>Farm Pickup & Delivery</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-sm shadow-xl shadow-[#3D6E3D]/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>View Product Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('location')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1C2C1C] hover:bg-[#253A25] text-white font-semibold text-sm border border-[#2D422D] transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#A8CDA8]" />
                <span>Store Location & Directions</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Quick Price & Quantity Estimator Widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#1A281A]/95 rounded-3xl p-6 border border-[#2D422D] shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3D6E3D]/10 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 border-b border-[#2D422D]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#A8CDA8]" />
                  <h3 className="font-bold text-lg text-white">Instant Order Estimator</h3>
                </div>
                <span className="text-[11px] font-semibold text-[#A8CDA8] bg-[#121E12] px-2.5 py-1 rounded-full border border-[#2D422D]">
                  Bulk Wholesale Rates
                </span>
              </div>

              {/* Selector */}
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8FA38F] uppercase tracking-wider mb-1.5">
                    Select Fingerling Size
                  </label>
                  <select
                    value={calcProductId}
                    onChange={(e) => setCalcProductId(e.target.value)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white outline-none focus:border-[#3D6E3D]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.sizeInInches}) — ₱{p.basePrice.toFixed(2)}/pc
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Input slider + number */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                    <span className="text-[#8FA38F] uppercase tracking-wider">Quantity (pcs)</span>
                    <span className="text-[#A8CDA8] font-bold">{calcQuantity.toLocaleString()} pcs</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value))}
                    className="w-full accent-[#3D6E3D] bg-[#121E12] rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[11px] text-[#8FA38F] mt-1">
                    <span>500 pcs</span>
                    <span>5,000 pcs</span>
                    <span>20,000+ pcs</span>
                  </div>
                </div>

                {/* Price Breakdown Calculation Card */}
                <div className="bg-[#121E12] rounded-xl p-4 border border-[#2D422D] space-y-2">
                  <div className="flex justify-between items-center text-xs text-[#8FA38F]">
                    <span>Tiered Unit Price:</span>
                    <span className="font-bold text-[#A8CDA8]">₱{calcResult.pricePerPc.toFixed(2)} / pc</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#8FA38F]">
                    <span>Oxygenated Bags Est.:</span>
                    <span className="font-semibold text-[#C5D8C5]">{calcResult.bagsNeeded} bags (~{settings.oxygenPackingCapacityPerBag} pcs/bag)</span>
                  </div>
                  <div className="pt-2 border-t border-[#2D422D] flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#C5D8C5]">Estimated Total:</span>
                    <span className="text-2xl font-black text-[#A8CDA8]">₱{calcResult.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Add to Inquiry button */}
                <button
                  onClick={() => {
                    onSelectProductForInquiry(selectedProduct, calcQuantity);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#3D6E3D]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Fish className="w-4 h-4" />
                  Add {calcQuantity.toLocaleString()} pcs to Inquiry List
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Real-time Inventory Ticker Bar */}
      <div className="mt-12 border-y border-[#2D422D] bg-[#0E170E] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-around gap-6 text-xs text-[#C5D8C5]">
          <div className="flex items-center gap-2 font-semibold text-[#A8CDA8]">
            <Sparkles className="w-4 h-4" />
            <span>LIVE HATCHERY STOCK MONITOR:</span>
          </div>
          {products.map((p) => {
            const isLow = p.stockCount <= settings.lowStockThreshold;
            return (
              <div key={p.id} className="flex items-center gap-2">
                <span className="font-medium text-[#C5D8C5]">{p.name} ({p.sizeInInches}):</span>
                <span
                  className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                    isLow
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-[#3D6E3D]/30 text-[#A8CDA8] border border-[#3D6E3D]/50'
                  }`}
                >
                  {p.stockCount.toLocaleString()} pcs {isLow ? '⚠️ LOW STOCK' : 'IN STOCK'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
