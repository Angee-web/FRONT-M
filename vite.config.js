// This file is used to configure Vite, a frontend build tool that is used to build the React frontend. and i got the following instruction from shacdn doc
import path from "path"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
