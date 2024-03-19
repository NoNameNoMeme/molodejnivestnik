<script setup>
import { HEADER_DATA } from "~/components/layout/header.data";
import { MagnifyingGlassIcon } from "@radix-icons/vue"
import { RiVkLine, RiYoutubeLine, RiYoutubeFill, RiInstagramLine } from "@remixicon/vue";
const router = useRouter();

const searchInputRef = ref('');

const clearSearchInput = () => {
  searchInputRef.value = '';
}

const search = () => {
  router.push({ path: '/newslist', query: { q:searchInputRef.value }})
  searchInputRef.value = '';
}

</script>

<template>
  <header class="sticky top-0 z-20 flex flex-wrap flex-col gap-y-2 md:flex-row items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-300">
    <div v-for="item in HEADER_DATA" :key="item.name" class="text-center">
      <NuxtLink :to="item.url" >
        <span class="text-xl text-white font-medium hover-underline-animation">{{ item.name }}</span>
      </NuxtLink>
    </div>
<!--    <NuxtLink class="h-30 w-30 flex items-center gap-2 flex-1 justify-end" to="/">
      <MagnifyingGlassIcon class="text-white" />
      <span class="text-xl text-white font-normal antialiased hover:subpixel-antialiased">Поиск</span>
    </NuxtLink>-->
    <div class="flex flex-row items-center sm:flex-col">
      <div class="flex flex-row cursor-pointer gap-1">
        <a class="my-icon" href="https://youtu.be/dQw4w9WgXcQ?si=PZzWGtArH-l0OdHi" target="_blank"><RiVkLine color="white" /></a>
        <a class="my-icon" href="https://youtu.be/dQw4w9WgXcQ?si=PZzWGtArH-l0OdHi" target="_blank"><RiYoutubeLine color="white" /></a>
        <a class="my-icon" href="https://youtu.be/dQw4w9WgXcQ?si=PZzWGtArH-l0OdHi" target="_blank"><RiInstagramLine color="white" /></a>
      </div>
      <UiAlertDialog>
        <UiAlertDialogTrigger asChild>
          <div class="h-30 w-30 flex items-center gap-2 flex-1 justify-end cursor-pointer">
            <MagnifyingGlassIcon class="text-white" />
            <span class="text-xl text-white font-normal antialiased hover:subpixel-antialiased hover-underline-animation">Поиск</span>
          </div>
        </UiAlertDialogTrigger>
        <UiAlertDialogContent>
          <UiAlertDialogHeader>
            <UiAlertDialogTitle>Поиск по сайту</UiAlertDialogTitle>
            <UiAlertDialogDescription>
              <UiInput v-model="searchInputRef"></UiInput>
            </UiAlertDialogDescription>
          </UiAlertDialogHeader>
          <UiAlertDialogFooter>
            <UiAlertDialogCancel @click="clearSearchInput">Отмена</UiAlertDialogCancel>
            <UiAlertDialogAction @click="search">Найти</UiAlertDialogAction>
          </UiAlertDialogFooter>
        </UiAlertDialogContent>
      </UiAlertDialog>
    </div>
  </header>
</template>

<style>

.hover-underline-animation {
  display: inline-block;
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1.6px;
  bottom: -4px;
  left: 0;
  background-color: #ffffff;
  transform-origin: bottom right;
  transition: transform 0.35s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.my-icon {
  transition: all .50s ease;
}

.my-icon:hover {
  color: #ffa343;
  transform: translateY(-3px);
}

</style>