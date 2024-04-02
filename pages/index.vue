<script setup>
import dayjs from 'dayjs';
useHead({
  title: 'Молодежные новости Башкортостана',
})
const router = useRouter()


/*const newsRef = ref([]);
const newsMainRef = ref([]);

async function getNews() {
  const news = await fetch('http://api.molodejnivestnik.ru/api/news?limit=5').then((r) => r.json());
  const newsMain = await fetch('http://api.molodejnivestnik.ru/api/news?main=1').then((r) => r.json());
  newsRef.value = news.data;
  newsMainRef.value = newsMain.data;
}*/

const allNewsRef = ref([]);
const mainNewsRef = ref([]);

const getMainNews = async () => {
  const response = await fetch('https://api.molodejnivestnik.ru/api/news?main=1').then((res) => res.json());
    mainNewsRef.value = response.data;
}
const getAllNews = async () => {
  const response = await fetch('https://api.molodejnivestnik.ru/api/news?limit=5').then((res) => res.json());
    allNewsRef.value = response.data;
}

onMounted(() => {
    getMainNews();
    getAllNews();
});

const routeToAllNews = () => {
  router.push('/newslist');
}

</script>

<template>
  <div>
    <!-- Section: Design Block -->
    <section class="background-radial-gradient text-center lg:text-left">
      <div class="relative overflow-hidden bg-cover bg-no-repeat bg-top bg-[50%] bg-[url('https://avatars.mds.yandex.net/get-altay/4380921/2a000001788290f4fb3dc3dbc319a0b9ee2b/XXXL')] h-screen">
        <div
            class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
          <div class="flex h-full items-center justify-center">
            <div class="max-w-[800px] px-6 py-6 text-center text-white md:py-0 md:px-12">
              <h2 class="mb-12 text-5xl font-bold leading-tight tracking-tight md:text-6xl xl:text-7xl">
                Молодежные новости<br /><span>Башкортостана</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->
  </div>
  <div class="bg-gradient-to-r from-sky-100 to-white test-background">
    <!-- Section: Новости и события -->
    <section class="mb-32 text-center py-24 mx-auto px-6 max-w-7xl">
      <h2 class="mb-24 text-center sm:text-8xl text-6xl font-bold bg-white rounded-lg">Новости и события</h2>

      <div class="grid gap-6 lg:grid-cols-2 xl:gap-x-12 xl:gap-y-12">
        <div class="mb-6 lg:mb-0 rounded-lg flex flex-col item-in-news-main-ref bg-white p-0.5" v-for="item in mainNewsRef" :key="item.id">
          <div class="relative mb-6 overflow-hidden rounded-t-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
               data-te-ripple-init data-te-ripple-color="light">
            <img :src="item.image" class="w-full object-cover h-[350px]" :alt="item.image" />
            <NuxtLink :to="`/news/detail/${item.id}`">
              <div
                  class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
              </div>
            </NuxtLink>
          </div>

          <h5 class="mb-3 text-lg font-bold px-4">{{ item.title }}</h5>
          <p class="mb-6 text-neutral-500 dark:text-neutral-300">
            <small>Опубликовано <u>{{ dayjs(item.published_at).locale('ru').format('DD MMMM YYYY') }}</u></small>
          </p>
        </div>
      </div>
    </section>
    <!-- Section: Новости и события -->
  </div>

  <!-- Section: Последние новости -->
  <div class="bg-gradient-to-r from-sky-100 to-white test-background">
    <section class="mb-32 my-24 py-24 px-6 mx-auto max-w-7xl ">
      <h2 class="mb-20 text-center sm:text-8xl text-6xl font-bold bg-white rounded-lg">Последние новости</h2>

      <div class="mb-6 flex flex-wrap border bg-white rounded-lg dark:shadow-black/20 p-0.5 item-in-news-main-ref" v-for="item in allNewsRef" :key="item.id">

        <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-3/12">
          <div class="relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
               data-te-ripple-init data-te-ripple-color="light">
            <img :src="item.image" class="w-full object-cover h-[160px]" :alt="item.image" />
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

        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-2 md:mb-0 md:w-2/12">
          <p class=" text-neutral-500 dark:text-neutral-300">
            <small>Опубликовано <u>{{ dayjs(item.published_at).locale('ru').format('DD MMMM YYYY') }}</u></small>
          </p>
          <p class="font-bold text-green-800">{{ item.tags }}</p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <UiButton class="h-16 my-button" @click="routeToAllNews">Все новости</UiButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.background-radial-gradient {
  background-color: hsl(123, 40%, 15%);
  background-image: radial-gradient(650px circle at 0% 0%,
  hsl(123, 41%, 35%) 15%,
  hsl(123, 41%, 30%) 35%,
  hsl(123, 41%, 20%) 75%,
  hsl(123, 41%, 19%) 80%,
  transparent 100%),
  radial-gradient(1250px circle at 100% 100%,
      hsl(123, 41%, 45%) 15%,
      hsl(123, 41%, 30%) 35%,
      hsl(123, 41%, 20%) 75%,
      hsl(123, 41%, 19%) 80%,
      transparent 100%);
}

.my-button {
  font-size: 30px;
  padding: 40px 50px;
}

.item-in-news-main-ref {
  box-shadow: 10px 9px 9px 1px rgba(34, 60, 80, 0.2)
}

.test-background {
    background-image: url("public/img/green-ornament.png"), url("public/img/blue_ornament.png");
    background-position: left, right;
    background-repeat: repeat-y;
}
</style>