<script setup>
const route = useRoute()
const NewsId = route.params.id
console.log(NewsId)

let newsRef = ref({});

async function addTodo() {
  const todo = await fetch(`http://api.molodejnivestnik.ru:8000/api/news/${NewsId}`).then((r) => r.json());
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
    const response = await fetch(`http://api.molodejnivestnik.ru:8000/api/news/${NewsId}/images`, {
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

const deletePhoto = async (id) => {
  await fetch(`http://api.molodejnivestnik.ru:8000/api/news/${NewsId}/images/${id}`, {
    method: 'DELETE',
  });
}

const saveEdit = async () => {
  newsRef.value._method = 'PATCH';
  console.log(newsRef.value);
  await fetch(`http://api.molodejnivestnik.ru:8000/api/news/${NewsId}`, {
    method: 'PATCH',
    body: newsRef.value,
  })
}

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
            @click="saveEdit"
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
      <div class="flex flex-col">
        <label for="picture">Загрузите фото</label>
        <UiInput id="picture" class="mb-6 max-w-sm" type="file" name="image" multiple @change="handleFileUpload" />

        <div class="flex flex-row w-full flex-wrap gap-3">
          <div v-for="(file, index) in newsRef.images" :key="index" class="flex flex-col gap-3 flex-wrap mb-8 p-2 border justify-center max-w-sm">
            <img :src="file.path" alt="Uploaded Image" class="max-w-full object-cover h-[350px]" />
            <UiButton type="button" @click="deletePhoto(file.id)">Удалить</UiButton>
          </div>
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

      <div class="flex justify-center">
        <UiCarousel class="rounded-lg shadow-lg dark:shadow-black/20 mb-6">
          <UiCarouselContent>
            <UiCarouselItem v-for="image in newsRef.images" :key="image.id" class="md:basis-1/2 lg:basis-1/3">
              <img :src="image.path"
                   class="max-w-full object-cover h-[350px]" alt="image" />
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
  </div>
</template>