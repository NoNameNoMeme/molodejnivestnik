<script setup lang="ts">
import dayjs from 'dayjs';
const route = useRoute()
const NewsId = route.params.id as string
console.log(NewsId)

let newsRef = ref({});

async function addTodo() {
  const todo = await fetch(`http://api.molodejnivestnik.ru/api/news/${NewsId}`).then((r) => r.json());
  newsRef.value = todo.data;
}

addTodo()
</script>

<template>
  <div class="test-background min-h-screen">
    <div class="my-24 mx-auto px-6 max-w-4xl">
      <!-- Section: Design Block -->
      <section class="mb-32">
        <h1 class="mb-6 text-3xl font-bold">
          {{ newsRef.title }}
        </h1>
        <div class="mb-6 flex items-center justify-between">
          <div>
            <span>Опубликовано <u>{{ dayjs(newsRef.published_at).locale('ru').format('DD MMMM YYYY') }}</u></span>
          </div>
          <div>
            <p class="font-bold text-green-800">{{ newsRef.tags === 'undefined' ? '' : newsRef.tags }}</p>
          </div>
        </div>
        <p class="mb-6">
          {{ newsRef.description }}
        </p>

        <div class="flex justify-center">
          <UiCarousel class="rounded-lg shadow-lg dark:shadow-black/20 mb-6 w-[550px]">
            <UiCarouselContent>
              <UiCarouselItem v-for="image in newsRef.images" :key="image.id">
                <!--              <img :src="image.path"
                                 class="w-full h-full object-cover" alt="image" />-->
                <div>
                  <UiCard>
                    <UiCardContent class="flex aspect-square items-center justify-center p-3">
                      <img
                          :src="image.path"
                          alt="image"
                          class="w-full h-full object-cover"
                      />
                    </UiCardContent>
                  </UiCard>
                </div>
              </UiCarouselItem>
            </UiCarouselContent>
            <UiCarouselPrevious />
            <UiCarouselNext />
          </UiCarousel>
        </div>

        <p class="mb-6 whitespace-pre text-wrap text-justify">
          {{ newsRef.content }}
        </p>
      </section>
      <!-- Section: Design Block -->
    </div>
  </div>
</template>

<style scoped>
.test-background {
  background-image: url("public/img/green-ornament.png"), url("public/img/blue_ornament.png");
  background-position: left, right;
  background-repeat: repeat-y;
  background-size: auto;
}
</style>