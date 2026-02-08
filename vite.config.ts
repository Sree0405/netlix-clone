import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org/3',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tmdb/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.VITE_APP_TMDB_V3_API_KEY) {
                const url = new URL(proxyReq.path, 'http://localhost');
                url.searchParams.set('api_key', env.VITE_APP_TMDB_V3_API_KEY);
                proxyReq.path = url.pathname + url.search;
              }
            });
          }
        }
      }
    }
  }
})
