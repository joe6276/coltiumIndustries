//src/components/layout/Header.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Navigation items with dropdown menus
  const navItems = [
    { title: "About Us", href: "/about" },
    { 
      title: "Technologies", 
      href: "/technologies",
      dropdown: [
        { title: "Embedded Systems", href: "/technologies#embedded-systems" },
        { title: "AI & ML", href: "/technologies#artificial-intelligence" },
        { title: "ASIC & FPGA Design", href: "/technologies#chip-design" },
        { title: "IoT & Connectivity", href: "/technologies#iot-connectivity" },
        { title: "Space Navigation", href: "/technologies#space-navigation" },
        { title: "Sports Technology", href: "/technologies#sports-technology" }
      ]
    },
    { title: "Projects", href: "/projects" },
    { title: "Partners", href: "/partners" },
    { title: "Team", href: "/team" }
  ];

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center relative z-10">
          <Image
            src="/images/logo.png"
            alt="Coltium Industries Logo"
            width={0}
            height={0}
            sizes="(max-width: 768px) 120px, 140px"
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <nav className="flex items-center mr-6">
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.dropdown ? (
                  <div className="flex flex-col">
                    <Link 
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-md font-medium flex items-center gap-1 transition-colors",
                        activeLink === item.href 
                          ? "text-primary" 
                          : "text-gray-700 hover:text-primary",
                        "relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                      )}
                    >
                      {item.title}
                      <ChevronDown size={16} className={cn(
                        "transition-transform duration-200",
                        hoveredItem === index ? "rotate-180" : ""
                      )} />
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {hoveredItem === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden min-w-[200px] z-20"
                        >
                          <div className="py-1">
                            {item.dropdown.map((dropdownItem, idx) => (
                              <Link
                                key={idx}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                              >
                                {dropdownItem.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-md font-medium transition-colors",
                      activeLink === item.href
                        ? "text-primary" 
                        : "text-gray-700 hover:text-primary",
                      "relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <Button asChild className="bg-primary hover:bg-primary/90 text-white text-md  rounded-md px-7 py-5 transition-colors">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-primary/5 text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col">
              {navItems.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <Link 
                        href={item.href}
                        className={cn(
                          "block font-medium transition-colors",
                          activeLink === item.href
                            ? "text-primary" 
                            : "text-gray-700 hover:text-primary",
                          "relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      <div className="pl-4 space-y-2 border-l-2 border-primary/20 mt-2">
                        {item.dropdown.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            href={dropdownItem.href}
                            className="block text-gray-700 hover:text-primary py-1 font-medium text-sm transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 font-medium transition-colors",
                        activeLink === item.href
                          ? "text-primary" 
                          : "text-gray-700 hover:text-primary",
                        "relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white w-full mt-2"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;