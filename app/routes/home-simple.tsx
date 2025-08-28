import type { Route } from "./+types/home-simple";
import { 
  Leaf, 
  Calendar, 
  Trash2, 
  MapPin, 
  Route as RouteIcon, 
  Trophy, 
  BarChart3,
  ArrowRight,
  Recycle,
  Globe,
  Users
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EcoWaste Manager - Smart Waste Management System" },
    { name: "description", content: "Efficient waste management for urban areas with AI-powered sorting, route optimization, and gamified recycling." },
  ];
}

const features = [
  {
    name: "Smart Scheduling",
    description: "Schedule waste collection at your convenience, reducing unnecessary pickups.",
    icon: Calendar,
    href: "/schedule",
    color: "bg-green-500",
  },
  {
    name: "AI Waste Sorting",
    description: "Identify recyclable, organic, and non-recyclable items through image recognition.",
    icon: Trash2,
    href: "/sort",
    color: "bg-blue-500",
  },
  {
    name: "Recycling Hubs",
    description: "Locate nearby recycling centers and drop-off points in your area.",
    icon: MapPin,
    href: "/recycling-hubs",
    color: "bg-purple-500",
  },
  {
    name: "Route Optimization",
    description: "Optimize collection routes to reduce fuel consumption and emissions.",
    icon: RouteIcon,
    href: "/route-optimizer",
    color: "bg-orange-500",
  },
  {
    name: "Eco Rewards",
    description: "Earn points and badges for proper waste disposal and recycling habits.",
    icon: Trophy,
    href: "/rewards",
    color: "bg-yellow-500",
  },
  {
    name: "Analytics Dashboard",
    description: "Monitor waste generation, collection efficiency, and recycling rates.",
    icon: BarChart3,
    href: "/dashboard",
    color: "bg-red-500",
  },
];

const stats = [
  { name: "CO₂ Saved", value: "2.4M kg", icon: Globe },
  { name: "Active Users", value: "12.5K", icon: Users },
  { name: "Waste Recycled", value: "890K kg", icon: Recycle },
  { name: "Collection Efficiency", value: "94%", icon: BarChart3 },
];

export default function HomeSimple() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden mb-20">
        <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-16 lg:p-20">
          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <Leaf className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Smart Waste Management
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">for Sustainable Cities</span>
            </h1>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200 mb-12 max-w-4xl mx-auto font-light">
              Transform your city's waste management with <span className="font-semibold text-green-600 dark:text-green-400">AI-powered sorting</span>, 
              optimized collection routes, and <span className="font-semibold text-blue-600 dark:text-blue-400">gamified recycling programs</span>. 
              Join <span className="font-bold text-emerald-600 dark:text-emerald-400">12.5K+ users</span> making their communities cleaner and greener.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/schedule"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center"
              >
                Get Started Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </a>
              
              <a
                href="/dashboard"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center"
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                View Analytics
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">94% Collection Efficiency</span>
              </div>
              <div className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-green-500" />
                <span className="font-medium">890K kg Recycled</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="font-medium">2.4M kg CO₂ Saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200"
            >
              <stat.icon className="mx-auto h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Waste Management Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From smart sorting to route optimization, our platform provides all the tools you need for efficient waste management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {feature.description}
              </p>
              <a
                href={feature.href}
                className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 group-hover:translate-x-2 transition-all duration-200"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Waste Management?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already making their communities cleaner and more sustainable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/schedule"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Start Free Trial
            </a>
            <a
              href="/dashboard"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
