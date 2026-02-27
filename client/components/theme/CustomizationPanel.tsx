import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  FontPreset,
  ThemePreset,
  useCustomization,
} from "./CustomizationProvider";

export default function CustomizationPanel() {
  const {
    themePreset,
    primaryHue,
    radius,
    contrastBoost,
    compactMode,
    glowEffects,
    fontPreset,
    updateSetting,
    reset,
  } = useCustomization();

  return (
    <Card className="bg-card/80 border-white/10">
      <CardHeader>
        <CardTitle>Customization Studio</CardTitle>
        <CardDescription>
          Personalize colors, spacing, typography and visual intensity in real
          time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2">
          <Label>Theme preset</Label>
          <Select
            value={themePreset}
            onValueChange={(value) =>
              updateSetting("themePreset", value as ThemePreset)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pitch">Pitch Green</SelectItem>
              <SelectItem value="midnight">Midnight</SelectItem>
              <SelectItem value="sunset">Sunset</SelectItem>
              <SelectItem value="ocean">Ocean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Accent hue ({primaryHue})</Label>
          <Slider
            min={0}
            max={360}
            step={1}
            value={[primaryHue]}
            onValueChange={([value]) => updateSetting("primaryHue", value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Corner radius ({radius.toFixed(2)}rem)</Label>
          <Slider
            min={0.25}
            max={1.5}
            step={0.05}
            value={[radius]}
            onValueChange={([value]) => updateSetting("radius", value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Font family</Label>
          <Select
            value={fontPreset}
            onValueChange={(value) =>
              updateSetting("fontPreset", value as FontPreset)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chakra">Chakra Petch</SelectItem>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="system">System UI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <ToggleRow
            title="High contrast"
            checked={contrastBoost}
            onCheckedChange={(checked) => updateSetting("contrastBoost", checked)}
          />
          <ToggleRow
            title="Compact mode"
            checked={compactMode}
            onCheckedChange={(checked) => updateSetting("compactMode", checked)}
          />
          <ToggleRow
            title="Glow effects"
            checked={glowEffects}
            onCheckedChange={(checked) => updateSetting("glowEffects", checked)}
          />
        </div>

        <Button variant="outline" className="w-full" onClick={reset}>
          Reset defaults
        </Button>
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  title,
  checked,
  onCheckedChange,
}: {
  title: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2">
      <Label>{title}</Label>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
