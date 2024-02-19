// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
      '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        'IBM Plex Sans': true,
        'Russo One': true,
      },
    }],
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**']
  },
})
