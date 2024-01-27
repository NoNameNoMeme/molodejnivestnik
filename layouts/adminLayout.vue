<script setup lang="ts">

</script>

<template>
  <section class="grid" style="min-height: 100vh">
    <AdminSidebar />
    <div>
      <slot />
    </div>
  </section>
</template>

<style>
.grid {
  grid-template-columns: 1fr 6fr;
}
</style>