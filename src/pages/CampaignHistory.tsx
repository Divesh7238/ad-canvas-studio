import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  Download,
  Copy,
  Edit3,
  Trash2,
  MoreHorizontal,
  Calendar,
  Instagram,
  Linkedin,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    id: 1,
    name: "Summer Sale Launch",
    prompt: "Vibrant summer sale promotion with beach vibes and 50% off messaging",
    platform: "Instagram",
    status: "completed",
    createdAt: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop",
    impressions: "12.5K",
    engagement: "8.2%",
  },
  {
    id: 2,
    name: "Product Feature Highlight",
    prompt: "Professional product showcase with clean minimalist background",
    platform: "LinkedIn",
    status: "completed",
    createdAt: "2024-01-14",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
    impressions: "8.3K",
    engagement: "5.4%",
  },
  {
    id: 3,
    name: "Brand Awareness Week",
    prompt: "Creative brand storytelling with emotional connection themes",
    platform: "Instagram",
    status: "in_progress",
    createdAt: "2024-01-13",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    impressions: "-",
    engagement: "-",
  },
  {
    id: 4,
    name: "Holiday Special Promo",
    prompt: "Festive holiday campaign with warm colors and gift messaging",
    platform: "Instagram",
    status: "completed",
    createdAt: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=400&fit=crop",
    impressions: "25.1K",
    engagement: "12.1%",
  },
  {
    id: 5,
    name: "New Feature Announcement",
    prompt: "Tech-forward announcement with futuristic design elements",
    platform: "LinkedIn",
    status: "completed",
    createdAt: "2024-01-08",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
    impressions: "15.7K",
    engagement: "7.8%",
  },
  {
    id: 6,
    name: "Customer Testimonial",
    prompt: "Authentic customer success story with real photo integration",
    platform: "Instagram",
    status: "completed",
    createdAt: "2024-01-05",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    impressions: "9.2K",
    engagement: "6.3%",
  },
];

export default function CampaignHistory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Campaign History" subtitle="View and manage your past campaigns">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Filters Bar */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="card-hover border-border/50 overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={campaign.thumbnail}
                      alt={campaign.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary" className="flex-1">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="secondary" className="flex-1">
                          <Edit3 className="w-3.5 h-3.5 mr-1" />
                          Remix
                        </Button>
                      </div>
                    </div>
                    {/* Platform Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                        {campaign.platform === "Instagram" ? (
                          <Instagram className="w-3 h-3 mr-1" />
                        ) : (
                          <Linkedin className="w-3 h-3 mr-1" />
                        )}
                        {campaign.platform}
                      </Badge>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={campaign.status === "completed" ? "default" : "secondary"}
                        className={
                          campaign.status === "completed"
                            ? "bg-success text-success-foreground"
                            : "bg-warning text-warning-foreground"
                        }
                      >
                        {campaign.status === "completed" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {campaign.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground truncate flex-1">
                        {campaign.name}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8 -mr-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Remix Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download Assets
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {campaign.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </span>
                      {campaign.status === "completed" && (
                        <span className="text-primary font-medium">
                          {campaign.impressions} views
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-border/50">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <img
                      src={campaign.thumbnail}
                      alt={campaign.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {campaign.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {campaign.prompt}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">{campaign.impressions}</p>
                        <p className="text-xs text-muted-foreground">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">{campaign.engagement}</p>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {campaign.platform === "Instagram" ? (
                        <Instagram className="w-3 h-3 mr-1" />
                      ) : (
                        <Linkedin className="w-3 h-3 mr-1" />
                      )}
                      {campaign.platform}
                    </Badge>
                    <Badge
                      variant={campaign.status === "completed" ? "default" : "secondary"}
                      className={
                        campaign.status === "completed"
                          ? "bg-success/10 text-success border-success/30"
                          : "bg-warning/10 text-warning border-warning/30"
                      }
                    >
                      {campaign.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                    <span className="text-sm text-muted-foreground hidden lg:block">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Remix Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gradient-subtle rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
}
