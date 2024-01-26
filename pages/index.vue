<script setup>
import { HOME_DATA } from "~/components/home/home.data";

let newsRef = ref([]);

async function addTodo() {
  const todo = await fetch('http://api.molodejnivestnik.ru/api/news').then((r) => r.json());
  newsRef.value = todo.data;
}

addTodo()
</script>

<template>
<!--  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10 text-center">Новости и события</h1>
    <div class="flex flex-row flex-wrap">
      <UiCard class="w-1/4 basis-1/2" v-for="item in HOME_DATA" :key="item.title">
        <UiCardHeader>
          <img class="w-full rounded" :src="item.img" alt="">
        </UiCardHeader>
        <UiCardFooter>Новость 1</UiCardFooter>
      </UiCard>
    </div>
  </div>-->

  <div class="container my-24 mx-auto px-6 max-w-7xl">
    <!-- Section: Новости и события -->
    <section class="mb-32 text-center">
      <h2 class="mb-12 text-center sm:text-7xl text-5xl font-bold">Новости и события</h2>

      <div class="grid gap-6 lg:grid-cols-2 xl:gap-x-12">
        <div class="mb-6 lg:mb-0 border rounded-lg flex flex-col" v-for="item in HOME_DATA" :key="item.title">
          <div class="relative mb-6 overflow-hidden rounded-t-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
               data-te-ripple-init data-te-ripple-color="light">
            <img :src="item.img" class="w-full object-contain h-[350px]" alt="Louvre" />
            <a href="#!">
              <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
              </div>
            </a>
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
            <img :src="item.img" class="w-full object-contain h-[160px]" alt="Louvre" />
            <a href="#!">
              <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
              </div>
            </a>
          </div>
        </div>

        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-7/12 xl:w-7/12">
          <h5 class="mb-3 text-lg font-bold">{{ item.title }}</h5>
          <p class="text-neutral-500 dark:text-neutral-300">
            Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat
            vulputate. Ut vulputate est non quam dignissim elementum. Donec a
            ullamcorper diam.
          </p>
        </div>

        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-2/12">
          <p class="mb-6 text-neutral-500 dark:text-neutral-300">
            <small>Опубликовано <u>{{ item.date }}</u></small>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
