"use client";

import { navigation } from '@/constants/navigation';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition(50);
  
  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleMenu();
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          LoanCred
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-gray-800 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <Link
            href="#get-started"
            className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-800"
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDown}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          tabIndex={0}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 top-[60px] bg-white z-40 md:hidden"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {navigation.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-lg text-gray-800 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              href="#get-started"
              className="px-5 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 