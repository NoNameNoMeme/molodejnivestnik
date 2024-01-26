<script setup lang="ts">
useHead({
  title: 'Новости',
})
import { HOME_DATA } from "~/components/home/home.data";

let newsRef = ref([]);
let newsMainRef = ref([]);

async function getNews() {
  const news = await fetch('http://api.molodejnivestnik.ru/api/news?limit=5').then((r) => r.json());
  const newsMain = await fetch('http://api.molodejnivestnik.ru/api/news?main=1').then((r) => r.json());
  newsRef.value = news.data;
  newsMainRef.value = newsMain.data;
}

getNews()
</script>

<template>

  <div class="container my-24 mx-auto px-6 max-w-7xl">
    <!-- Section: Новости и события -->
    <section class="mb-32 text-center">
      <h2 class="mb-12 text-center sm:text-7xl text-5xl font-bold">Новости и события</h2>

      <div class="grid gap-6 lg:grid-cols-2 xl:gap-x-12">
        <div class="mb-6 lg:mb-0 border rounded-lg flex flex-col" v-for="item in newsMainRef" :key="item.title">
          <div class="relative mb-6 overflow-hidden rounded-t-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
               data-te-ripple-init data-te-ripple-color="light">
            <img :src="item.image" class="w-full object-cover h-[350px]" alt="Louvre" />
            <NuxtLink :to="`/news/detail/${item.id}`">
              <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
              </div>
            </NuxtLink>
          </div>

          <h5 class="mb-3 text-lg font-bold">{{ item.title }}</h5>
          <p class="mb-6 text-neutral-500 dark:text-neutral-300">
            <small>Опубликовано <u>{{ item.date }}</u></small>
          </p>
        </div>
      </div>
    </section>
    <!-- Section: Новости и события -->

    <!-- Section: Последние новости -->
    <section class="mb-32">
      <h2 class="mb-20 text-center sm:text-7xl text-5xl font-bold text-center">Последние новости</h2>

      <div class="mb-6 flex flex-wrap border-b-2" v-for="item in newsRef" :key="item.id">

        <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
          <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
               data-te-ripple-init data-te-ripple-color="light">
            <img :src="item.image" class="w-full object-cover h-[160px]" alt="Louvre" />
            <NuxtLink :to="`/news/detail/${item.id}`">
              <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-7/12 xl:w-7/12">
          <h5 class="mb-3 text-lg font-bold">{{ item.title }}</h5>
          <p class="text-neutral-500 dark:text-neutral-300">
            {{ item.description }}
          </p>
        </div>

        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-2/12">
          <p class="mb-6 text-neutral-500 dark:text-neutral-300">
            <small>Опубликовано <u>{{ item.date }}</u></small>
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <UiButton class="h-16 w-2/12">Все новости</UiButton>
      </div>
    </section>
  </div>
</template>
