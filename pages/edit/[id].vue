<script setup>
const route = useRoute()
const NewsId = route.params.id
console.log(NewsId)

let newsRef = ref({});

async function addTodo() {
  const todo = await fetch(`http://api.molodejnivestnik.ru/api/news/${NewsId}`).then((r) => r.json());
  newsRef.value = todo.data;
}

addTodo()

const handleFileUpload = async (event) => {
  const files = event.target.files[0];

  // Создаем объект формы данных
  const formData = new FormData();
  formData.append('image', files);

  try {
    // Отправляем POST-запрос
    const response = await fetch(`http://api.molodejnivestnik.ru/api/news/${NewsId}/images`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Ошибка при загрузке файла:', response.statusText);
      // Обработка ошибки при загрузке файла
    } else {
      console.log('Файл успешно загружен');
      // Обновляем данные после успешной загрузки файла
      addTodo();
    }
  } catch (error) {
    console.error('Ошибка при отправке POST-запроса:', error);
  }
};

</script>

<template>
  <div class="container py-8 h-full mx-auto max-w-7xl">
    <section class="mb-32">
      <h1 class="mb-6 text-3xl font-bold">Редактировать</h1>
      <h1 class="mb-6 text-3xl font-bold">{{ 'Новость # ' + newsRef.id }}</h1>

      <p>Заголовок</p>
      <UiTextarea
          v-model="newsRef.title"
          class="mb-10"
      ></UiTextarea>

      <p>Дата</p>
      <UiTextarea
          v-model="newsRef.published_at"
          class="mb-10"
      ></UiTextarea>

      <p>Описание</p>
      <UiTextarea
          v-model="newsRef.description"
          class="mb-10 h-full"
      ></UiTextarea>

      <p>Текст</p>
      <UiTextarea
          v-model="newsRef.content"
          class="mb-10 h-full"
      ></UiTextarea>

      <div class="flex flex-wrap justify-between mb-10">
        <NuxtLink
            class="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700 cursor-pointer"
        >
          Сохранить
        </NuxtLink>
        <NuxtLink
            @click="this.$router.go(-1)"
            class="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 cursor-pointer"
        >
          Назад
        </NuxtLink>
      </div>

      <h2 class="mb-6 text-3xl font-bold">Фотографии</h2>
      <div class="flex flex-col max-w-sm">
        <label for="picture">Загрузите фото</label>
        <UiInput id="picture" type="file" name="image" multiple @change="handleFileUpload" />

        <div v-for="(file, index) in newsRef.images" :key="index">
          <img :src="file.path" alt="Uploaded Image" style="max-width: 100%; height: auto;" />
        </div>
      </div>
    </section>

    <section>
      <h1 class="mb-6 text-3xl font-bold">Предпросмотр</h1>

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
      <img :src="newsRef.image"
           class="mb-6 max-w-full rounded-lg shadow-lg dark:shadow-black/20 object-contain h-[350px]" alt="image" />
      <p class="mb-6">
        {{ newsRef.content }}
      </p>
    </section>
  </div>
</template>