import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Image,
  FileText,
  Sparkles,
  ArrowRight,
  BarChart3,
  Layers,
  Clock,
  CheckCircle2,
  Palette,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statsData = [
  {
    label: "Campaigns Created",
    value: "24",
    change: "+12%",
    icon: Layers,
    color: "primary",
  },
  {
    label: "Images Generated",
    value: "156",
    change: "+28%",
    icon: Image,
    color: "accent",
  },
  {
    label: "Captions Written",
    value: "89",
    change: "+15%",
    icon: FileText,
    color: "success",
  },
  {
    label: "Time Saved",
    value: "48h",
    change: "+35%",
    icon: Clock,
    color: "primary",
  },
];

const recentCampaigns = [
  {
    id: 1,
    name: "Summer Sale Launch",
    platform: "Instagram",
    status: "completed",
    createdAt: "2 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Product Feature Highlight",
    platform: "LinkedIn",
    status: "in_progress",
    createdAt: "5 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Brand Awareness Week",
    platform: "Instagram",
    status: "completed",
    createdAt: "1 day ago",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
  },
];

const quickActions = [
  {
    title: "Generate Ad Creative",
    description: "Create stunning visuals with AI",
    icon: Sparkles,
    href: "/create",
    gradient: "bg-gradient-primary",
  },
  {
    title: "Edit in Studio",
    description: "Fine-tune your creatives",
    icon: Palette,
    href: "/studio",
    gradient: "bg-gradient-accent",
  },
  {
    title: "View Analytics",
    description: "Track campaign performance",
    icon: BarChart3,
    href: "/history",
    gradient: "bg-gradient-subtle",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard" subtitle="Welcome back! Here's your campaign overview.">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="card-hover border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center mt-2 text-xs">
                      <TrendingUp className="w-3 h-3 text-success mr-1" />
                      <span className="text-success font-medium">{stat.change}</span>
                      <span className="text-muted-foreground ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color === 'accent' ? 'bg-accent/10' : stat.color === 'success' ? 'bg-success/10' : 'bg-primary/10'} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color === 'accent' ? 'text-accent' : stat.color === 'success' ? 'text-success' : 'text-primary'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="card-hover border-border/50 cursor-pointer group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${action.gradient} flex items-center justify-center shadow-md`}>
                        <action.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-display">Recent Campaigns</CardTitle>
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <img
                      src={campaign.thumbnail}
                      alt={campaign.name}
                      className="w-14 h-14 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {campaign.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {campaign.platform} • {campaign.createdAt}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {campaign.status === "completed" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {campaign.status === "completed" ? "Completed" : "In Progress"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Usage Stats */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Image Generations</span>
                    <span className="font-medium text-foreground">156 / 200</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Caption Generations</span>
                    <span className="font-medium text-foreground">89 / 150</span>
                  </div>
                  <Progress value={59} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="font-medium text-foreground">1,245 / 2,000</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="outline" className="w-full">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-subtle border-border/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            <CardContent className="p-8 relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Ready to create your next viral ad?
                  </h3>
                  <p className="text-muted-foreground max-w-lg">
                    Transform your ideas into stunning social media creatives in seconds with the power of AI.
                  </p>
                </div>
                <Link to="/create">
                  <Button variant="hero" size="xl">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Creating
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
