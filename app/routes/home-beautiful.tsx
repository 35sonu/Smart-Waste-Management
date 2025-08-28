import type { Route } from "./+types/home-beautiful";
import { motion } from "framer-motion";
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
  Users,
  Sparkles,
  Star,
  CheckCircle,
  Play,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Heart,
  Lightbulb,
  Target
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EcoWaste Manager - Smart Waste Management System" },
    { name: "description", content: "Transform your city with AI-powered waste sorting, route optimization, and gamified recycling programs. Join 12.5K+ users making a difference." },
  ];
}

const features = [
  {
    name: "Smart Scheduling",
    description: "AI-powered scheduling that adapts to your routine and optimizes collection routes automatically.",
    icon: Calendar,
    href: "/schedule",
    color: "from-green-500 to-emerald-500",
    image: "/images/features/smart-scheduling.svg",
    imageAlt: "Smart scheduling interface showing calendar with optimized pickup times"
  },
  {
    name: "AI Waste Sorting",
    description: "Advanced computer vision identifies waste types instantly with 98.5% accuracy.",
    icon: Trash2,
    href: "/sort",
    color: "from-blue-500 to-cyan-500",
    image: "/images/features/ai-sorting.svg",
    imageAlt: "AI-powered waste classification system analyzing different materials"
  },
  {
    name: "Recycling Hubs",
    description: "Find the nearest eco-centers with real-time availability and specialized services.",
    icon: MapPin,
    href: "/hubs",
    color: "from-purple-500 to-pink-500",
    image: "/images/features/recycling-hubs.svg",
    imageAlt: "Interactive map showing nearby recycling centers and drop-off points"
  },
  {
    name: "Route Optimization",
    description: "Reduce emissions by 40% with ML-powered route planning and real-time traffic integration.",
    icon: RouteIcon,
    href: "/route-optimizer",
    color: "from-orange-500 to-red-500",
    image: "/images/features/route-optimization.svg",
    imageAlt: "Optimized collection routes with efficiency metrics and environmental impact"
  },
  {
    name: "Eco Rewards",
    description: "Gamified recycling with points, badges, leaderboards, and real-world rewards.",
    icon: Trophy,
    href: "/rewards",
    color: "from-yellow-500 to-orange-500",
    image: "/images/features/eco-rewards.svg",
    imageAlt: "Gamification system showing trophies, points, and achievement badges"
  },
  {
    name: "Analytics Dashboard",
    description: "Real-time insights into waste patterns, environmental impact, and optimization opportunities.",
    icon: BarChart3,
    href: "/dashboard",
    color: "from-indigo-500 to-purple-500",
    image: "/images/features/analytics.svg",
    imageAlt: "Comprehensive analytics dashboard with charts and environmental metrics"
  },
];

const stats = [
  { name: "CO₂ Reduced", value: "2.4M kg", change: "+12%", icon: Globe, color: "text-green-600" },
  { name: "Active Users", value: "12.5K", change: "+28%", icon: Users, color: "text-blue-600" },
  { name: "Waste Recycled", value: "890K kg", change: "+35%", icon: Recycle, color: "text-purple-600" },
  { name: "Collection Efficiency", value: "94%", change: "+8%", icon: BarChart3, color: "text-orange-600" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Environmental Coordinator",
    company: "GreenTech Solutions",
    image: "/images/testimonials/sarah.jpg",
    quote: "EcoWaste transformed our office recycling. We've reduced waste by 60% and our team loves the gamification aspect."
  },
  {
    name: "Marcus Rodriguez",
    role: "Facility Manager",
    company: "Downtown Plaza",
    image: "/images/testimonials/marcus.jpg",
    quote: "The AI sorting feature is incredibly accurate. It's revolutionized how we handle waste management across our properties."
  },
  {
    name: "Dr. Emily Watson",
    role: "Sustainability Director",
    company: "University of Progress",
    image: "/images/testimonials/emily.jpg",
    quote: "The analytics dashboard provides insights we never had before. We've optimized our entire campus waste strategy."
  }
];

export default function HomeBeautiful() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Background Image */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-emerald-50/90 to-blue-50/90 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-700/95"></div>
          <img 
            src="/images/hero/hero-recycling.svg" 
            alt="Smart waste management community with people sorting waste and eco-friendly technology" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20"
          />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto h-32 w-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-12 shadow-2xl relative"
          >
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
            <Leaf className="h-16 w-16 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white mb-8 leading-none"
          >
            Smart Waste Management
            <br />
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl">
              for Tomorrow's Cities
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl md:text-3xl leading-relaxed text-gray-700 dark:text-gray-200 mb-12 max-w-5xl mx-auto font-light"
          >
            Revolutionary <span className="font-semibold text-green-600 dark:text-green-400">AI-powered sorting</span>, 
            intelligent route optimization, and <span className="font-semibold text-blue-600 dark:text-blue-400">gamified sustainability</span>. 
            Join <span className="font-bold text-emerald-600 dark:text-emerald-400">12,500+ eco-warriors</span> transforming communities worldwide.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="/schedule"
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative flex items-center">
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200" />
              </span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="/dashboard"
              className="group bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white border-2 border-white/20 dark:border-gray-600/30 px-12 py-6 rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              Watch Demo
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-12 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="font-semibold">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-semibold">4.9/5 User Rating</span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-semibold">ISO 27001 Certified</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <stat.icon className={`mx-auto h-12 w-12 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <p className="text-4xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">{stat.name}</p>
                  <div className="flex items-center justify-center text-xs text-green-600 dark:text-green-400 font-semibold">
                    <ArrowRight className="h-3 w-3 mr-1 rotate-[-45deg]" />
                    {stat.change} this month
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8"
            >
              Revolutionary Features
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the future of waste management with cutting-edge AI, 
              real-time optimization, and seamless user experiences.
            </motion.p>
          </div>

          <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group relative"
              >
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Feature Image */}
                  <div className="relative mb-8 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700/50 aspect-video">
                    <img 
                      src={feature.image} 
                      alt={feature.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* CTA Button */}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={feature.href}
                    className="inline-flex items-center text-lg font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 group-hover:translate-x-2 transition-all duration-200"
                  >
                    Explore Feature
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">
              Loved by Thousands
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what industry leaders say about EcoWaste's impact on their sustainability goals.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-8 leading-tight"
          >
            Ready to Transform Your Impact?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed"
          >
            Join the sustainability revolution. Start making a measurable environmental impact today 
            with intelligent waste management solutions trusted by industry leaders worldwide.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="/schedule"
              className="bg-white text-green-600 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Start Free Trial
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="/dashboard"
              className="border-2 border-white text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Schedule Demo
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
