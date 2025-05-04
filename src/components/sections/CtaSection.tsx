"use client";

import { contactFormSchema, useFormSubmit, type ContactFormData } from '@/hooks/useFormSubmit';
import { gsap, useGSAP } from "@/lib/animation";
import { cn } from '@/lib/utils';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const {
    formState,
    formMethods,
    handleSubmit,
  } = useFormSubmit<ContactFormData>({
    schema: contactFormSchema,
    onSuccess: (data) => {
      console.log('Form submitted:', data);
    },
  });
  
  const { isSubmitting, isSubmitted, isError, errorMessage } = formState;
  const { register, formState: { errors } } = formMethods;
  
  // GSAP animations
  useGSAP(() => {
    // Set initial state to ensure elements are visible if animation fails
    gsap.set(".cta-content, .cta-form", { 
      opacity: 1 
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
    
    // Animate section 
    tl.from(".cta-content", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    });
    
    // Animate form
    tl.from(".cta-form", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.5");
    
  }, { scope: sectionRef });
  
  return (
    <section 
      id="get-started" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary/10 to-primary/5"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied customers who have simplified their borrowing experience with us.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-700">Quick application process that takes minutes, not days</span>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-700">Competitive interest rates tailored to your profile</span>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-700">24/7 customer support throughout your loan journey</span>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-700">No hidden fees or prepayment penalties</span>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="cta-form bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Get Started Today
            </h3>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <p className="text-green-800 font-medium">Thank you for your interest!</p>
                  <p className="text-green-700 mt-1">We&apos;ll be in touch with you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {isError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-red-800 font-medium">There was an error</p>
                      <p className="text-red-700 mt-1">{errorMessage || 'Please try again later.'}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors",
                      errors.name ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="Enter your name"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors",
                      errors.email ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="Enter your email"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors resize-none",
                      errors.message ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="Tell us about your loan needs"
                    rows={4}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit <ArrowRight className="ml-2" size={18} />
                    </span>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 