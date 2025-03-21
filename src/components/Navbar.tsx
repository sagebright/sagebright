
import React, { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Use throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    // Throttle scroll event for better performance
    let scrollTimer: number;
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = window.setTimeout(() => {
          scrollTimer = 0;
          handleScroll();
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimer);
    };
  }, [handleScroll]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-sm'
    } border-b border-gray-100`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo variant="full" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#why" className="text-body font-sans text-gray-600 hover:text-sagebright-green transition-colors duration-200">
              Why{" "} <span className="text-sagebright-green">sagebright</span>
            </a>
            <a href="#how" className="text-body font-sans text-gray-600 hover:text-sagebright-green transition-colors duration-200">
              How {" "}  <span className="text-sagebright-green">sagebright</span> {" "} Works
            </a>
            <a href="#who" className="text-body font-sans text-gray-600 hover:text-sagebright-green transition-colors duration-200">
              Who We Help
            </a>
          </nav>
          <div>
            <Button asChild className="bg-sagebright-coral hover:bg-sagebright-coral/90 text-white text-cta font-dmSans rounded-md transition-transform duration-300 hover:scale-103 hover:brightness-105">
              <a href="#waitlist">Join Beta</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
