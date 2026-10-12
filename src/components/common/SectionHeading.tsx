import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[align];

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-6 h-[1px] bg-[#8A6D3B]/60" />
          <span className="text-[11px] font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
            {eyebrow}
          </span>
          <span className="w-6 h-[1px] bg-[#8A6D3B]/60" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#FBF7F0] tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[#B3A696] max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
