import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),    
    // + https://github.com/vitejs/vite-plugin-basic-ssl?tab=readme-ov-file#usage
    // basicSsl({
    //   /** name of certification */
    //   name: 'test',
    //   /** custom trust domains */
    //   domains: ['*.custom.com'],
    //   /** custom certification directory */
    //   certDir: '/Users/.../.devServer/cert'
    // })
  ],
  build: {
    assetsDir: 'static/remana', // TODO https://vitejs.dev/config/build-options.html#build-assetsdir
  },
  // + https://vite.dev/config/server-options#server-https
  // server: {
  //   https: true, // For debugging 'login with google'
  // }
})
