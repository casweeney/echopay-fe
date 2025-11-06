import { Eye, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyCardProps {
  title: string;
  type: "Live" | "Test";
  apiKey: string;
  createdDate: string;
  lastUsedDate: string;
  onDelete: () => void;
}

export const ApiKeyCard = ({
  title,
  type,
  apiKey,
  createdDate,
  lastUsedDate,
  onDelete,
}: ApiKeyCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied successfully.",
    });
  };

  const displayKey = isVisible ? apiKey : apiKey.replace(/./g, "•  ");

  return (
    <div className="border border-[#E0E0E0] rounded-[8px] px-[12px] py-[8px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium tracking-[0.15px] align-middle text-[#010721]">
            {title}
          </h3>
          <Badge
            className={`${
              type === "Live"
                ? "bg-[#CDF4E4] text-[#0C614E]"
                : "bg-[#CDF0F4] text-[#0C4361]"
            } text-[11px] leading-[16px] tracking-[0.5px] align-middle font-medium py-[2px] px-[8px] rounded-[100px]`}
          >
            {type}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-[295px] h-[40px] flex items-center text-sm tracking-[0.25px] align-middle text-[#010721] bg-[#F2F2F2] px-[8px] py-[6px] rounded-[8px]">
            {displayKey}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(!isVisible)}
            aria-label={isVisible ? "Hide API key" : "Show API key"}
            className="w-8 h-8"
          >
            <Eye className="h-[24px] w-[24px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy API key"
            className="w-8 h-8"
          >
            <Copy className="h-[24px] w-[24px]" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive w-8 h-8"
          aria-label="Delete API key"
        >
          <Trash2 className="h-[24px] w-[24px]" />
        </Button>
      </div>

      <div className="flex gap-4 text-sm tracking-[0.25px] align-middle text-[#828783]">
        <span>Created {createdDate}</span>
        <span>Last used: {lastUsedDate}</span>
      </div>
    </div>
  );
};
