import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Wand2,
  Image,
  Type,
  Palette,
  Target,
  Hash,
  Instagram,
  Linkedin,
  RefreshCw,
  Download,
  Edit3,
  Save,
  Copy,
  Check,
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    image: string;
    caption: string;
    hashtags: string[];
    enhancedPrompt: string;
  } | null>(null);
  const [selectedTone, setSelectedTone] = useState("professional");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a campaign prompt");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-campaign", {
        body: {
          prompt,
          platform: selectedPlatform,
          brandTone: selectedTone,
          ctaText,
        },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedContent({
        image: data.data.imageUrl,
        caption: data.data.caption,
        hashtags: data.data.hashtags,
        enhancedPrompt: data.data.enhancedPrompt,
      });

      toast.success("Campaign generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate campaign");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCampaign = async () => {
    if (!generatedContent || !user) {
      toast.error("Please generate content first");
      return;
    }

    const name = campaignName.trim() || `Campaign ${new Date().toLocaleDateString()}`;
    setIsSaving(true);

    try {
      const { error } = await supabase.from("campaigns").insert({
        user_id: user.id,
        name,
        prompt,
        enhanced_prompt: generatedContent.enhancedPrompt,
        platform: selectedPlatform,
        aspect_ratio: selectedRatio,
        brand_tone: selectedTone,
        cta_text: ctaText,
        generated_image_url: generatedContent.image,
        generated_caption: generatedContent.caption,
        generated_hashtags: generatedContent.hashtags,
        status: "completed",
      });

      if (error) throw error;
      toast.success("Campaign saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save campaign");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyCaption = () => {
    if (generatedContent) {
      const fullText = `${generatedContent.caption}\n\n${generatedContent.hashtags.join(" ")}`;
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      toast.success("Caption copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
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
          {/* Campaign Name */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-display">
                <Edit3 className="w-5 h-5 text-primary" />
                Campaign Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="E.g., Summer Sale 2024"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </CardContent>
          </Card>

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
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
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
                        <Link to="/studio">
                          <Button size="sm" variant="secondary" className="shadow-lg">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit in Studio
                          </Button>
                        </Link>
                        <a href={generatedContent.image} download="campaign-creative.png" target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary" className="shadow-lg">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
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
                      <Button variant="ghost" size="sm" onClick={handleCopyCaption}>
                        {copied ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <Copy className="w-3 h-3 mr-1" />
                        )}
                        {copied ? "Copied!" : "Copy All"}
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
                    <Button
                      variant="gradient"
                      className="flex-1"
                      onClick={handleSaveCampaign}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Campaign
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-gradient-subtle rounded-2xl flex items-center justify-center mb-4">
                    {isGenerating ? (
                      <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                    ) : (
                      <Sparkles className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {isGenerating ? "Generating Your Creative..." : "No Creative Generated Yet"}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    {isGenerating
                      ? "AI is crafting your perfect ad. This may take a moment."
                      : "Enter your campaign prompt and configure settings to generate your first AI-powered ad creative."}
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
