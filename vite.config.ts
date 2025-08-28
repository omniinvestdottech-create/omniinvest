import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          advanced: [
            './src/components/advanced/QuantumAI.tsx',
            './src/components/advanced/PersonalAI.tsx',
            './src/components/advanced/GlobalIntelligence.tsx',
            './src/components/advanced/AdvancedVisualization.tsx',
            './src/components/advanced/BehavioralAnalytics.tsx',
            './src/components/advanced/MarketMicrostructure.tsx',
            './src/components/advanced/APIEcosystem.tsx'
          ]
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
});
