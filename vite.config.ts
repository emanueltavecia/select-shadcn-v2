import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      staticImport: true,
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    lib: {
      entry: './src/components/select.tsx',
      name: 'select-shadcn-v2',
      fileName: (format) => `select-shadcn-v2.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@radix-ui/react-popover', 'cmdk'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@radix-ui/react-popover': 'RadixPopover',
          cmdk: 'cmdk',
        },
      },
    },
  },
})
