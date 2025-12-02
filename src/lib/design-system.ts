// Design System Constants for Visual Consistency
export const designSystem = {
  // Colors - Consistent across all components
  colors: {
    primary: {
      50: 'rgb(239, 246, 255)',
      100: 'rgb(219, 234, 254)',
      500: 'rgb(59, 130, 246)',
      600: 'rgb(37, 99, 235)',
      700: 'rgb(29, 78, 216)',
      900: 'rgb(30, 58, 138)',
    },
    secondary: {
      50: 'rgb(248, 250, 252)',
      100: 'rgb(241, 245, 249)',
      500: 'rgb(100, 116, 139)',
      600: 'rgb(71, 85, 105)',
      900: 'rgb(15, 23, 42)',
    },
    accent: {
      purple: 'rgb(147, 51, 234)',
      pink: 'rgb(236, 72, 153)',
      emerald: 'rgb(16, 185, 129)',
      orange: 'rgb(249, 115, 22)',
    }
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
    }
  },

  // Spacing System
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Animation Durations
  animation: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },

  // Component Variants
  components: {
    button: {
      height: {
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
      padding: {
        sm: '0.5rem 0.75rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
        xl: '1.25rem 2.5rem',
      }
    },
    card: {
      padding: '1.5rem',
      borderRadius: '0.75rem',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    input: {
      height: '2.5rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
    }
  },

  // Grid System
  grid: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    cols: {
      mobile: 'grid-cols-1',
      tablet: 'sm:grid-cols-2',
      desktop: 'lg:grid-cols-3 xl:grid-cols-4',
      large: 'lg:grid-cols-4',
    },
    gap: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }
  },

  // Section Spacing
  sections: {
    padding: {
      mobile: 'py-16',
      desktop: 'md:py-24 lg:py-32',
    },
    margin: {
      bottom: 'mb-12 lg:mb-16',
    }
  }
};

// Utility functions for consistent styling
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary', size: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm hover:shadow-md focus:ring-gray-500',
    outline: 'border-2 border-gray-300 hover:border-gray-400 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
  };

  const sizes = {
    sm: `h-8 px-3 text-sm rounded-md`,
    md: `h-10 px-6 text-base rounded-lg`,
    lg: `h-12 px-8 text-lg rounded-xl`,
    xl: `h-14 px-10 text-xl rounded-2xl`,
  };

  return `${baseClasses} ${variants[variant]} ${sizes[size]}`;
};

export const getCardClasses = (hover: boolean = true) => {
  const baseClasses = 'bg-white border border-gray-200 shadow-md transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  return `${baseClasses} ${hoverClasses} rounded-xl p-6`;
};

export const getContainerClasses = () => {
  return designSystem.grid.container;
};

export const getSectionClasses = () => {
  return `${designSystem.sections.padding.mobile} ${designSystem.sections.padding.desktop}`;
};