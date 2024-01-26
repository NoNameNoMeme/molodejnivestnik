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
  <div class="container my-24 mx-auto md:px-6">
    <!-- Section: Design Block -->
    <section class="mb-32">
      <img :src="newsRef.image"
           class="mb-6 max-w-full rounded-lg shadow-lg dark:shadow-black/20 object-contain h-[350px]" alt="image" />

      <div class="mb-6 flex items-center">
        <div>
          <span> Опубликовано <u>{{ newsRef.date }}</u></span>
        </div>
      </div>

      <h1 class="mb-6 text-3xl font-bold">
        {{ newsRef.title }}
      </h1>

      <p>
        {{ newsRef.description }}
      </p>
      <template v-html="newsRef.content" />
    </section>
    <!-- Section: Design Block -->
  </div>
</template>