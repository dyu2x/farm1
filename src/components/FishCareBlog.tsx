import React, { useState } from 'react';
import { BookOpen, Calculator, Fish, Droplets, ArrowRight, ShieldAlert, CheckCircle2, ChevronRight, X, Sparkles } from 'lucide-react';
import { BlogArticle } from '../types';

interface FishCareBlogProps {
  articles: BlogArticle[];
  selectedArticleFromSearch?: BlogArticle | null;
}

export const FishCareBlog: React.FC<FishCareBlogProps> = ({
  articles,
  selectedArticleFromSearch,
}) => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(
    selectedArticleFromSearch || null
  );

  // Feeding Calculator State
  const [fishCount, setFishCount] = useState<number>(5000);
  const [stage, setStage] = useState<'starter' | 'standard' | 'advance' | 'jumbo'>('standard');

  // Stocking Calculator State
  const [pondLength, setPondLength] = useState<number>(10); // meters
  const [pondWidth, setPondWidth] = useState<number>(5); // meters
  const [pondDepth, setPondDepth] = useState<number>(1.2); // meters

  // Calculations for Feed
  const feedSpecs = {
    starter: { name: 'Starter (1.0 - 1.5 in)', avgWeightGrams: 1.2, feedPercent: 8, protein: '42-45% Fry Crumble', frequency: '4x daily' },
    standard: { name: 'Standard (2.0 - 2.5 in)', avgWeightGrams: 4.5, feedPercent: 5.5, protein: '38-40% Starter 1.5mm', frequency: '3x daily' },
    advance: { name: 'Advance (3.0 - 3.5 in)', avgWeightGrams: 12.0, feedPercent: 4.0, protein: '34-36% Grower 2.0mm', frequency: '2x daily' },
    jumbo: { name: 'Jumbo (4.0 - 5.0 in)', avgWeightGrams: 28.0, feedPercent: 3.0, protein: '30-32% Finisher 3.0mm', frequency: '2x daily' },
  };

  const spec = feedSpecs[stage];
  const totalBiomassKg = (fishCount * spec.avgWeightGrams) / 1000;
  const dailyFeedKg = (totalBiomassKg * spec.feedPercent) / 100;

  // Calculations for Pond Water Volume & Capacity
  const waterVolumeCubicMeters = pondLength * pondWidth * pondDepth;
  const maxStockingCapacityPcs = Math.round(waterVolumeCubicMeters * 80); // ~80 pcs/m3 for Clarias batrachus in earthen ponds

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white dark:bg-[#1A281A] border-t border-[#D1D9D1] dark:border-[#2D422D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0E7E0] dark:bg-[#1E341E] text-[#2A4E2A] dark:text-[#A8CDA8] text-xs font-bold uppercase tracking-wider border border-[#D1D9D1] dark:border-[#2D422D]">
            <BookOpen className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
            Clarias Batrachus Knowledge Center
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1A2E1A] dark:text-[#E2EFE2] tracking-tight">
            Fish Care Guides & <span className="text-[#3D6E3D] dark:text-[#A8CDA8]">Interactive Tools</span>
          </h2>
          <p className="text-sm sm:text-base text-[#637863] dark:text-[#8FA38F]">
            Expert aquaculture management protocols developed specifically for native Asian Walking Catfish (<em className="text-[#3D6E3D] dark:text-[#A8CDA8] font-serif">Clarias batrachus</em>) farming in Capiz and Visayas.
          </p>
        </div>

        {/* Interactive Farm Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tool 1: Catfish Daily Feed Calculator */}
          <div className="bg-gradient-to-br from-[#121E12] via-[#1A2C1A] to-[#121E12] rounded-3xl p-6 sm:p-8 text-white border border-[#2D422D] shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2D422D]">
              <div className="p-2.5 rounded-2xl bg-[#3D6E3D]/30 text-[#A8CDA8] border border-[#3D6E3D]/50">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-white">Daily Feed Requirement Calculator</h3>
                <p className="text-xs text-[#8FA38F]">Calculate exact feed weight in kg to optimize FCR</p>
              </div>
            </div>

            <div className="space-y-4 pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8FA38F] uppercase tracking-wider mb-1.5">
                    Growth Stage
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl px-3.5 py-2.5 text-xs font-bold text-white outline-none focus:border-[#3D6E3D]"
                  >
                    <option value="starter">Starter (1.0 - 1.5 in)</option>
                    <option value="standard">Standard (2.0 - 2.5 in)</option>
                    <option value="advance">Advance (3.0 - 3.5 in)</option>
                    <option value="jumbo">Jumbo (4.0 - 5.0 in)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8FA38F] uppercase tracking-wider mb-1.5">
                    Fingerling Count (pcs)
                  </label>
                  <input
                    type="number"
                    step="500"
                    min="100"
                    value={fishCount}
                    onChange={(e) => setFishCount(Number(e.target.value) || 100)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl px-3.5 py-2.5 text-xs font-bold text-white outline-none focus:border-[#3D6E3D]"
                  />
                </div>
              </div>

              {/* Feed Result Card */}
              <div className="bg-[#121E12]/90 rounded-2xl p-4 border border-[#2D422D] space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#8FA38F]">Total Biomass Est.:</span>
                  <span className="font-mono font-bold text-[#C5D8C5]">{totalBiomassKg.toFixed(1)} kg</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#8FA38F]">Recommended Feed Specs:</span>
                  <span className="text-xs font-semibold text-[#A8CDA8]">{spec.protein}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#8FA38F]">Feeding Frequency:</span>
                  <span className="text-xs font-semibold text-[#A8CDA8]">{spec.frequency}</span>
                </div>
                <div className="pt-2 border-t border-[#2D422D] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#C5D8C5]">Daily Feed Needed:</span>
                  <span className="text-3xl font-black text-[#A8CDA8]">{dailyFeedKg.toFixed(2)} kg / day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 2: Pond Water Volume & Stocking Density Calculator */}
          <div className="bg-gradient-to-br from-[#121E12] via-[#1A2C1A] to-[#121E12] rounded-3xl p-6 sm:p-8 text-white border border-[#2D422D] shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2D422D]">
              <div className="p-2.5 rounded-2xl bg-[#3D6E3D]/30 text-[#A8CDA8] border border-[#3D6E3D]/50">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-white">Pond Capacity & Stocking Calculator</h3>
                <p className="text-xs text-[#8FA38F]">Determine maximum stocking density for earthen/concrete ponds</p>
              </div>
            </div>

            <div className="space-y-4 pt-5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8FA38F] uppercase tracking-wider mb-1">
                    Length (m)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={pondLength}
                    onChange={(e) => setPondLength(Number(e.target.value) || 1)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#3D6E3D] text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8FA38F] uppercase tracking-wider mb-1">
                    Width (m)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={pondWidth}
                    onChange={(e) => setPondWidth(Number(e.target.value) || 1)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#3D6E3D] text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8FA38F] uppercase tracking-wider mb-1">
                    Depth (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={pondDepth}
                    onChange={(e) => setPondDepth(Number(e.target.value) || 0.5)}
                    className="w-full bg-[#121E12] border border-[#2D422D] rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#3D6E3D] text-center"
                  />
                </div>
              </div>

              {/* Pond Capacity Result Card */}
              <div className="bg-[#121E12]/90 rounded-2xl p-4 border border-[#2D422D] space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#8FA38F]">Total Pond Surface Area:</span>
                  <span className="font-mono font-bold text-[#C5D8C5]">{(pondLength * pondWidth).toFixed(1)} m²</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#8FA38F]">Water Volume:</span>
                  <span className="font-mono font-bold text-[#A8CDA8]">{waterVolumeCubicMeters.toFixed(1)} m³ ({Math.round(waterVolumeCubicMeters * 1000).toLocaleString()} Liters)</span>
                </div>
                <div className="pt-2 border-t border-[#2D422D] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#C5D8C5]">Max Safe Stocking:</span>
                  <span className="text-3xl font-black text-[#A8CDA8]">{maxStockingCapacityPcs.toLocaleString()} pcs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Articles Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1A2E1A] dark:text-[#E2EFE2] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
            Featured Fish Care & Hatchery Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group bg-[#F7F9F7] dark:bg-[#121E12] rounded-3xl overflow-hidden border border-[#D1D9D1] dark:border-[#2D422D] hover:border-[#3D6E3D] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#121E12]/80 backdrop-blur-md text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full border border-[#2D422D]">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#637863] dark:text-[#8FA38F]">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="font-serif font-bold text-lg text-[#1A2E1A] dark:text-[#E2EFE2] group-hover:text-[#3D6E3D] dark:group-hover:text-[#A8CDA8] transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-[#2A3B2A] dark:text-[#C5D8C5] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#3D6E3D] dark:text-[#A8CDA8]">
                  <span>Read Full Guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A281A] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-[#D1D9D1] dark:border-[#2D422D] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#D1D9D1] dark:border-[#2D422D] flex justify-between items-center bg-[#F7F9F7] dark:bg-[#121E12]">
              <span className="text-xs font-bold text-[#3D6E3D] dark:text-[#A8CDA8] uppercase tracking-wider">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl text-[#637863] dark:text-[#8FA38F] hover:text-[#1A2E1A] dark:hover:text-[#E2EFE2] hover:bg-[#EDF1ED] dark:hover:bg-[#233623]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121E12]/90 via-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif font-black text-2xl sm:text-3xl leading-tight mb-1">{activeArticle.title}</h3>
                  <div className="text-xs text-[#C5D8C5]">By {activeArticle.author} • Published {activeArticle.date}</div>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-[#E0E7E0] dark:bg-[#1E341E] p-4 rounded-2xl border border-[#D1D9D1] dark:border-[#2D422D] space-y-2">
                <div className="font-bold text-xs text-[#1A2E1A] dark:text-[#E2EFE2] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                  Key Takeaways for Farmers
                </div>
                <ul className="space-y-1.5 text-xs text-[#2A3B2A] dark:text-[#C5D8C5]">
                  {activeArticle.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8] flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="prose dark:prose-invert max-w-none text-sm text-[#2A3B2A] dark:text-[#C5D8C5] leading-relaxed whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>
            </div>

            <div className="p-4 border-t border-[#D1D9D1] dark:border-[#2D422D] flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white font-bold text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
