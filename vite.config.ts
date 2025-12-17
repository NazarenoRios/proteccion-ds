import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
      outDir: 'dist',
      insertTypesEntry: true,
      copyDtsFiles: true,
      include: ['src'],
    }),
    // Plugin para copiar build-info.json al dist
    {
      name: 'copy-build-info',
      closeBundle() {
        const buildInfoPath = path.resolve(__dirname, 'build-info.json');
        const distPath = path.resolve(__dirname, 'dist/build-info.json');
        if (fs.existsSync(buildInfoPath)) {
          fs.copyFileSync(buildInfoPath, distPath);
          console.log('✓ build-info.json copiado a dist/');
        }
      },
    },
    // Plugin personalizado para copiar fuentes
    {
      name: 'copy-fonts',
      generateBundle() {
        const fontsDir = path.resolve(__dirname, 'src/assets/fonts/Sura-sans');
        const distFontsDir = path.resolve(__dirname, 'dist/assets/fonts/Sura-sans');

        if (!existsSync(path.dirname(distFontsDir))) {
          mkdirSync(path.dirname(distFontsDir), { recursive: true });
        }
        if (!existsSync(distFontsDir)) {
          mkdirSync(distFontsDir, { recursive: true });
        }

        // Copiar archivos de fuente específicos
        const fontFiles = [
          'SuraSans-Regular.otf',
          'SuraSans-Negrita.otf',
          'SuraSans-Seminegrita.otf'
        ];

        fontFiles.forEach(file => {
          const src = path.join(fontsDir, file);
          const dest = path.join(distFontsDir, file);
          if (existsSync(src)) {
            copyFileSync(src, dest);
            console.log(`✓ Copiado: ${file}`);
          }
        });
      }
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'EssenceUI',
      fileName: format => `essence-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Prevent code splitting for SVG assets
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
    // Configure asset handling
    assetsInlineLimit: 0, // Don't inline small assets
    chunkSizeWarningLimit: 1000,
    copyPublicDir: false,
  },
});
