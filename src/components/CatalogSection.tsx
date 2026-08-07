import React, { useState } from 'react';
import {
  ShoppingBag,
  Info,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Clock,
  TrendingUp,
  Filter,
  Search,
  Package,
  Layers
} from 'lucide-react';
import { FingerlingProduct, FarmSettings } from '../types';

interface CatalogSectionProps {
  products: FingerlingProduct[];
  settings: FarmSettings;
  onAddToInquiry: (product: FingerlingProduct, quantity: number) => void;
  onNavigateToInquiry?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  settings,
  onAddToInquiry,
  onNavigateToInquiry,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<FingerlingProduct | null>(null);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    products.forEach((p) => {
      initial[p.id] = 1000;
    });
    return initial;
  });

  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleQuantityChange = (productId: string, val: number) => {
    const clamped = Math.max(100, Math.min(50000, val));
    setQuantities((prev) => ({ ...prev, [productId]: clamped }));
  };

  const calculateTierPrice = (product: FingerlingProduct, qty: number) => {
    let rate = product.basePrice;
    if (product.priceTiers && product.priceTiers.length > 0) {
      for (const tier of product.priceTiers) {
        if (qty >= tier.minQty && (tier.maxQty === null || qty <= tier.maxQty)) {
          rate = tier.pricePerPc;
          break;
        }
      }
    }
    return rate;
  };

  const handleAdd = (product: FingerlingProduct) => {
    const qty = quantities[product.id] || 1000;
    onAddToInquiry(product, qty);
    setAddedNotice(`${product.name} (${qty.toLocaleString()} pcs) added to Inquiry List!`);
    setTimeout(() => setAddedNotice(null), 3500);
  };

  // Filter products by stage & search query
  const filteredProducts = products.filter((p) => {
    const matchesStage =
      selectedStage === 'all' ||
      p.id.toLowerCase().includes(selectedStage.toLowerCase()) ||
      p.name.toLowerCase().includes(selectedStage.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sizeInInches.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStage && matchesSearch;
  });

  return (
    <section id="catalog" className="py-12 lg:py-20 bg-[#F7F9F7] dark:bg-[#121E12] transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0E7E0] dark:bg-[#1E341E] text-[#2A4E2A] dark:text-[#A8CDA8] text-xs font-bold uppercase tracking-wider border border-[#D1D9D1] dark:border-[#2D422D]">
            <Sparkles className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
            Hatchery Product Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A2E1A] dark:text-[#E2EFE2] tracking-tight">
            High-Viability <span className="text-[#3D6E3D] dark:text-[#A8CDA8]">Clarias Batrachus</span> Fingerlings
          </h1>
          <p className="text-sm sm:text-base text-[#637863] dark:text-[#8FA38F]">
            Graded for uniform size distribution and acclimated for high survival in earthen ponds, concrete tanks, and tarpaulin aquaculture systems across the Philippines.
          </p>
        </div>

        {/* Added Toast Notification */}
        {addedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#3D6E3D] text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
            <Check className="w-5 h-5 bg-white text-[#3D6E3D] rounded-full p-0.5" />
            <span>{addedNotice}</span>
          </div>
        )}

        {/* Filter Controls & Search Bar */}
        <div className="bg-white dark:bg-[#1A281A] p-4 rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Stage Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-[#637863] dark:text-[#8FA38F] mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Stage:
            </span>
            {[
              { id: 'all', label: 'All Sizes' },
              { id: 'starter', label: 'Starter (1.0-1.5")' },
              { id: 'standard', label: 'Standard (2.0-2.5")' },
              { id: 'advance', label: 'Advance (3.0-3.5")' },
              { id: 'jumbo', label: 'Jumbo (4.0-5.0")' },
            ].map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedStage === stage.id
                    ? 'bg-[#3D6E3D] text-white shadow-md'
                    : 'bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#E0E7E0] dark:hover:bg-[#233623]'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>

          {/* Catalog Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#637863] dark:text-[#8FA38F]" />
            <input
              type="text"
              placeholder="Search fingerlings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#F7F9F7] dark:bg-[#121E12] border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] focus:outline-none focus:border-[#3D6E3D]"
            />
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const qty = quantities[product.id] || 1000;
            const unitPrice = calculateTierPrice(product, qty);
            const totalPrice = unitPrice * qty;
            const isLowStock = product.stockCount <= settings.lowStockThreshold;

            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-[#1A281A] rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] hover:border-[#3D6E3D] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Product Image & Badge Header */}
                <div className="relative h-52 overflow-hidden bg-[#EDF1ED] dark:bg-[#121E12]">
                  <img
                    src={product.image}
                    alt={`${product.name} - Clarias batrachus`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121E12]/80 via-transparent to-transparent"></div>

                  {/* Size Pill */}
                  <div className="absolute top-3 left-3 bg-[#121E12]/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full border border-[#2D422D] shadow-md">
                    {product.sizeInInches} ({product.sizeInCm})
                  </div>

                  {/* Stock Status Pill */}
                  <div className="absolute top-3 right-3">
                    {isLowStock ? (
                      <span className="bg-amber-500/90 backdrop-blur-md text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Low Stock ({product.stockCount.toLocaleString()})
                      </span>
                    ) : (
                      <span className="bg-[#3D6E3D]/90 backdrop-blur-md text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        In Stock ({product.stockCount.toLocaleString()})
                      </span>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif font-extrabold text-lg text-white group-hover:text-[#A8CDA8] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#C5D8C5] line-clamp-1">
                      {product.bestFor}
                    </p>
                  </div>
                </div>

                {/* Card Content & Pricing Tiers */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Tiered Price Table */}
                  <div className="bg-[#EDF1ED] dark:bg-[#121E12] p-3 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D] space-y-1.5">
                    <div className="text-[11px] font-semibold text-[#637863] dark:text-[#8FA38F] uppercase tracking-wider flex justify-between">
                      <span>Quantity Range</span>
                      <span>Rate / Pc</span>
                    </div>
                    {product.priceTiers && product.priceTiers.length > 0 ? (
                      product.priceTiers.map((tier, idx) => {
                        const isCurrentTier =
                          qty >= tier.minQty && (tier.maxQty === null || qty <= tier.maxQty);
                        return (
                          <div
                            key={idx}
                            className={`flex justify-between items-center text-xs px-2 py-1 rounded-md transition-colors ${
                              isCurrentTier
                                ? 'bg-[#E0E7E0] dark:bg-[#1E341E] text-[#1A2E1A] dark:text-[#E2EFE2] font-bold border border-[#3D6E3D]/40'
                                : 'text-[#2A3B2A] dark:text-[#C5D8C5]'
                            }`}
                          >
                            <span>
                              {tier.minQty.toLocaleString()}
                              {tier.maxQty ? ` - ${tier.maxQty.toLocaleString()}` : '+'} pcs
                            </span>
                            <span>₱{tier.pricePerPc.toFixed(2)}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex justify-between text-xs font-bold text-[#3D6E3D] dark:text-[#A8CDA8]">
                        <span>Standard Rate</span>
                        <span>₱{product.basePrice.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#637863] dark:text-[#8FA38F] uppercase tracking-wider mb-1.5">
                      Order Quantity
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, qty - 500)}
                        className="p-2 rounded-lg bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#E0E7E0] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="100"
                        max="50000"
                        step="100"
                        value={qty}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 100)}
                        className="w-full text-center font-bold text-sm bg-[#EDF1ED] dark:bg-[#121E12] text-[#1A2E1A] dark:text-[#E2EFE2] py-1.5 rounded-lg border border-[#D1D9D1] dark:border-[#2D422D] outline-none focus:border-[#3D6E3D]"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, qty + 500)}
                        className="p-2 rounded-lg bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#E0E7E0] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total Estimate Bar */}
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#D1D9D1] dark:border-[#2D422D]">
                    <div>
                      <span className="text-[11px] text-[#637863] dark:text-[#8FA38F] block">Unit: ₱{unitPrice.toFixed(2)}</span>
                      <span className="text-xs font-bold text-[#2A3B2A] dark:text-[#C5D8C5]">Total Estimate</span>
                    </div>
                    <span className="text-xl font-black text-[#3D6E3D] dark:text-[#A8CDA8]">
                      ₱{totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="col-span-1 p-2.5 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#E0E7E0] transition-colors flex items-center justify-center border border-[#D1D9D1] dark:border-[#2D422D]"
                      title="View Spec details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAdd(product)}
                      className="col-span-3 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs transition-all shadow-md shadow-[#3D6E3D]/20 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Inquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Stage Comparison Guide Table */}
        <div className="bg-white dark:bg-[#1A281A] rounded-3xl p-6 sm:p-8 border border-[#D1D9D1] dark:border-[#2D422D] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#D1D9D1] dark:border-[#2D422D]">
            <div className="p-2.5 rounded-2xl bg-[#E0E7E0] dark:bg-[#1E341E] text-[#3D6E3D] dark:text-[#A8CDA8]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1A2E1A] dark:text-[#E2EFE2]">
                Fingerling Size & Growth Stage Matrix
              </h3>
              <p className="text-xs text-[#637863] dark:text-[#8FA38F]">
                Quick reference for pond stocking specifications and harvest timelines
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2A3B2A] dark:text-[#C5D8C5]">
              <thead className="bg-[#EDF1ED] dark:bg-[#121E12] text-[#1A2E1A] dark:text-[#E2EFE2] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Stage Name</th>
                  <th className="p-3.5">Size Range</th>
                  <th className="p-3.5">Harvest Cycle</th>
                  <th className="p-3.5">Survival Viability</th>
                  <th className="p-3.5">Recommended Feed Type</th>
                  <th className="p-3.5 rounded-r-xl">Best Pond System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D1D9D1] dark:divide-[#2D422D]">
                <tr>
                  <td className="p-3.5 font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">Starter Fry</td>
                  <td className="p-3.5 font-mono text-[#3D6E3D] dark:text-[#A8CDA8]">1.0 - 1.5 in (2.5-3.8 cm)</td>
                  <td className="p-3.5">120 - 140 Days</td>
                  <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">92 - 95%</td>
                  <td className="p-3.5">High-protein Fry Crumble (42-45%)</td>
                  <td className="p-3.5">Nursery concrete tanks & fine-mesh cages</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">Standard Stocker</td>
                  <td className="p-3.5 font-mono text-[#3D6E3D] dark:text-[#A8CDA8]">2.0 - 2.5 in (5.0-6.3 cm)</td>
                  <td className="p-3.5">90 - 110 Days</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">95 - 98%</td>
                  <td className="p-3.5">Starter Pellets 1.5mm (38-40%)</td>
                  <td className="p-3.5">Earthen grow-out ponds & tarpaulin systems</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">Advance Stocker</td>
                  <td className="p-3.5 font-mono text-[#3D6E3D] dark:text-[#A8CDA8]">3.0 - 3.5 in (7.6-8.9 cm)</td>
                  <td className="p-3.5">70 - 85 Days</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">98 - 99%</td>
                  <td className="p-3.5">Grower Pellets 2.0mm (34-36%)</td>
                  <td className="p-3.5">High-density commercial earthen ponds</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">Jumbo Fast-Track</td>
                  <td className="p-3.5 font-mono text-[#3D6E3D] dark:text-[#A8CDA8]">4.0 - 5.0 in (10.1-12.7 cm)</td>
                  <td className="p-3.5">45 - 60 Days</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">99%+</td>
                  <td className="p-3.5">Finisher Pellets 3.0mm (30-32%)</td>
                  <td className="p-3.5">Rapid harvest rotation ponds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Product Detail Spec Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1A281A] rounded-3xl max-w-lg w-full p-6 border border-[#D1D9D1] dark:border-[#2D422D] shadow-2xl space-y-5">
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121E12]/80 via-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-serif font-black text-2xl">{selectedProduct.name}</h3>
                <span className="text-xs font-semibold text-[#A8CDA8] bg-[#121E12]/90 px-2.5 py-0.5 rounded-full border border-[#2D422D]">
                  {selectedProduct.sizeInInches} ({selectedProduct.sizeInCm})
                </span>
              </div>
            </div>

            <p className="text-sm text-[#2A3B2A] dark:text-[#C5D8C5] leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#EDF1ED] dark:bg-[#121E12] p-3 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D]">
                <span className="text-[#637863] dark:text-[#8FA38F] block mb-0.5">Estimated Harvest Cycle</span>
                <span className="font-bold text-[#1A2E1A] dark:text-[#E2EFE2] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                  {selectedProduct.growthPeriodDays} days to market weight
                </span>
              </div>

              <div className="bg-[#EDF1ED] dark:bg-[#121E12] p-3 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D]">
                <span className="text-[#637863] dark:text-[#8FA38F] block mb-0.5">Pond Survival Viability</span>
                <span className="font-bold text-[#1A2E1A] dark:text-[#E2EFE2] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                  {selectedProduct.survivalRateEstimate}
                </span>
              </div>
            </div>

            <div className="bg-[#E0E7E0] dark:bg-[#1E341E] p-3.5 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D] text-xs text-[#1A2E1A] dark:text-[#E2EFE2] flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#3D6E3D] dark:text-[#A8CDA8] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Oxygenated Packaging Guarantee</span>
                Packed in double-walled oxygen-filled polyethylene bags with water conditioner for up to 12 hours safe transit time to your farm site.
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 rounded-xl bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] font-semibold text-xs hover:bg-[#E0E7E0] transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAdd(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs shadow-md shadow-[#3D6E3D]/20 transition-all"
              >
                Add to Inquiry List
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
