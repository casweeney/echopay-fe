import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DisbursementSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  currency: string;
  merchantReference: string;
  transactionReference: string;
  onViewAll: () => void;
}

const DisbursementSuccessDialog = ({
  open,
  onOpenChange,
  amount,
  currency,
  merchantReference,
  transactionReference,
  onViewAll,
}: DisbursementSuccessDialogProps) => {
  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground text-left">
            Disbursement Successful!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-12 h-12 text-white stroke-[3]" />
          </div>

          {/* Success Message */}
          <p className="text-center text-muted-foreground">
            Your disbursement has been initiated successfully
          </p>

          {/* Amount */}
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              {currency.toUpperCase()} {amount}
            </p>
          </div>

          {/* Merchant Reference */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Merchant Reference</p>
            <p className="text-lg font-semibold text-foreground">
              {merchantReference}
            </p>
          </div>

          {/* Transaction Reference */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              Transaction Reference
            </p>
            <p className="text-lg font-semibold text-foreground">
              {transactionReference}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handlePrintReceipt}
            className="flex-1 h-12"
          >
            Print Receipt
          </Button>
          <Button
            onClick={onViewAll}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
          >
            View All Disbursement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisbursementSuccessDialog;
