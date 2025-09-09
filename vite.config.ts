import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // IMPORTANT: Set the base path for GitHub Pages deployment under /smart-waste-management/
  base: "/smart-waste-management/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    hmr: {
      timeout: 300000,   // 5 minutes timeout
      overlay: false     // Disable error overlay to prevent issues
    },
    watch: {
      usePolling: false,
      interval: 1000
    }
  },
  ssr: {
    // Add optimizations for SSR
    noExternal: ['framer-motion', 'lucide-react', '@headlessui/react']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router',
      'framer-motion',
      'lucide-react',
      '@headlessui/react'
    ],
    force: true
  }
});
