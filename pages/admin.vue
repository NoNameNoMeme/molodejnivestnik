<script setup>
import dayjs from 'dayjs';

let newsRef = ref([]);

async function addTodo() {
  const todo = await fetch('http://api.molodejnivestnik.ru/api/news').then((r) => r.json());
  newsRef.value = todo.data;
}

async function deleteCurrentNews(id) {
  await console.log('Новость с номером ' + id);


  try {
    const response = await fetch(`http://api.molodejnivestnik.ru/api/news/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await addTodo();
    }

  } catch (error) {
    console.log(error);
  }
}

async function setMainNews(news) {
  if (!news.main) {
    const formData = new FormData();
    formData.append('main', true);
    try {
      const response = await fetch(`http://api.molodejnivestnik.ru/api/news/${news.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await addTodo();
      }

    } catch (error) {
      console.log(error);
    }
    console.log(news.id)
  } else {
    const formData = new FormData();
    formData.append('main', false);
    try {
      const response = await fetch(`http://api.molodejnivestnik.ru/api/news/${news.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await addTodo();
      }

    } catch (error) {
      console.log(error);
    }
    console.log(news.id)
  }
}

addTodo()
</script>

<template>
  <div class="container py-8 h-screen mx-auto max-w-7xl">
      <div class="overflow-x-auto">
        <NuxtLink
            :to="`/create`"
            class="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700 cursor-pointer mb-8"
        >
          Создать новость
        </NuxtLink>
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="text-left rtl:text-right font-bold">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 text-gray-900">id</th>
            <th class="whitespace-nowrap px-4 py-2 text-gray-900">Заголовок</th>
            <th class="whitespace-nowrap px-4 py-2 text-gray-900">Дата</th>
            <th class="whitespace-nowrap px-4 py-2 text-gray-900">Редактирование</th>
            <th class="whitespace-nowrap px-4 py-2 text-gray-900">Удаление</th>
            <th class="whitespace-nowrap px-4 py-2 text-gray-900">На главную</th>
            <th class="px-4 py-2"></th>
          </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
          <tr v-for="news in newsRef" :key="news.id">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ news.id }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ news.title }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ dayjs(news.published_at).locale('ru').format('DD MMMM YYYY') }}</td>
            <td class="whitespace-nowrap px-4 py-2">
              <NuxtLink
                  :to="`/edit/${news.id}`"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Редактировать
              </NuxtLink>
            </td>
            <td class="whitespace-nowrap px-4 py-2">
              <a
                  @click="deleteCurrentNews(news.id)"
                  class="inline-block rounded bg-rose-600 px-4 py-2 text-xs font-medium text-white hover:bg-rose-700 cursor-pointer"
              >
                Удалить
              </a>
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-center">
              <input type="checkbox" @change="setMainNews(news)" :checked="news.main" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

