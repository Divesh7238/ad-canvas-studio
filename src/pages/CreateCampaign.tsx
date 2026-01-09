import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  ArrowRight,
  Image,
  Type,
  Palette,
  Target,
  Hash,
  ChevronDown,
  Instagram,
  Linkedin,
  RefreshCw,
  Download,
  Edit3,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const brandTones = [
  { value: "professional", label: "Professional", icon: "💼" },
  { value: "witty", label: "Witty & Fun", icon: "😄" },
  { value: "urgent", label: "Urgent", icon: "⚡" },
  { value: "inspirational", label: "Inspirational", icon: "✨" },
];

const platforms = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
];

const aspectRatios = [
  { value: "1:1", label: "Square (1:1)", desc: "Feed posts" },
  { value: "9:16", label: "Portrait (9:16)", desc: "Stories & Reels" },
  { value: "16:9", label: "Landscape (16:9)", desc: "LinkedIn posts" },
];

export default function CreateCampaign() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    image: string;
    caption: string;
    hashtags: string[];
  } | null>(null);
  const [selectedTone, setSelectedTone] = useState("professional");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedRatio, setSelectedRatio] = useState("1:1");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setGeneratedContent({
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
      caption: "Unlock your brand's full potential with cutting-edge solutions designed for modern businesses. Transform your workflow and drive exceptional results. 🚀",
      hashtags: ["#Innovation", "#Marketing", "#Growth", "#Business", "#Success"],
    });
    setIsGenerating(false);
  };

  return (
    <MainLayout title="Create Campaign" subtitle="Generate stunning ad creatives with AI">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Prompt Input */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <Wand2 className="w-5 h-5 text-primary" />
                Campaign Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe your ad creative</Label>
                <Textarea
                  id="prompt"
                  placeholder="E.g., A summer sale promotion for a fashion brand featuring vibrant colors, beach vibes, and 50% off messaging..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Be descriptive for better results. Mention colors, mood, and key messages.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <Palette className="w-5 h-5 text-accent" />
                Creative Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform */}
              <div className="space-y-2">
                <Label>Target Platform</Label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.value}
                      onClick={() => setSelectedPlatform(platform.value)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        selectedPlatform === platform.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <platform.icon className={`w-5 h-5 ${selectedPlatform === platform.value ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-medium ${selectedPlatform === platform.value ? 'text-primary' : 'text-foreground'}`}>
                        {platform.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select value={selectedRatio} onValueChange={setSelectedRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ratio.label}</span>
                          <span className="text-muted-foreground text-xs">- {ratio.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Tone */}
              <div className="space-y-2">
                <Label>Brand Voice</Label>
                <div className="grid grid-cols-2 gap-3">
                  {brandTones.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setSelectedTone(tone.value)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedTone === tone.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-xl">{tone.icon}</span>
                      <span className={`text-sm font-medium ${selectedTone === tone.value ? 'text-primary' : 'text-foreground'}`}>
                        {tone.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Text */}
              <div className="space-y-2">
                <Label htmlFor="cta">Call-to-Action Text</Label>
                <Input
                  id="cta"
                  placeholder="Shop Now, Learn More, Get Started..."
                  defaultValue="Shop Now"
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Creative...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Campaign
              </>
            )}
          </Button>
        </motion.div>

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <Image className="w-5 h-5 text-primary" />
                Generated Creative
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Image Preview */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src={generatedContent.image}
                      alt="Generated Creative"
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                        <Button size="sm" variant="secondary" className="shadow-lg">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit in Studio
                        </Button>
                        <Button size="sm" variant="secondary" className="shadow-lg">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Generated Caption
                      </Label>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                    <Textarea
                      value={generatedContent.caption}
                      className="min-h-[100px]"
                      readOnly
                    />
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Suggested Hashtags
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button variant="gradient" className="flex-1">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit in Studio
                    </Button>
                    <Button variant="accent" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-gradient-subtle rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Creative Generated Yet
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Enter your campaign prompt and configure settings to generate your first AI-powered ad creative.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-border/50 bg-gradient-subtle">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                Pro Tips
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Mention specific colors or moods for better visual results</li>
                <li>• Include your target audience for tailored messaging</li>
                <li>• Specify any text or offers you want highlighted</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
