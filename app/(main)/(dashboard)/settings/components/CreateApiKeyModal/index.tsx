import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateKey: (business_id: string, name: string) => void;
}

export const CreateApiKeyDialog = ({
  open,
  onOpenChange,
  onCreateKey,
}: CreateApiKeyDialogProps) => {
  const { business } = useSelector((state: RootState) => state.business);
  const { loading } = useSelector((state: RootState) => state.apiKey);

  const [keyName, setKeyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyName && business?.id) {
      onCreateKey(business.id, keyName);
      setKeyName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] !font-instrument">
        <DialogHeader>
          <DialogTitle className="text-[22px] leading-[24px] tracking-[0px] font-medium text-[#010721]">
            Create New API Key
          </DialogTitle>
          <DialogDescription className="text-base tracking-[0.5] text-[#404040] pt-2">
            Generate a new API key for your integration
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div>
            <fieldset className="group border border-[#828783] rounded-lg px-2 py-0 focus-within:ring-[1.5px] hover:border-[#3b3b3b] focus-within:ring-[#0046A7] transition-all">
              <legend className="group-focus-within:text-[#0046A7] font-[400] bg-[#f8f8f8] text-[#031300] px-1 text-[12px] leading-[100%] font-instrument">
                Key Name
              </legend>
              <Input
                name="keyName"
                id="keyName"
                placeholder="E.g., My App API Key"
                value={keyName}
                onChange={(e) => {
                  setKeyName(e.target.value);
                }}
                className="font-instrument border-0 px-2 pb-4 pt-2 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] bg-transparent placeholder:text-[#828783] placeholder:font-instrument"
              />
            </fieldset>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-base bg-[#0046A7] hover:bg-[#0046A7] text-white"
            disabled={!keyName || !business?.id || loading}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin border-2 border-white rounded-full border-t-transparent"></span>
            ) : (
              "Create Key"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
