<script lang="ts" setup>
import { HEADER_DATA } from "~/components/layout/header.data";
</script>

<template>
  <div class="flex flex-wrap items-center justify-between mx-auto px-8 py-4 border-b-2">
    <NuxtLink v-for="item in HEADER_DATA" :key="item.name" :to="item.url">
      <span>{{ item.name }}</span>
    </NuxtLink>

    <div class="flex w-full max-w-xs items-center space-x-2">
      <UiInput type="text" placeholder="Поиск по сайту" />
      <UiButton type="submit">Найти</UiButton>
    </div>
  </div>
</template>