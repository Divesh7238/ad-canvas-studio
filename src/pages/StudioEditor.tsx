import { useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Move,
  Type,
  Image,
  Layers,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Copy,
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Save,
  Eye,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const tools = [
  { icon: Move, label: "Select", id: "select" },
  { icon: Type, label: "Text", id: "text" },
  { icon: Image, label: "Image", id: "image" },
  { icon: Layers, label: "Layers", id: "layers" },
];

const sampleLayers = [
  { id: 1, name: "Background Image", type: "image", visible: true },
  { id: 2, name: "Logo", type: "image", visible: true },
  { id: 3, name: "Headline Text", type: "text", visible: true },
  { id: 4, name: "CTA Button", type: "shape", visible: true },
];

export default function StudioEditor() {
  const [activeTool, setActiveTool] = useState("select");
  const [zoom, setZoom] = useState(100);
  const [opacity, setOpacity] = useState([100]);

  return (
    <MainLayout title="Studio Editor" subtitle="Fine-tune your ad creatives with precision">
      <div className="flex gap-4 h-[calc(100vh-160px)]">
        {/* Left Toolbar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-16 flex flex-col items-center py-4 bg-card rounded-xl border border-border/50 shadow-sm"
        >
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center mb-2 transition-all ${
                activeTool === tool.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
          <Separator className="my-2 w-8" />
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <Undo className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <Redo className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Canvas Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-secondary/30 rounded-xl border border-border/50 overflow-hidden flex flex-col"
        >
          {/* Canvas Toolbar */}
          <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Grid className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setZoom(Math.max(25, zoom - 25))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="gradient" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div
              className="bg-card rounded-lg shadow-xl overflow-hidden relative"
              style={{
                width: `${400 * (zoom / 100)}px`,
                height: `${400 * (zoom / 100)}px`,
              }}
            >
              {/* Sample Canvas Content */}
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop"
                alt="Canvas"
                className="w-full h-full object-cover"
              />
              
              {/* Logo Overlay */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center cursor-move border-2 border-transparent hover:border-primary/50">
                <span className="text-2xl font-bold text-primary">A</span>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-16 left-4 right-4 text-center cursor-move">
                <h3 className="text-2xl font-bold text-primary-foreground drop-shadow-lg">
                  Summer Sale
                </h3>
                <p className="text-primary-foreground/90 text-sm drop-shadow-md">
                  Up to 50% Off
                </p>
              </div>

              {/* CTA Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-move">
                <div className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-semibold shadow-lg text-sm">
                  Shop Now
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-72"
        >
          <Card className="h-full border-border/50 overflow-hidden flex flex-col">
            <Tabs defaultValue="properties" className="flex-1 flex flex-col">
              <TabsList className="w-full grid grid-cols-2 p-1 m-2">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="layers">Layers</TabsTrigger>
              </TabsList>

              <TabsContent value="properties" className="flex-1 p-4 pt-0 overflow-auto space-y-6">
                {/* Position */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Position
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">X</Label>
                      <Input type="number" defaultValue="24" className="h-9" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Y</Label>
                      <Input type="number" defaultValue="16" className="h-9" />
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Size
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Width</Label>
                      <Input type="number" defaultValue="200" className="h-9" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Height</Label>
                      <Input type="number" defaultValue="48" className="h-9" />
                    </div>
                  </div>
                </div>

                {/* Opacity */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Opacity
                    </Label>
                    <span className="text-xs text-muted-foreground">{opacity[0]}%</span>
                  </div>
                  <Slider
                    value={opacity}
                    onValueChange={setOpacity}
                    max={100}
                    step={1}
                  />
                </div>

                {/* Typography */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Typography
                  </Label>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Bold className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Italic className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Underline className="w-3.5 h-3.5" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1" />
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignLeft className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignCenter className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="layers" className="flex-1 p-4 pt-0 overflow-auto">
                <div className="space-y-2">
                  {sampleLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${layer.type === 'image' ? 'bg-primary/10' : layer.type === 'text' ? 'bg-accent/10' : 'bg-secondary'} flex items-center justify-center`}>
                        {layer.type === 'image' && <Image className="w-4 h-4 text-primary" />}
                        {layer.type === 'text' && <Type className="w-4 h-4 text-accent" />}
                        {layer.type === 'shape' && <Layers className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <span className="text-sm font-medium flex-1 truncate">{layer.name}</span>
                      <Button variant="ghost" size="icon" className="w-6 h-6 opacity-0 group-hover:opacity-100">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
