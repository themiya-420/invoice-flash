import { useState } from 'react';
import { Upload, X, Image, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface LogoUploadProps {
  onLogoChange: (logoUrl: string | undefined) => void;
  currentLogo?: string;
}

const LogoUpload = ({ onLogoChange, currentLogo }: LogoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onLogoChange(result);
        toast({
          title: "Logo uploaded",
          description: "Your business logo has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!currentLogo) return;

    setIsRemovingBg(true);
    try {
      // Convert data URL to blob
      const response = await fetch(currentLogo);
      const blob = await response.blob();
      
      // Load image
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Convert back to data URL
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onLogoChange(result);
        toast({
          title: "Background removed",
          description: "Logo background has been removed successfully.",
        });
      };
      reader.readAsDataURL(processedBlob);
    } catch (error) {
      toast({
        title: "Background removal failed",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRemovingBg(false);
    }
  };

  const removeLogo = () => {
    onLogoChange(undefined);
    toast({
      title: "Logo removed",
      description: "Your business logo has been removed.",
    });
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Image className="h-5 w-5" />
          Business Logo
        </h3>
        
        {currentLogo ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={currentLogo}
                alt="Business Logo"
                className="max-h-32 mx-auto object-contain bg-white rounded-lg border border-border p-2"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={handleRemoveBackground}
                disabled={isRemovingBg}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {isRemovingBg ? 'Removing...' : 'Remove Background'}
              </Button>
              <Button
                onClick={removeLogo}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Remove Logo
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Upload your business logo for a professional look
              </p>
              <div>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  disabled={isUploading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isUploading ? 'Uploading...' : 'Choose Logo'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supports PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LogoUpload;