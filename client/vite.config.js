import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';


// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  build: {
    outDir: '../server/dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [reactRefresh()],
  server: {
    port: 8081,
    strictPort: true,
  },
});
