
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TemplateHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPersonalization: () => void;
}

const TemplateHelpModal = ({ isOpen, onClose, onStartPersonalization }: TemplateHelpModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center py-8">
          {/* Illustration */}
          <div className="mb-6 relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <div className="relative">
                {/* Resume stack illustration */}
                <div className="w-16 h-20 bg-white rounded shadow-lg transform -rotate-6 absolute -left-2"></div>
                <div className="w-16 h-20 bg-orange-400 rounded shadow-lg transform rotate-3 absolute left-1"></div>
                <div className="w-16 h-20 bg-teal-500 rounded shadow-lg transform rotate-12 relative"></div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-8 w-6 h-6 bg-orange-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-8 left-4 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
            <div className="absolute top-12 left-12">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-400">
                <path d="M10 0L12.9389 6.90983L20 10L12.9389 13.0902L10 20L7.06107 13.0902L0 10L7.06107 6.90983L10 0Z" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Need help choosing a template?
          </h2>
          <p className="text-gray-600 mb-8">
            We'll personalize your template choices in 4 easy steps.
          </p>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Skip
            </Button>
            <Button
              onClick={onStartPersonalization}
              className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Let's go
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateHelpModal;
