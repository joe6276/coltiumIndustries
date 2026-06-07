"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [hoveredItem, setHoveredItem] = useState(null);

  const pathname = usePathname();
  const isFullyDarkPage = pathname === "/aeca";
  const hasDarkHero = pathname === "/";
  const isHeaderDark = isScrolled ? isFullyDarkPage : (isFullyDarkPage || hasDarkHero);

  // Navigation items with dropdown menus including CDPES
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
    {
      title: "CDPES",
      href: "/cdpes",

    },
    {
      title: "AECA",
      href: "/aeca",
    },
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
      className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 text-gray-900"
    >
      <div 
        className={cn(
          "container mx-auto px-4 flex items-center justify-between transition-all duration-300",
          isScrolled ? "py-3 lg:py-4" : "py-5 lg:py-6"
        )}
      >
        <Link href="/" className="flex items-center relative z-10">
          <Image
            src="/images/logo.png"
            alt="Coltium Industries Logo"
            width={0}
            height={0}
            sizes="(max-width: 768px) 140px, 180px"
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-12 lg:h-14" : "h-14 lg:h-16"
            )}
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
                        "px-4 py-2 text-md font-medium flex items-center gap-1 transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                        // Product page custom styling
                        item.title === "CDPES" 
                          ? "text-blue-600 font-semibold hover:text-blue-700 after:bg-blue-600" 
                          : item.title === "AECA" 
                            ? "text-emerald-600 font-semibold hover:text-emerald-700 after:bg-emerald-600"
                            : activeLink === item.href
                              ? "text-primary font-semibold after:bg-primary after:scale-x-100"
                              : "text-gray-700 hover:text-primary after:bg-primary"
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
                          className={cn(
                            "absolute top-full left-0 mt-1 rounded-md shadow-lg overflow-hidden min-w-[200px] z-20 border bg-white border-gray-100 text-gray-900",
                            item.title === "CDPES" && "border-t-2 border-blue-500",
                            item.title === "AECA" && "border-t-2 border-emerald-500"
                          )}
                        >
                          <div className="py-1">
                            {item.dropdown.map((dropdownItem, idx) => (
                              <Link
                                key={idx}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm relative transition-colors text-gray-700 hover:bg-primary/5 hover:text-primary"
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
                      "px-4 py-2 text-md font-medium transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                      activeLink === item.href
                        ? "text-primary font-semibold after:bg-primary after:scale-x-100"
                        : "text-gray-700 hover:text-primary after:bg-primary"
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <Button 
            asChild 
            className="text-md rounded-md px-7 py-5 transition-all duration-300 bg-primary hover:bg-primary/90 text-white"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md transition-colors hover:bg-primary/5 text-primary"
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
            className="lg:hidden border-t shadow-lg bg-white border-gray-100 text-gray-900"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col">
              {navItems.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <Link 
                        href={item.href}
                        className={cn(
                          "block font-medium transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                          item.title === "CDPES" 
                            ? "text-blue-600 font-semibold after:bg-blue-600" 
                            : item.title === "AECA" 
                              ? "text-emerald-600 font-semibold after:bg-emerald-600"
                              : activeLink === item.href
                                ? "text-primary font-semibold after:bg-primary after:scale-x-100"
                                : "text-gray-700 hover:text-primary after:bg-primary"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      <div className="pl-4 space-y-2 border-l-2 mt-2 border-primary/20">
                        {item.dropdown.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            href={dropdownItem.href}
                            className="block py-1 font-medium text-sm transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform text-gray-600 hover:text-primary after:bg-primary"
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
                        "block py-2 font-medium transition-colors relative inline-block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                        activeLink === item.href
                          ? "text-primary font-semibold after:bg-primary after:scale-x-100"
                          : "text-gray-700 hover:text-primary after:bg-primary"
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
                className="w-full mt-2 transition-all duration-300 bg-primary hover:bg-primary/90 text-white"
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