import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),       // 主应用的 HTML 文件
        newPage: path.resolve(__dirname, 'public/new-page.html'), // 新页面的 HTML 文件
      },
    },
  },
});