import React from "react";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  backgroundImage: string;
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor: string;
  title: string;
  description: string;
  descriptionMaxWidth?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  backgroundImage,
  badgeText,
  badgeBgColor,
  badgeTextColor,
  title,
  description,
  descriptionMaxWidth = "max-w-[90%] sm:max-w-[80%] lg:max-w-[800px]",
}) => {
  return (
    <div className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover sm:bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-[32px]"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute rounded-2xl lg:rounded-[32px] inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-[35px] left-4 sm:left-6 lg:left-[35px] right-4 sm:right-6 lg:right-[35px] flex flex-col gap-2 sm:gap-3 lg:gap-[10px]">
        <div>
          <Badge
            className="rounded-[72.35px] py-[6px] px-[10px] font-[500] text-xs sm:text-sm lg:text-[14px] leading-[130%] tracking-[-2%] font-dmsans border-0"
            style={{
              backgroundColor: badgeBgColor,
              color: badgeTextColor,
            }}>
            {badgeText}
          </Badge>
        </div>
        <h2 className="text-[#F4F4F5] font-display text-xl sm:text-2xl lg:text-[30px] font-[500]">
          {title}
        </h2>
        <p
          className={`font-dmsans font-[500] text-sm sm:text-base lg:text-[16px] leading-[145%] tracking-[-2%] text-[#CECDD7] ${descriptionMaxWidth}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
