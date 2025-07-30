import { Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { invoiceThemes, getThemeById } from '@/types/themes';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector = ({ selectedTheme, onThemeChange }: ThemeSelectorProps) => {
  const currentTheme = getThemeById(selectedTheme);

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Palette className="h-5 w-5" />
        Invoice Theme
      </h3>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Choose a theme that matches your brand and style preferences.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {invoiceThemes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              variant={selectedTheme === theme.id ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center gap-2 ${
                selectedTheme === theme.id 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              <div className="text-2xl">{theme.preview}</div>
              <div className="text-center">
                <div className="font-medium text-sm">{theme.name}</div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-1">Current Theme:</div>
          <div className="text-sm text-muted-foreground">
            {currentTheme.name} - {currentTheme.description}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSelector;