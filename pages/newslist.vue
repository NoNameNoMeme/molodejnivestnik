<script setup>
import dayjs from 'dayjs';
const route = useRoute();
const newsRef = ref([]);
const searchStringRef = ref('');

const fetchString = async () => {
  searchStringRef.value = route.query.q ? route.query.q : searchStringRef.value;
  route.query.q = '';
  if (searchStringRef.value) {
    const todo = await fetch(`https://api.molodejnivestnik.ru/api/news?search=${searchStringRef.value}`).then((r) => r.json());
    newsRef.value = todo.data;
  } else {
      const todo = await fetch('https://api.molodejnivestnik.ru/api/news').then((r) => r.json());
      newsRef.value = todo.data;
  }
  console.log(searchStringRef.value);
}

onMounted(() => {
  fetchString();
});
</script>

<template>
  <div class="py-24 min-h-screen bg-gradient-to-r from-sky-100 to-white test-background">
    <section class="container mb-32 mx-auto">
      <h2 class="mb-20 text-center sm:text-7xl text-5xl font-bold bg-white rounded-lg">Последние новости</h2>
      <div class="mb-20 flex flex-row wrap">
        <UiInput v-model="searchStringRef" class="bg-white"></UiInput>
        <UiButton @click="fetchString">Найти</UiButton>
      </div>

      <div class="mb-6 flex flex-wrap border bg-white rounded-lg dark:shadow-black/20 p-0.5 item-in-news-main-ref" v-for="item in newsRef" :key="item.id">

        <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-3/12">
          <div class="relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
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
          <h5 class="mb-3 text-lg font-bold text-left">{{ item.title }}</h5>
          <p class="text-neutral-500 dark:text-neutral-300 text-left line-clamp-4 text-ellipsis">
            {{ item.description }}
          </p>
        </div>

        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-2/12">
          <p class="text-neutral-500 dark:text-neutral-300">
            <small>Опубликовано <u>{{ dayjs(item.published_at).locale('ru').format('DD MMMM YYYY') }}</u></small>
          </p>
            <p class="font-bold text-green-800">{{ item.tags }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.test-background {
    background-image: url("public/img/ornament-left.png");
    background-repeat: repeat-y;
    background-size: auto;
}

.item-in-news-main-ref {
  box-shadow: 10px 9px 9px 1px rgba(34, 60, 80, 0.2)
}
</style>

