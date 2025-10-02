import React from "react";
import FeatureCard from "../FeatureCard";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      backgroundImage: "/bg-1.svg",
      badgeText: "Perfect for all business sizes",
      badgeBgColor: "#FED7AA",
      badgeTextColor: "#523009",
      title: "Sell Globally, Get paid instantly",
      description:
        "Whether you're a shop owner, food vendor, or freelancer - start accepting digital payments without any complicated setup.",
    },
    {
      backgroundImage: "/bg-2.svg",
      badgeText: "Multi-Currency Wallets",
      badgeBgColor: "#AAF8FE",
      badgeTextColor: "#12427C",
      title: "Create and manage wallets in multiple currencies",
      description:
        "Hold, convert, and disburse funds with real-time exchange rates and transparent pricing.",
      descriptionMaxWidth: "max-w-full sm:max-w-[600px]",
    },
    {
      backgroundImage: "/bg-3.svg",
      badgeText: "Secure API Keys",
      badgeBgColor: "#FF6666",
      badgeTextColor: "#571600",
      title: "Generate and manage API keys",
      description:
        "Enable enterprise-grade security with rate limiting and fraud protection needed for disbursement.",
      descriptionMaxWidth: "max-w-full sm:max-w-[600px]",
    },
  ];

  return (
    <section className="flex flex-col gap-8 sm:gap-12 lg:gap-[70px] px-4 sm:px-6 lg:px-4 pb-8 sm:pb-10 lg:pb-[40px] max-w-[85rem] mx-auto">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          backgroundImage={feature.backgroundImage}
          badgeText={feature.badgeText}
          badgeBgColor={feature.badgeBgColor}
          badgeTextColor={feature.badgeTextColor}
          title={feature.title}
          description={feature.description}
          descriptionMaxWidth={feature.descriptionMaxWidth}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;
