<script setup lang="ts">
useHead({
  title: 'Login',
})

const emailRef = ref('');
const passwordRef = ref('');

const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded w-1/4 p-5 border-2">
      <h1 class="text-2xl font-bold text-center mb-5">Логин</h1>
      <form>
        <UiInput
            placeholder="Почта" type="email" class="mb-3"
            v-model="emailRef"
        />
        <UiInput
            placeholder="Пароль" type="password" class="mb-3"
            v-model="passwordRef"
        />
      </form>
      <div class="flex items-center justify-center">
        <UiButton type="button">Войти</UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>