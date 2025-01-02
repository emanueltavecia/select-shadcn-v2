import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'], // Inclua o diretório correto
      outDir: 'dist', // Certifique-se de que os arquivos gerados sejam colocados no local certo
      staticImport: true,
      rollupTypes: true, // Garante que tipos sejam mesclados ao usar o Rollup
      insertTypesEntry: true, // Adiciona a entrada "types" no package.json
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
