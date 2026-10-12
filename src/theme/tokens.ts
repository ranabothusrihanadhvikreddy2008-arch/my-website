/**
 * Design Tokens for SRI GANESH JEWELLERY
 * Extracted directly from Google Stitch designs (screen 1.png & screen 2.png)
 * Single Source of Truth for visual hierarchy, typography, colors, and layout.
 */

export const tokens = {
  colors: {
    bg: {
      primary: '#0C0A09',       // Deep obsidian bronze (body canvas)
      surface: '#14110E',       // Warm ebony (ticker, headers, sections)
      card: '#1A1612',          // Card surface (products, categories, pillars)
      cardHover: '#231D17',     // Elevated card hover state
      banner: '#18130F',        // Swarna Sanchay container background
      input: '#120F0D',         // Form inputs and search fields
    },
    border: {
      subtle: '#261F17',        // Subtle section and divider borders
      hairline: '#352B1E',      // Card and container hairline borders
      gold: '#5E4A28',          // Active / highlighted border
      goldBright: '#D4AF37',    // Primary gold border
      goldHover: '#E5B544',     // Hover state gold accent
    },
    gold: {
      primary: '#D4AF37',       // BIS 916 Royal Hallmark Gold
      bright: '#E5B544',        // High-visibility CTA button gold
      light: '#F5CF68',         // Shimmer / gradient highlight
      dark: '#8C6C2B',          // Deep antique engraving gold
      muted: '#A08040',         // Subheading labels & eyebrows
      gradient: 'linear-gradient(135deg, #F3D27A 0%, #D4AF37 50%, #A87A1E 100%)',
      gradientDark: 'linear-gradient(180deg, #241D15 0%, #17130F 100%)',
    },
    text: {
      primary: '#FBF7F0',       // Ivory / off-white for prominent headings
      secondary: '#C5B8A8',     // Warm secondary text & descriptions
      muted: '#8A7E70',         // Small tags, timestamps, disclaimers
      gold: '#D4AF37',          // High-importance gold prices and labels
      dark: '#0C0A09',          // Contrast text for solid gold buttons
    },
    accent: {
      greenGain: '#10B981',     // Market ticker upward gain (+₹15 today)
      greenGainBg: 'rgba(16, 185, 129, 0.12)',
      redLoss: '#EF4444',       // Price drop indicator
      badgeRed: '#881337',      // "BRIDAL SIGNATURE", "MASTERPIECE" badge
      badgeAmber: '#B45309',    // "SACRED WEDDING" badge
      badgeTeal: '#065F46',     // "BESTSELLER" badge
      badgeOrange: '#C2410C',   // "NEW" badge
      badgeGold: '#78350F',     // "AWARD WINNER" badge
    }
  },
  typography: {
    fontSerif: '"Cinzel", "Playfair Display", "Cormorant Garamond", Georgia, serif',
    fontSans: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    letterSpacing: {
      tighter: '-0.02em',
      normal: '0em',
      wide: '0.05em',
      wider: '0.1em',
      widest: '0.18em',        // Eyebrows like "GENERATIONS OF ARTISTRY"
    }
  },
  radii: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',                 // Default cards & buttons
    lg: '8px',
    xl: '12px',
    full: '9999px',            // Badges and pills
  },
  shadows: {
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
    cardHover: '0 8px 30px -4px rgba(0, 0, 0, 0.85), 0 0 15px rgba(212, 175, 55, 0.15)',
    goldGlow: '0 0 20px rgba(229, 181, 68, 0.35)',
    buttonHover: '0 0 15px rgba(212, 175, 55, 0.4)',
  }
} as const;
