import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  X,
  Camera,
  Sparkles,
  Info,
  CheckCircle
} from 'lucide-react';

import starterImg from '../assets/images/clarias_starter_1785996462634.jpg';
import standardImg from '../assets/images/clarias_standard_1785996472204.jpg';
import advanceImg from '../assets/images/clarias_advance_1785996482236.jpg';
import jumboImg from '../assets/images/clarias_jumbo_1785996494324.jpg';
import pondImg from '../assets/images/clarias_pond_water_1785996946806.jpg';

export interface GallerySlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'pond-facility',
    title: 'Bio-Secure Hatchery & Conditioned Water Ponds',
    subtitle: 'Ivisan, Capiz Facility',
    category: 'Hatchery Facilities',
    imageUrl: pondImg,
    description: 'Our bio-secure concrete and earthen conditioning ponds maintain strict pH, dissolved oxygen, and water purity for optimal fingerling vigor before packing.',
    tags: ['Water Conditioning', 'Bio-Security', 'Ivisan Farm']
  },
  {
    id: 'starter-size',
    title: 'Starter Fingerlings (1.5" - 2.0")',
    subtitle: 'Early Seedling Stage',
    category: 'Fingerling Sizes',
    imageUrl: starterImg,
    description: 'Carefully sorted starter fingerlings conditioned for rapid transition to nursery feeds. Ideal for experienced grow-out operations.',
    tags: ['1.5 - 2.0 Inches', '98% Viability', 'High Density']
  },
  {
    id: 'standard-size',
    title: 'Standard Fingerlings (2.5" - 3.0")',
    subtitle: 'Commercial Best-Seller',
    category: 'Fingerling Sizes',
    imageUrl: standardImg,
    description: 'Uniformly graded standard growth size. Outstanding feed conversion ratio and high resistance against common freshwater pond pathogens.',
    tags: ['2.5 - 3.0 Inches', 'Uniform Size', 'Top Recommended']
  },
  {
    id: 'advance-size',
    title: 'Advance Fingerlings (3.5" - 4.0")',
    subtitle: 'Fast Grow-Out Batch',
    category: 'Fingerling Sizes',
    imageUrl: advanceImg,
    description: 'Robust advance size fingerlings that shorten your grow-out cycle by 3 to 4 weeks. Reduced cannibalism risk and high survival rates.',
    tags: ['3.5 - 4.0 Inches', 'Short Cycle', 'Strong Immunity']
  },
  {
    id: 'jumbo-size',
    title: 'Jumbo Fingerlings (4.5" - 5.0")',
    subtitle: 'Premium Large Stock',
    category: 'Fingerling Sizes',
    imageUrl: jumboImg,
    description: 'Heavyweight jumbo size fingerlings with accelerated feeding response. Perfect for fast-turnaround commercial harvests.',
    tags: ['4.5 - 5.0 Inches', 'Accelerated Growth', 'Market Ready Soon']
  }
];

export const ImageGallerySlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = GALLERY_SLIDES[currentIndex];

  // Auto slideshow timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#D1D9D1] dark:border-[#2D422D]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0E7E0] dark:bg-[#1E341E] text-[#2A4E2A] dark:text-[#A8CDA8] text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-[#3D6E3D] dark:text-[#A8CDA8]" />
            Farm Photo Gallery
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A2E1A] dark:text-[#E2EFE2]">
            Hatchery & Fingerling Image Slideshow
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-2 rounded-xl bg-[#EDF1ED] dark:bg-[#1A281A] text-[#2A3B2A] dark:text-[#C5D8C5] border border-[#D1D9D1] dark:border-[#2D422D] hover:bg-[#E0E7E0] dark:hover:bg-[#233623] text-xs font-bold transition-all flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Pause Autoplay</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Play Autoplay</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Slideshow Player Container */}
      <div className="bg-white dark:bg-[#1A281A] rounded-3xl border border-[#D1D9D1] dark:border-[#2D422D] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left / Main Stage: Interactive Slide Image */}
        <div className="lg:col-span-8 relative min-h-[320px] sm:min-h-[440px] bg-[#121E12] flex items-center justify-center overflow-hidden group">
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className="w-full h-full object-cover max-h-[500px] transition-all duration-700 scale-100 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Dark Overlay Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A120A] via-transparent to-black/30 pointer-events-none"></div>

          {/* Top Category Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-[#121E12]/90 backdrop-blur-md text-[#A8CDA8] text-xs font-bold px-3 py-1 rounded-full border border-[#2D422D] shadow-lg">
              {currentSlide.category}
            </span>
          </div>

          {/* Top Right Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 p-2.5 rounded-2xl bg-[#121E12]/80 backdrop-blur-md text-white hover:bg-[#3D6E3D] transition-colors border border-[#2D422D] shadow-lg"
            title="View Fullscreen Photo"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Prev / Next Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-[#121E12]/80 backdrop-blur-md text-white hover:bg-[#3D6E3D] hover:scale-110 transition-all border border-[#2D422D] shadow-xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-[#121E12]/80 backdrop-blur-md text-white hover:bg-[#3D6E3D] hover:scale-110 transition-all border border-[#2D422D] shadow-xl"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Progress Counter Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-medium backdrop-blur-md bg-[#121E12]/75 p-3 rounded-2xl border border-[#2D422D]">
            <div className="font-serif font-bold text-sm text-white">
              {currentSlide.title}
            </div>
            <div className="font-mono text-xs text-[#A8CDA8] font-bold bg-[#1C2C1C] px-2.5 py-1 rounded-lg border border-[#2D422D]">
              {currentIndex + 1} / {GALLERY_SLIDES.length}
            </div>
          </div>
        </div>

        {/* Right Stage: Detailed Caption, Tagging & Thumbnails List */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between space-y-6 bg-white dark:bg-[#1A281A]">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#3D6E3D] dark:text-[#A8CDA8] uppercase tracking-wider block mb-1">
                {currentSlide.subtitle}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1A2E1A] dark:text-[#E2EFE2] leading-snug">
                {currentSlide.title}
              </h3>
            </div>

            <p className="text-xs text-[#637863] dark:text-[#8FA38F] leading-relaxed">
              {currentSlide.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentSlide.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F9F7] dark:bg-[#121E12] text-[#2A3B2A] dark:text-[#C5D8C5] text-[11px] font-medium border border-[#D1D9D1] dark:border-[#2D422D]"
                >
                  <CheckCircle className="w-3 h-3 text-[#3D6E3D] dark:text-[#A8CDA8]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Thumbnail Strip Selector */}
          <div className="space-y-2 pt-4 border-t border-[#D1D9D1] dark:border-[#2D422D]">
            <div className="flex items-center justify-between text-xs font-bold text-[#1A2E1A] dark:text-[#E2EFE2]">
              <span>Gallery Thumbnails</span>
              <span className="text-[10px] text-[#637863] font-normal">Click to select</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {GALLERY_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative rounded-xl overflow-hidden h-14 transition-all ${
                    index === currentIndex
                      ? 'ring-2 ring-[#3D6E3D] dark:ring-[#A8CDA8] scale-105 shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-[#3D6E3D]/20 border-2 border-[#3D6E3D] rounded-xl pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Top Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-[#3D6E3D] px-3 py-1 rounded-full">
                {currentSlide.category}
              </span>
              <h3 className="font-serif font-bold text-lg text-white hidden sm:block">
                {currentSlide.title}
              </h3>
            </div>

            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Image Stage */}
          <div className="relative flex-1 w-full max-w-6xl my-6 flex items-center justify-center">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={handlePrev}
              className="absolute left-4 p-4 rounded-full bg-black/60 text-white hover:bg-[#3D6E3D] transition-colors border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 p-4 rounded-full bg-black/60 text-white hover:bg-[#3D6E3D] transition-colors border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="w-full max-w-3xl text-center space-y-2 text-white bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
            <h4 className="font-serif font-bold text-lg">{currentSlide.title}</h4>
            <p className="text-xs text-slate-300">{currentSlide.description}</p>
          </div>
        </div>
      )}

    </section>
  );
};
