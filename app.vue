<script setup lang="ts">

const defaultLayout = 'default'
const adminLayout = 'admin-layout'

</script>

<template>
  <NuxtLayout :name="defaultLayout">
    <NuxtPage />
  </NuxtLayout>
</template>
