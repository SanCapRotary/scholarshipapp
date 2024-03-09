//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

//// https://vitejs.dev/config/
//export default defineConfig({
//    base: "/scholarshipapp/",
//  plugins: [react()],
//})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/", // Serve from root
    plugins: [react()],
})
