<script setup>
const newsRef = ref({
  images: [],
})

const showRef = ref({});

const router = useRouter();

const saveEdit = async () => {
  const formData = new FormData();

  // Добавляем текстовые данные
  formData.append('title', newsRef.value.title);
  formData.append('published_at', newsRef.value.published_at);
  formData.append('description', newsRef.value.description);
  formData.append('content', newsRef.value.content);
  formData.append('image', newsRef.value.image.file);
  /*for (const [image, index] of newsRef.value.images) {
    formData.append(`images[${index}]`, image.file);
  }*/
  /*let filesToUpload = [];*/
  for (let i = 0; i < newsRef.value.images.length; i++) {
    /*filesToUpload.push( newsRef.value.images[i].file)*/
    formData.append(`images[${i}]`, newsRef.value.images[i].file)
  }
  /*const imageFiles = newsRef.value.images.map(image => image.file);
  console.log(imageFiles)
  formData.append('images[]', imageFiles);*/

  // Добавляем файлы
  /*const imageFiles = newsRef.value.images[0];
  formData.append('images[]', imageFiles);*/

  // Отправляем запрос
  /*await fetch('http://api.molodejnivestnik.ru/api/news', {
    method: 'POST',
    body: formData,
  });*/

  try {
    // Отправляем POST-запрос
    const response = await fetch('http://api.molodejnivestnik.ru/api/news', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Ошибка при загрузке файла:', response.statusText);
      // Обработка ошибки при загрузке файла
    } else {
      console.log('Файл успешно загружен');
      const responseData = await response.json();
      const fileId = responseData.data.id;
      await router.push(`/edit/${fileId}`);
      // Обновляем данные после успешной загрузки файла

    }
  } catch (error) {
    console.error('Ошибка при отправке POST-запроса:', error);
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  const imageObject = {
    file: file,
    path: URL.createObjectURL(file), // Создаем временный URL для предпросмотра
  };

  newsRef.value.images.push(imageObject);
};

const singleFileUpload = (event) => {
  const file = event.target.files[0];

  newsRef.value.image = {
    file: file,
    path: URL.createObjectURL(file)
  };
};

const deleteSingleFile = () => {
  newsRef.value.image = null;
}

const deleteFileInSlider = (id) => {
  newsRef.value.images.splice(id, 1);
}
</script>

<template>
  <div class="container py-8 h-full mx-auto max-w-7xl">
    <section class="mb-32">
      <h1 class="mb-6 text-3xl font-bold">Создать</h1>

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

      <h2 class="mb-6 text-3xl font-bold">Фотографии</h2>
      <div class="flex flex-col">
        <label for="picture">Загрузите фото для главной</label>
        <UiInput id="picture" class="mb-6 max-w-sm" type="file" name="image" @change="singleFileUpload" />

        <div class="flex flex-row w-full flex-wrap gap-3">
          <div v-if="newsRef.image" class="flex flex-col gap-3 flex-wrap mb-8 p-2 border justify-center max-w-sm">
            <img :src="newsRef.image.path" alt="Uploaded Image" class="max-w-full object-cover h-[350px]" />
            <UiButton type="button" @click="deleteSingleFile">Удалить</UiButton>
          </div>
        </div>

        <label for="picture">Загрузите фото для слайдера</label>
        <UiInput id="picture" class="mb-6 max-w-sm" type="file" name="image" multiple @change="handleFileUpload" />

        <div class="flex flex-row w-full flex-wrap gap-3">
          <div v-for="(file, index) in newsRef.images" :key="index" class="flex flex-col gap-3 flex-wrap mb-8 p-2 border justify-center max-w-sm">
            <img :src="file.path" alt="Uploaded Image" class="max-w-full object-cover h-[350px]" />
            <UiButton type="button" @click="deleteFileInSlider(index)">Удалить</UiButton>
          </div>
        </div>
      </div>

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
  </div>
</template>