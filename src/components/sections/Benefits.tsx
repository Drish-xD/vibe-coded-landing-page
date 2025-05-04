"use client";

import { benefits, metricBenefits } from '@/constants/benefits';
import { gsap, useGSAP } from '@/lib/animation';
import { formatNumber } from '@/lib/utils';
import { useEffect, useRef } from 'react';

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  
  // Counter animation for metrics
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && metricsRef.current) {
            const metrics = metricsRef.current.querySelectorAll('.metric-value');
            
            metrics.forEach((metric) => {
              const valueDisplay = metric as HTMLElement;
              const endValue = parseFloat(valueDisplay.getAttribute('data-value') || '0');
              const unit = valueDisplay.getAttribute('data-unit') || '';
              const isPercentage = unit === '%';
              const hasPlus = valueDisplay.textContent?.includes('+');
              const duration = 2000; // ms
              const increment = endValue / (duration / 16); // 16ms is roughly a frame
              
              let startValue = 0;
              const timer = setInterval(() => {
                startValue += increment;
                
                if (startValue >= endValue) {
                  valueDisplay.textContent = `${formatNumber(endValue)}${unit}${hasPlus ? '+' : ''}`;
                  clearInterval(timer);
                } else {
                  const displayValue = isPercentage ? 
                    Math.floor(startValue) : 
                    parseFloat(startValue.toFixed(1));
                  
                  valueDisplay.textContent = `${formatNumber(displayValue)}${unit}${hasPlus ? '+' : ''}`;
                }
              }, 16);
            });
            
            // Once animated, disconnect the observer
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // GSAP animations
  useGSAP(() => {
    // Set initial state to ensure elements are visible if animation fails
    gsap.set(".benefits-title, .benefits-description, .traditional-column, .platform-column, .benefit-row", { 
      opacity: 1 
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      }
    });
    
    // Animate section title
    tl.from(".benefits-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });
    
    // Animate section description
    tl.from(".benefits-description", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");
    
    // Animate traditional column
    tl.from(".traditional-column", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
    
    // Animate platform column
    tl.from(".platform-column", {
      x: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");
    
    // Animate benefit rows
    tl.from(".benefit-row", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");
    
  }, { scope: sectionRef });
  
  return (
    <section 
      id="benefits" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="benefits-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us Over Traditional Banks
          </h2>
          <p className="benefits-description text-xl text-gray-600">
            Experience the advantages of our modern lending platform compared to traditional banking options.
          </p>
        </div>
        
        {/* Comparison table */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-2 text-lg font-semibold">
            <div className="traditional-column p-6 bg-gray-100 text-center border-b border-gray-200">
              Traditional Banks
            </div>
            <div className="platform-column p-6 bg-primary/10 text-primary text-center border-b border-gray-200">
              Our Platform
            </div>
          </div>
          
          {/* Benefit rows */}
          <div className="divide-y divide-gray-200">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="benefit-row grid grid-cols-2">
                <div className="p-6 text-gray-600 flex items-center">
                  <span>{benefit.traditional}</span>
                </div>
                <div className="p-6 text-gray-800 bg-gray-50 flex items-center font-medium">
                  <span>{benefit.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Metrics */}
        <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          {metricBenefits.map((metric) => (
            <div key={metric.id} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700 metric-value" data-value={metric.traditional} data-unit={metric.unit}>
                    0{metric.unit}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Traditional</div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary metric-value" data-value={metric.platform} data-unit={metric.unit}>
                    0{metric.unit}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Our Platform</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 