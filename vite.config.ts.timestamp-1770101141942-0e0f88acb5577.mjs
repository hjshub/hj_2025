// vite.config.ts
import { defineConfig } from "file:///C:/Users/D-507/Desktop/%EC%9E%91%EC%97%85/workspace/project/hj_2025/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/D-507/Desktop/%EC%9E%91%EC%97%85/workspace/project/hj_2025/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import viteCompression from "file:///C:/Users/D-507/Desktop/%EC%9E%91%EC%97%85/workspace/project/hj_2025/node_modules/vite-plugin-compression/dist/index.mjs";
import viteImagemin from "file:///C:/Users/D-507/Desktop/%EC%9E%91%EC%97%85/workspace/project/hj_2025/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/D-507/Desktop/%EC%9E%91%EC%97%85/workspace/project/hj_2025/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig(({ command }) => ({
  plugins: [
    vue(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz"
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ],
  base: command === "build" ? "/hj_2025/" : "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/_variable.scss" as *;
          @use "@/assets/scss/_mixin.scss" as *;
        `,
        charset: false
      }
    },
    devSourcemap: false
  },
  build: {
    outDir: "docs",
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor": ["vue", "vue-router", "pinia"],
          "gsap": ["gsap"],
          "swiper": ["swiper"]
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  },
  server: {
    port: 10107,
    host: "10.0.1.57",
    // host: '0.0.0.0',
    open: false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxELTUwN1xcXFxEZXNrdG9wXFxcXFx1Qzc5MVx1QzVDNVxcXFx3b3Jrc3BhY2VcXFxccHJvamVjdFxcXFxoal8yMDI1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxELTUwN1xcXFxEZXNrdG9wXFxcXFx1Qzc5MVx1QzVDNVxcXFx3b3Jrc3BhY2VcXFxccHJvamVjdFxcXFxoal8yMDI1XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ELTUwNy9EZXNrdG9wLyVFQyU5RSU5MSVFQyU5NyU4NS93b3Jrc3BhY2UvcHJvamVjdC9oal8yMDI1L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcclxuaW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbidcclxuXHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybClcclxuY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShfX2ZpbGVuYW1lKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4gKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxyXG4gICAgICBleHQ6ICcuZ3onXHJcbiAgICB9KSxcclxuICAgIHZpdGVJbWFnZW1pbih7XHJcbiAgICAgIGdpZnNpY2xlOiB7XHJcbiAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICAgICAgaW50ZXJsYWNlZDogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgb3B0aXBuZzoge1xyXG4gICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vempwZWc6IHtcclxuICAgICAgICBxdWFsaXR5OiA4MFxyXG4gICAgICB9LFxyXG4gICAgICBwbmdxdWFudDoge1xyXG4gICAgICAgIHF1YWxpdHk6IFswLjgsIDAuOV0sXHJcbiAgICAgICAgc3BlZWQ6IDRcclxuICAgICAgfSxcclxuICAgICAgc3Znbzoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3JlbW92ZVZpZXdCb3gnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncmVtb3ZlRW1wdHlBdHRycycsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBiYXNlOiBjb21tYW5kID09PSAnYnVpbGQnID8gJy9oal8yMDI1LycgOiAnLycgLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcbiAgICB9XHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICBAdXNlIFwiQC9hc3NldHMvc2Nzcy9fdmFyaWFibGUuc2Nzc1wiIGFzICo7XHJcbiAgICAgICAgICBAdXNlIFwiQC9hc3NldHMvc2Nzcy9fbWl4aW4uc2Nzc1wiIGFzICo7XHJcbiAgICAgICAgYCxcclxuICAgICAgICBjaGFyc2V0OiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGV2U291cmNlbWFwOiBmYWxzZVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2RvY3MnLFxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgJ3ZlbmRvcic6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcclxuICAgICAgICAgICdnc2FwJzogWydnc2FwJ10sXHJcbiAgICAgICAgICAnc3dpcGVyJzogWydzd2lwZXInXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAxMDEwNyxcclxuICAgIGhvc3Q6ICcxMC4wLjEuNTcnLFxyXG4gICAgLy8gaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgb3BlbjogZmFsc2UsXHJcbiAgfVxyXG59KSkgIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVyxTQUFTLG9CQUFvQjtBQUN4WSxPQUFPLFNBQVM7QUFDaEIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxTQUFTLGVBQWU7QUFDakMsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxrQkFBa0I7QUFMb00sSUFBTSwyQ0FBMkM7QUFPOVEsSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLFFBQVEsVUFBVTtBQUVwQyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsT0FBTztBQUFBLEVBQzVDLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLGdCQUFnQjtBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsYUFBYTtBQUFBLE1BQ1gsVUFBVTtBQUFBLFFBQ1IsbUJBQW1CO0FBQUEsUUFDbkIsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsU0FBUyxDQUFDLEtBQUssR0FBRztBQUFBLFFBQ2xCLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsVUFDVjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsTUFBTSxZQUFZLFVBQVUsY0FBYztBQUFBLEVBQzFDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxXQUFXLE9BQU87QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBSWhCLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCx1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixVQUFVLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxVQUN2QyxRQUFRLENBQUMsTUFBTTtBQUFBLFVBQ2YsVUFBVSxDQUFDLFFBQVE7QUFBQSxRQUNyQjtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUEsRUFDUjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
