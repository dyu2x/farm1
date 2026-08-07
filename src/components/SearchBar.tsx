import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, BookOpen, Fish, MapPin, Phone, HelpCircle } from 'lucide-react';
import { FingerlingProduct, BlogArticle } from '../types';

interface SearchBarProps {
  products: FingerlingProduct[];
  blogs: BlogArticle[];
  onSelectProduct: (product: FingerlingProduct) => void;
  onSelectBlog: (blog: BlogArticle) => void;
  onNavigate: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  products,
  blogs,
  onSelectProduct,
  onSelectBlog,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.sizeInInches.toLowerCase().includes(trimmed) ||
          p.sizeInCm.toLowerCase().includes(trimmed) ||
          p.bestFor.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingBlogs = trimmed
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(trimmed) ||
          b.category.toLowerCase().includes(trimmed) ||
          b.excerpt.toLowerCase().includes(trimmed) ||
          b.keyTakeaways.some((k) => k.toLowerCase().includes(trimmed))
      )
    : [];

  const quickLinks = [
    { label: 'Starter Fingerlings (1.0-1.5 in)', action: () => onNavigate('catalog') },
    { label: 'Farm Location in Santa Rita, Pampanga', action: () => onNavigate('location') },
    { label: 'Order Inquiry Form', action: () => onNavigate('catalog') },
    { label: 'Fish Care Feeding Guide', action: () => onNavigate('blog') },
    { label: 'Customer Support (+63 962 527 9820)', action: () => onNavigate('location') },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1A281A] rounded-2xl shadow-2xl border border-[#D1D9D1] dark:border-[#2D422D] overflow-hidden">
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#D1D9D1] dark:border-[#2D422D]">
          <Search className="w-5 h-5 text-[#637863] dark:text-[#8FA38F] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fingerlings, size, fish care guide, location..."
            className="w-full text-base bg-transparent border-none outline-none text-[#1A2E1A] dark:text-[#E2EFE2] placeholder-[#637863] dark:placeholder-[#8FA38F]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#637863] dark:text-[#8FA38F] hover:text-[#1A2E1A] dark:hover:text-[#E2EFE2] hover:bg-[#EDF1ED] dark:hover:bg-[#233623] transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#E0E7E0] dark:hover:bg-[#1E341E] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
          {!trimmed && (
            <div>
              <div className="text-xs font-semibold text-[#637863] dark:text-[#8FA38F] uppercase tracking-wider mb-2 px-2">
                Quick Shortcuts & Popular Searches
              </div>
              <div className="space-y-1">
                {quickLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      link.action();
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-sm text-[#2A3B2A] dark:text-[#C5D8C5] hover:bg-[#EDF1ED] dark:hover:bg-[#121E12] hover:text-[#3D6E3D] dark:hover:text-[#A8CDA8] transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Fish className="w-4 h-4 text-[#3D6E3D] dark:text-[#A8CDA8] opacity-70 group-hover:opacity-100" />
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#637863] dark:text-[#8FA38F] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && matchingProducts.length === 0 && matchingBlogs.length === 0 && (
            <div className="py-12 text-center text-[#637863] dark:text-[#8FA38F]">
              <HelpCircle className="w-10 h-10 mx-auto text-[#637863] dark:text-[#8FA38F] mb-2" />
              <p className="font-medium text-base">No matching catalog items or guides found</p>
              <p className="text-sm text-[#637863] dark:text-[#8FA38F] mt-1">Try searching for "starter", "jumbo", "water quality", or "Santa Rita"</p>
            </div>
          )}

          {/* Product Results */}
          {matchingProducts.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-[#3D6E3D] dark:text-[#A8CDA8] uppercase tracking-wider mb-2 px-2 flex items-center gap-1.5">
                <Fish className="w-4 h-4" />
                Catfish Fingerling Products ({matchingProducts.length})
              </div>
              <div className="space-y-2">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D] hover:border-[#3D6E3D] hover:bg-[#EDF1ED] dark:hover:bg-[#121E12] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#D1D9D1] dark:border-[#2D422D]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-semibold text-[#1A2E1A] dark:text-[#E2EFE2] group-hover:text-[#3D6E3D] dark:group-hover:text-[#A8CDA8] flex items-center gap-2">
                          {p.name}
                          <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-[#EDF1ED] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5]">
                            {p.sizeInInches}
                          </span>
                        </div>
                        <p className="text-xs text-[#637863] dark:text-[#8FA38F] line-clamp-1 mt-0.5">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-sm font-bold text-[#3D6E3D] dark:text-[#A8CDA8]">
                        ₱{p.basePrice.toFixed(2)}/pc
                      </div>
                      <div className="text-[11px] text-[#637863] dark:text-[#8FA38F]">
                        {p.stockCount.toLocaleString()} in stock
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Results */}
          {matchingBlogs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-[#3D6E3D] dark:text-[#A8CDA8] uppercase tracking-wider mb-2 px-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Fish Care Guides & Articles ({matchingBlogs.length})
              </div>
              <div className="space-y-2">
                {matchingBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      onSelectBlog(b);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#D1D9D1] dark:border-[#2D422D] hover:border-[#3D6E3D] hover:bg-[#EDF1ED] dark:hover:bg-[#121E12] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-12 h-12 rounded-lg object-cover border border-[#D1D9D1] dark:border-[#2D422D]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-semibold text-[#1A2E1A] dark:text-[#E2EFE2] group-hover:text-[#3D6E3D] dark:group-hover:text-[#A8CDA8] line-clamp-1">
                          {b.title}
                        </div>
                        <p className="text-xs text-[#637863] dark:text-[#8FA38F] line-clamp-1 mt-0.5">
                          {b.excerpt}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#637863] dark:text-[#8FA38F] group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
