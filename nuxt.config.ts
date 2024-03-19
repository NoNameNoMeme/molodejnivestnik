// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ['vue-remix-icons'],
  },
  modules: [
      '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt', 'dayjs-nuxt',
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
  dayjs: {
    locales: ['ru']
  },
  app: {
    head: {
      meta: [
        {
          "http-equiv": 'Content-Security-Policy',
          content: 'upgrade-insecure-requests',
        },
        // Другие мета-теги
      ],
    },
  },
})
