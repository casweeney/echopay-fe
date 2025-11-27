import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Get Started", href: "#" },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Integrations", href: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "API Documentation", href: "#" },
        { label: "SDKs", href: "#" },
        { label: "Webhooks", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Compliance", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Contact Support", href: "#" },
        { label: "System Status", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#010721] text-gray-400 py-16 px-6 font-inter border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Social Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/logo_2.png" alt="logo" className="w-[117px]" />
            </div>
            <p className="text-sm tracking-[-0.15px] font-normal text-[#99A1AF] mb-6">
              Simplifying disbursements for modern businesses
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-[36px] h-[36px] bg-[#FFFFFF1A] rounded-[12px] flex items-center justify-center hover:bg-[#252A3A] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-[36px] h-[36px] bg-[#FFFFFF1A] rounded-[12px] flex items-center justify-center hover:bg-[#252A3A] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-[36px] h-[36px] bg-[#FFFFFF1A] rounded-[12px] flex items-center justify-center hover:bg-[#252A3A] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-normal text-base tracking-[-0.31px] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="tracking-[-0.15px] font-normal text-[#99A1AF] text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFFFFF1A] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm tracking-[-0.15px] font-normal text-[#99A1AF]">
            © {new Date().getFullYear()} Echopay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm tracking-[-0.15px] font-normal text-[#99A1AF]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm tracking-[-0.15px] font-normal text-[#99A1AF]"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm tracking-[-0.15px] font-normal text-[#99A1AF]"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
