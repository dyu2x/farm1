import React from 'react';
import logoImg from '../assets/images/mesina_farms_logo_1785996451263.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-9 h-9', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-12 h-12', title: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-16 h-16', title: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-24 h-24', title: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Mesina Farms Emblem Logo Image */}
      <div className={`relative ${currentSize.icon} flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#3D6E3D] via-[#2E572E] to-[#1A2E1A] p-0.5 shadow-md shadow-[#1A2E1A]/20 group hover:scale-105 transition-transform duration-300`}>
        <div className="w-full h-full rounded-full overflow-hidden bg-[#121E12] border border-[#548C54]/50 flex items-center justify-center">
          <img
            src={logoImg}
            alt="Mesina Farms Catfish Hatchery Logo"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Brand Name & Subtitle */}
      <div className="flex flex-col justify-center">
        <span className={`font-serif font-extrabold tracking-tight ${currentSize.title} text-[#1A2E1A] dark:text-[#E2EFE2] leading-none`}>
          MESINA FARMS
        </span>
        {showSubtitle && (
          <span className={`font-sans font-bold uppercase tracking-wider ${currentSize.sub} text-[#3D6E3D] dark:text-[#A8CDA8] opacity-90 mt-0.5`}>
            Catfish Hatchery & Grower
          </span>
        )}
      </div>
    </div>
  );
};
