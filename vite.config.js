import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

import React from '@vitejs/plugin-react-swc'


import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig( {
  plugins: [React(), ssr()]

})
