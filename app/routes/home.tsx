import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import SmartImage from "../components/SmartImage";
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
    image: "/images/features/smart-scheduling.svg",
    imageAlt: "Smart scheduling interface showing calendar with pickup times and mobile notifications"
  },
  {
    name: "AI Waste Sorting",
    description: "Identify recyclable, organic, and non-recyclable items through image recognition.",
    icon: Trash2,
    href: "/sort",
    color: "bg-blue-500",
    image: "/images/features/ai-sorting.svg",
    imageAlt: "AI-powered waste classification system analyzing plastic, organic and metal items"
  },
  {
    name: "Recycling Hubs",
    description: "Locate nearby recycling centers and drop-off points in your area.",
    icon: MapPin,
    href: "/recycling-hubs",
    color: "bg-purple-500",
    image: "/images/features/recycling-hubs.svg",
    imageAlt: "Map showing nearby recycling centers and drop-off locations"
  },
  {
    name: "Route Optimization",
    description: "Optimize collection routes to reduce fuel consumption and emissions.",
    icon: RouteIcon,
    href: "/route-optimizer",
    color: "bg-orange-500",
    image: "/images/features/route-optimization.svg",
    imageAlt: "Optimized collection routes displayed on map with waste trucks and efficiency metrics"
  },
  {
    name: "Eco Rewards",
    description: "Earn points and badges for proper waste disposal and recycling habits.",
    icon: Trophy,
    href: "/rewards",
    color: "bg-yellow-500",
    image: "/images/features/eco-rewards.svg",
    imageAlt: "Gamification rewards system showing points, badges and leaderboard"
  },
  {
    name: "Analytics Dashboard",
    description: "Monitor waste generation, collection efficiency, and recycling rates.",
    icon: BarChart3,
    href: "/dashboard",
    color: "bg-red-500",
    image: "/images/features/analytics.svg",
    imageAlt: "Analytics dashboard with charts showing waste metrics and environmental impact"
  },
];

const stats = [
  { name: "CO₂ Saved", value: "2.4M kg", icon: Globe },
  { name: "Active Users", value: "12.5K", icon: Users },
  { name: "Waste Recycled", value: "890K kg", icon: Recycle },
  { name: "Collection Efficiency", value: "94%", icon: BarChart3 },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-md z-50 font-medium"
      >
        Skip to main content
      </a>
      {/* Hero Section */}
      <motion.section 
        id="main-content"
        aria-labelledby="hero-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden mb-20"
      >
        <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-16 lg:p-20 overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <SmartImage 
              src="/images/hero/hero-recycling.svg" 
              alt="Smart waste management community with recycling bins, people sorting waste, and eco-friendly technology" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-15"
              priority={true}
            />
          </div>
          
          {/* Background decoration layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 dark:from-green-400/10 dark:to-blue-400/10"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-lg animate-float"></div>
          
          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto h-24 w-24 gradient-bg rounded-full flex items-center justify-center mb-8 shadow-lg hover-glow animate-bounce-subtle"
            >
              <Leaf className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1 
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Smart Waste Management
              <br />
              <span className="text-gradient text-4xl md:text-5xl lg:text-6xl font-bold">for Sustainable Cities</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200 mb-12 max-w-4xl mx-auto font-light"
            >
              Transform your city's waste management with <span className="font-semibold text-green-600 dark:text-green-400">AI-powered sorting</span>, 
              optimized collection routes, and <span className="font-semibold text-blue-600 dark:text-blue-400">gamified recycling programs</span>. 
              Join <span className="font-bold text-emerald-600 dark:text-emerald-400">12.5K+ users</span> making their communities cleaner and greener.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="/schedule"
                className="btn-primary text-lg px-10 py-4 shadow-2xl hover-glow group"
              >
                Get Started Today
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="/dashboard"
                className="btn-secondary text-lg px-10 py-4 shadow-lg group"
              >
                <BarChart3 className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                View Analytics
              </motion.a>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="status-online animate-pulse"></div>
                <span className="font-medium">94% Collection Efficiency</span>
              </div>
              <div className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-green-500 animate-spin-slow" />
                <span className="font-medium">890K kg Recycled</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="font-medium">2.4M kg CO₂ Saved</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        aria-labelledby="stats-heading"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <motion.h2 
            id="stats-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Making Real Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            See the positive environmental impact we're creating together
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = [
              { bg: 'from-blue-500 to-blue-600', icon: 'text-blue-100', ring: 'ring-blue-500/30' },
              { bg: 'from-green-500 to-emerald-600', icon: 'text-green-100', ring: 'ring-green-500/30' },
              { bg: 'from-purple-500 to-purple-600', icon: 'text-purple-100', ring: 'ring-purple-500/30' },
              { bg: 'from-orange-500 to-red-500', icon: 'text-orange-100', ring: 'ring-orange-500/30' }
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 1.5 + (0.15 * index), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 } 
                }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl p-6 md:p-8 text-center relative overflow-hidden group cursor-pointer hover:shadow-2xl"
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${color.bg} rounded-2xl flex items-center justify-center mb-4 shadow-lg ring-4 ${color.ring} group-hover:ring-8 transition-all duration-300`}
                >
                  <Icon className={`h-8 w-8 md:h-10 md:w-10 ${color.icon}`} />
                </motion.div>
                
                {/* Value */}
                <motion.p 
                  className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-200"
                >
                  {stat.value}
                </motion.p>
                
                {/* Label */}
                <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200">
                  {stat.name}
                </p>
                
                {/* Progress indicator for visual appeal */}
                <div className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.8 + (0.1 * index), duration: 1.2, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color.bg} rounded-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        aria-labelledby="features-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="mb-20"
      >
        <div className="text-center mb-16">
          <motion.h2 
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Complete Waste Management 
            <span className="text-gradient">Solution</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Discover all the tools you need to create a more sustainable and efficient waste management system. 
            From AI-powered sorting to gamified rewards, we've got everything covered.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradients = [
              'from-green-500 to-emerald-600',
              'from-blue-500 to-cyan-600', 
              'from-purple-500 to-pink-600',
              'from-orange-500 to-red-500',
              'from-yellow-500 to-orange-500',
              'from-red-500 to-pink-600'
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <motion.a
                key={feature.name}
                href={feature.href}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 2.8 + (0.1 * index), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2 } 
                }}
                className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl p-8 hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                {/* Background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-3 transition-all duration-500`}></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 dark:from-gray-700 to-transparent opacity-50"></div>
                
                {/* Feature Image - Hidden on mobile, shown on md+ */}
                <div className="hidden md:block relative z-10 mb-6">
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <SmartImage 
                      src={feature.image} 
                      alt={feature.imageAlt} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                
                {/* Icon container */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="relative z-10"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg ring-4 ring-white/10 dark:ring-gray-800/20 group-hover:ring-8 group-hover:shadow-2xl transition-all duration-300 md:mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-200">
                    {feature.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200">
                    {feature.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-all duration-200">
                      <span className="group-hover:mr-2 transition-all duration-200">Explore Feature</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="group-hover:opacity-100 opacity-0 transition-all duration-200"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                    
                    {/* Badge */}
                    <div className="badge-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      New
                    </div>
                  </div>
                </div>
                
                {/* Hover border effect */}
                <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:${gradient.replace('from-', 'border-').replace('to-', 'border-')} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
              </motion.a>
            );
          })}
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        aria-labelledby="cta-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="relative"
      >
        <div className="relative bg-gradient-to-br from-green-600 via-green-500 to-blue-600 dark:from-green-800 dark:via-green-700 dark:to-blue-800 rounded-3xl p-8 md:p-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
          
          {/* Community Background Image - Large screens */}
          <div className="absolute inset-0 hidden lg:flex items-center justify-start">
            <div className="w-1/3 h-full">
              <SmartImage 
                src="/images/cta/community.svg" 
                alt="Diverse community members working together on recycling and waste management initiatives" 
                className="w-full h-full object-cover opacity-10 dark:opacity-8" 
              />
            </div>
          </div>
          
          <div className="relative mx-auto max-w-4xl lg:flex lg:items-center lg:justify-end lg:text-left lg:max-w-6xl">
            <div className="lg:w-2/3 lg:pl-8 text-center lg:text-left text-white">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.3, duration: 0.5 }}
              className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
            >
              <div className="status-online mr-2"></div>
              <span className="text-sm font-medium">Join 12.5K+ Active Users</span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h2 
              id="cta-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
            >
              Ready to Transform
              <br />
              <span className="text-emerald-200">Your Community?</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.6 }}
              className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Start your sustainable waste management journey today. Make a real impact on the environment 
              while earning rewards and building a cleaner future for everyone.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/schedule"
                className="inline-flex items-center px-10 py-4 bg-white text-green-600 text-lg font-bold rounded-2xl shadow-2xl hover:bg-green-50 transition-all duration-200 group"
              >
                Start Free Today
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/dashboard"
                className="inline-flex items-center px-10 py-4 bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-200 group"
              >
                <BarChart3 className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                View Demo
              </motion.a>
            </motion.div>
            
            {/* Trust indicators / Mini testimonials */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.7, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-green-100 text-sm leading-relaxed">
                  "Reduced our waste by 60% and earned amazing rewards. Best decision for our community!"
                </p>
                <p className="text-green-200 text-xs mt-2 font-medium">- Mumbai Resident</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-green-100 text-sm leading-relaxed">
                  "The AI sorting feature is incredible. Makes recycling so much easier and more rewarding."
                </p>
                <p className="text-green-200 text-xs mt-2 font-medium">- Delhi Society</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-green-100 text-sm leading-relaxed">
                  "Our collection efficiency improved by 40%. The route optimization is game-changing."
                </p>
                <p className="text-green-200 text-xs mt-2 font-medium">- Bangalore Corporation</p>
              </div>
            </motion.div>
            
            {/* Final encouragement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-green-200 text-sm font-medium">
                ✓ Free to start  ✓ No setup fees  ✓ 24/7 support  ✓ Cancel anytime
              </p>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
