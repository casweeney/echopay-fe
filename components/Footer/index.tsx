import { ECHOPAY_SVG } from "@/assets/svgs";
import { Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

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
    <footer className="bg-[#010721] text-gray-400 py-8 md:py-16 px-4 md:px-6 font-inter border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Logo and Social Section */}
          <div className="lg:col-span-1 col-span-2 md:col-span-1">
            <Link href="/">{ECHOPAY_SVG().resolvaTwo()}</Link>
            <p className="text-xs md:text-sm tracking-[-0.15px] font-normal text-[#99A1AF] mt-3 md:mt-4 mb-4 md:mb-6 line-clamp-3">
              Simplifying disbursements for modern businesses
            </p>
            <div className="flex gap-2 md:gap-3">
              <a
                href="https://x.com/resolvahq?s=21"
                target="_blank"
                className="w-8 h-8 md:w-[36px] md:h-[36px] bg-[#FFFFFF1A] rounded-lg md:rounded-[12px] flex items-center justify-center hover:bg-[#252A3A] transition-colors flex-shrink-0"
              >
                <Twitter className="w-3 h-3 md:w-4 md:h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/resolvahq/about/?viewAsMember=true"
                target="_blank"
                className="w-8 h-8 md:w-[36px] md:h-[36px] bg-[#FFFFFF1A] rounded-lg md:rounded-[12px] flex items-center justify-center hover:bg-[#252A3A] transition-colors flex-shrink-0"
              >
                <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-[36px] md:h-[36px] bg-[#FFFFFF1A] rounded-lg md:rounded-[12px] flex items-center justify-center hover:bg-[#252A3A] transition-colors flex-shrink-0"
              >
                <Github className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-normal text-sm md:text-base tracking-[-0.31px] mb-3 md:mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="tracking-[-0.15px] font-normal text-xs md:text-sm text-[#99A1AF] hover:text-white transition-colors"
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
        <div className="pt-6 md:pt-8 border-t border-[#FFFFFF1A] flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm tracking-[-0.15px] font-normal text-[#99A1AF] text-center sm:text-left">
            © {new Date().getFullYear()} Resolva. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6 text-center sm:text-left">
            <a
              href="#"
              className="text-xs md:text-sm tracking-[-0.15px] font-normal text-[#99A1AF] hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs md:text-sm tracking-[-0.15px] font-normal text-[#99A1AF] hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-xs md:text-sm tracking-[-0.15px] font-normal text-[#99A1AF] hover:text-white transition-colors"
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
