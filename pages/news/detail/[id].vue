<script setup lang="ts">
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
  <div class="container my-24 mx-auto px-6">
    <!-- Section: Design Block -->
    <section class="mb-32">
      <h1 class="mb-6 text-3xl font-bold">
        {{ newsRef.title }}
      </h1>
      <div class="mb-6 flex items-center">
        <div>
          <span> Опубликовано <u>{{ newsRef.published_at }}</u></span>
        </div>
      </div>
      <p class="mb-6">
        {{ newsRef.description }}
      </p>

      <div class="flex justify-center">
        <UiCarousel class="rounded-lg shadow-lg dark:shadow-black/20 mb-6">
          <UiCarouselContent>
            <UiCarouselItem v-for="image in newsRef.images" :key="image.id" class="md:basis-1/2 lg:basis-1/3">
              <img :src="image.path"
                   class="max-w-full object-contain h-[350px]" alt="image" />
            </UiCarouselItem>
          </UiCarouselContent>
          <UiCarouselPrevious />
          <UiCarouselNext />
        </UiCarousel>
      </div>

      <p class="mb-6">
        {{ newsRef.content }}
      </p>
    </section>
    <!-- Section: Design Block -->
  </div>
</template>