<script setup lang="ts">
useHead({
  title: 'Login',
})

const username = ref('');
const password = ref('');

const router = useRouter()

async function login(username: string, password: string) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    const token = data.access_token;

    // Сохранение токена в localStorage
    localStorage.setItem('access_token', token);

    // Далее можно перенаправить пользователя на защищенную страницу
  } catch (error) {
    console.error('Ошибка при входе:', error);
  }
}

const handleLogin = async () => {
  await login(username.value, password.value);
  // Далее можно выполнить дополнительные действия после входа
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded w-1/4 p-5 border-2">
      <h1 class="text-2xl font-bold text-center mb-5">Логин</h1>
      <form>
        <UiInput
            placeholder="Почта" type="email" class="mb-3"
            v-model="username"
        />
        <UiInput
            placeholder="Пароль" type="password" class="mb-3"
            v-model="password"
        />
      </form>
      <div class="flex items-center justify-center">
        <UiButton type="button" @click="handleLogin">Войти</UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>