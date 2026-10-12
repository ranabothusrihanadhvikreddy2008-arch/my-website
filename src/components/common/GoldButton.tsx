import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'whatsapp' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold tracking-wider',
    md: 'px-5 py-2.5 text-sm font-semibold tracking-wider',
    lg: 'px-7 py-3.5 text-base font-semibold tracking-wider'
  };

  const variantClasses = {
    primary:
      'bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] shadow-sm hover:shadow-gold-glow transition-all duration-200 border border-[#ECC870] active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-[#1A1612] text-[#FBF7F0] border border-[#6E5325] hover:border-[#D4AF37] transition-all duration-200 active:scale-[0.98]',
    whatsapp:
      'bg-[#E5B544] hover:bg-[#F3C658] text-[#0C0A09] font-semibold border border-[#E5B544] transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]',
    dark:
      'bg-[#1A1612] hover:bg-[#251F19] text-[#D4AF37] border border-[#4A3B24] hover:border-[#D4AF37] transition-all duration-200 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-[#1C1813] text-[#D4AF37] hover:text-[#F3C658] transition-all duration-200'
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
