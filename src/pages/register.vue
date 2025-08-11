<template>

    <section class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto ">
        <div class="flex h-screen ">
            <div class="w-1/2">
                <img src="/image/register.png" alt="registerImage"
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-auto">

            </div>
            <form  @submit.prevent="formSubmit" class="w-1/2 ">
                
                <div class=" flex-col  w-full h-full  p-6  ">
                    <h2 class="text-4xl font-bold mb-6 text-center text-amber-950">Registration Desk </h2>
                    <div class=" mb-6 text-amber-950 text-center text-2xl">
                       <label for="email">Email</label>
                        <input type="email" id="email" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" v-model="email">
                    </div>
                    <div class="mb-6 text-amber-950 text-center text-2xl">
                        <label for="userName">User Name</label>
                        <input type="text" id="userName" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" v-model="name">
                    </div>
                    <div class="  mb-6 text-amber-950 text-center text-2xl">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" v-model="password">
                    </div>
                     <div class=" text-amber-950 text-center text-2xl mb-6">
                        <label for="confirmPassword">Comfirm password</label>
                        <input type="password" id="password" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" v-model="password">
                    </div>
                    <p>{{ message }}</p>
                    <div class="flex items-center justify-center ">
                        <button class=" rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl mr-1 w-3xs hover:opacity-80">
                            Register
                        </button>
                         <button class=" rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl hover:opacity-80F">
                            Login
                        </button>
                    </div>
                </div>

            </form>
        </div>

    </section>
</template>

<script setup>
import { devtools, ref } from 'vue';
import api from '../api';

const name = ref('');
const email = ref('');
const password = ref('');
const message = ref('');

async function formSubmit() {
  try {
    const res = await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    });
    message.value = 'Registration successful!';
    console.log('Token:', res.data.token);
  } catch (err) {
    message.value = err.response?.data?.message || 'Error';
  }
}
</script>

