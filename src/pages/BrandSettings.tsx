import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Palette,
  Image,
  Type,
  Globe,
  Bell,
  Shield,
  Upload,
  Trash2,
  Check,
  Save,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const brandColors = [
  { name: "Primary", value: "#0EA5E9", variable: "--primary" },
  { name: "Secondary", value: "#F97316", variable: "--accent" },
  { name: "Background", value: "#F8FAFC", variable: "--background" },
  { name: "Text", value: "#1E293B", variable: "--foreground" },
];

const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "poppins", label: "Poppins" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "montserrat", label: "Montserrat" },
];

export default function BrandSettings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <MainLayout title="Brand Settings" subtitle="Configure your brand identity for consistent creatives">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="bg-card border border-border p-1">
            <TabsTrigger value="brand" className="gap-2">
              <Palette className="w-4 h-4" />
              Brand Identity
            </TabsTrigger>
            <TabsTrigger value="assets" className="gap-2">
              <Image className="w-4 h-4" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="defaults" className="gap-2">
              <Settings className="w-4 h-4" />
              Defaults
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Brand Identity Tab */}
          <TabsContent value="brand" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Info */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-display">
                    <Globe className="w-5 h-5 text-primary" />
                    Company Information
                  </CardTitle>
                  <CardDescription>
                    Basic details about your brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" defaultValue="Innovation for Tomorrow" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Brand Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="Leading provider of innovative solutions that transform businesses and empower teams worldwide."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://acme.com" />
                  </div>
                </CardContent>
              </Card>

              {/* Colors */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-display">
                    <Palette className="w-5 h-5 text-accent" />
                    Brand Colors
                  </CardTitle>
                  <CardDescription>
                    Define your brand color palette
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {brandColors.map((color) => (
                    <div key={color.name} className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl border-2 border-border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color.value }}
                      />
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{color.name}</Label>
                        <Input
                          defaultValue={color.value}
                          className="mt-1 h-9 font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Typography */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-display">
                    <Type className="w-5 h-5 text-primary" />
                    Typography
                  </CardTitle>
                  <CardDescription>
                    Choose fonts for your creatives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Heading Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Body Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <p className="text-2xl font-display font-bold mb-2">Heading Preview</p>
                    <p className="text-muted-foreground">
                      This is how your body text will appear in generated creatives.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Voice & Tone */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-display">
                    <Shield className="w-5 h-5 text-accent" />
                    Brand Voice
                  </CardTitle>
                  <CardDescription>
                    Set the default tone for generated copy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Tone</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">💼 Professional</SelectItem>
                        <SelectItem value="witty">😄 Witty & Fun</SelectItem>
                        <SelectItem value="urgent">⚡ Urgent</SelectItem>
                        <SelectItem value="inspirational">✨ Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Brand Keywords</Label>
                    <Textarea
                      id="keywords"
                      placeholder="innovative, reliable, modern, trustworthy..."
                      className="min-h-[80px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Words that should appear frequently in generated copy
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avoid">Words to Avoid</Label>
                    <Textarea
                      id="avoid"
                      placeholder="cheap, basic, limited..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-display">Brand Logo</CardTitle>
                  <CardDescription>
                    Upload your logo for automatic overlay on creatives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      logoPreview ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    {logoPreview ? (
                      <div className="relative inline-block">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="max-h-32 mx-auto"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 w-6 h-6"
                          onClick={() => setLogoPreview(null)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input type="file" className="hidden" accept="image/*" />
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground">
                          Click to upload logo
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, SVG, or JPG (max 2MB)
                        </p>
                      </label>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Logo Position</Label>
                    <Select defaultValue="top-left">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Default CTA */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-display">Default CTA</CardTitle>
                  <CardDescription>
                    Set your default call-to-action styling
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default CTA Text</Label>
                    <Input defaultValue="Shop Now" />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA Style</Label>
                    <Select defaultValue="rounded">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="pill">Pill</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl flex items-center justify-center">
                    <div className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold">
                      Shop Now
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Defaults Tab */}
          <TabsContent value="defaults" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-display">Generation Defaults</CardTitle>
                <CardDescription>
                  Set default values for new campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Platform</Label>
                    <Select defaultValue="instagram">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Default Aspect Ratio</Label>
                    <Select defaultValue="1:1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">Square (1:1)</SelectItem>
                        <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                        <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Hashtags</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 hashtags</SelectItem>
                        <SelectItem value="5">5 hashtags</SelectItem>
                        <SelectItem value="10">10 hashtags</SelectItem>
                        <SelectItem value="15">15 hashtags</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image Quality</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-apply Logo</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically overlay logo on all generated images
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-add CTA</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically add CTA button to creatives
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Generate A/B Variants</Label>
                      <p className="text-sm text-muted-foreground">
                        Create 3 variants for each campaign
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-display">Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Campaign Completed</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when a campaign finishes generating
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly report of your campaigns
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Usage Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when approaching usage limits
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      New features and improvements
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-end mt-8"
        >
          <Button
            variant="gradient"
            size="lg"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
