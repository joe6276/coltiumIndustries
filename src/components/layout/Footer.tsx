//src/components/layout/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Globe, Phone } from "lucide-react";

// WhatsApp SVG icon component
const WhatsAppIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// YouTube SVG icon component
const YouTubeIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Twitter/X SVG icon component
const TwitterIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// LinkedIn SVG icon component
const LinkedInIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Facebook SVG icon component
const FacebookIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Footer = () => {
  // WhatsApp number and pre-filled message
  const whatsappNumber = "+17584869802";
  const whatsappMessage = "Hello Coltium Industries, I would like to get in touch.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  // Social media links
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@coltiumindustries",
      icon: <YouTubeIcon />,
    },
    {
      name: "Twitter",
      url: "https://x.com/Coltium_Ind",
      icon: <TwitterIcon />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/coltium-industries/",
      icon: <LinkedInIcon />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/people/Coltium-Industries/61575821007101/",
      icon: <FacebookIcon />,
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="Coltium Industries Logo"
                width={0}
                height={0}
                sizes="(max-width: 768px) 120px, 160px"
                className="h-10 w-auto object-contain invert"
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              We build practical, advanced, and scalable technologies that solve
              urgent real-world problems across healthcare, energy, mobility,
              and infrastructure.
            </p>
            <div className="flex flex-col space-y-2 text-gray-300">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>15164-00509, Langata Hardy, Nairobi</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a
                  href="mailto:contact@intl-coltium.com"
                  className="hover:text-white transition-colors"
                >
                  contact@intl-coltium.com
                </a>
              </div>
              <div className="flex items-center">
                <Globe size={18} className="mr-2" />
                <a
                  href="https://www.intl-coltium.com"
                  className="hover:text-white transition-colors"
                >
                  www.intl-coltium.com
                </a>
              </div>
              <div className="flex items-center">
                <WhatsAppIcon />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors ml-2"
                >
                  +1 (758) 486-9802
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Technologies
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/client"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Payment Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Key Sectors</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/technologies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Smart Healthcare
                </Link>
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Industrial Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Urban Mobility & Logistics
                </Link>
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Consumer Wearables
                </Link>
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Public Infrastructure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Coltium Industries. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;