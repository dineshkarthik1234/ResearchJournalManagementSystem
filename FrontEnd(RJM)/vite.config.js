import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'context': path.resolve(__dirname, 'src/context'),
      'shared': path.resolve(__dirname, 'src/shared'),
      'Config': path.resolve(__dirname, 'src/Config.jsx')
    }
  }
}); 