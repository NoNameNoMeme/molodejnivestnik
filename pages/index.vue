<script setup lang="ts">
import { HOME_DATA } from "~/components/home/home.data";
</script>

<template>
<!--  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10 text-center">Новости и события</h1>
    <div class="flex flex-row flex-wrap">
      <UiCard class="w-1/4 basis-1/2" v-for="item in HOME_DATA" :key="item.title">
        <UiCardHeader>
          <img class="w-full rounded" :src="item.img" alt="">
        </UiCardHeader>
        <UiCardFooter>Новость 1</UiCardFooter>
      </UiCard>
    </div>
  </div>-->
  <div class="p-6">
    <div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
      <h1 class="font-bold text-2xl mb-10 text-center">Новости и события</h1>
      <div class="flex flex-row flex-wrap">
        <UiCard class="w-1/4 basis-1/2" v-for="item in HOME_DATA" :key="item.title">
          <UiCardHeader>
            <img class="w-full rounded" :src="item.img" alt="">
          </UiCardHeader>
          <UiCardFooter>Новость 1</UiCardFooter>
        </UiCard>
      </div>
    </div>
  </div>
</template>
