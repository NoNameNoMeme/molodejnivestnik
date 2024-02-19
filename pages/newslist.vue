<script setup lang="ts">
let newsRef = ref([]);

async function addTodo() {
  const todo = await fetch('http://api.molodejnivestnik.ru:8000/api/news').then((r) => r.json());
  newsRef.value = todo.data;
}

addTodo()
</script>

<template>
  <div class="container my-24 mx-auto px-6 max-w-7xl">
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
            <small>Опубликовано <u>{{ item.published_at }}</u></small>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

