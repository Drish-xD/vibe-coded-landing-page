"use client";

import { footerSections, socialLinks } from '@/constants/navigation';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary">
              LoanCred
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Empowering your financial journey with instant loans, minimal paperwork, and exceptional service. Your trusted partner for all lending needs.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => {
                const SocialIcon = socialIcons[link.id as keyof typeof socialIcons] || Twitter;
                
                return (
                  <Link 
                    key={link.id} 
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-gray-700"
                    aria-label={link.label}
                    tabIndex={0}
                  >
                    <SocialIcon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors"
                      tabIndex={0}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} LoanCred. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary text-sm"
                    tabIndex={0}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary text-sm"
                    tabIndex={0}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary text-sm"
                    tabIndex={0}
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 