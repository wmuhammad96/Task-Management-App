<template>
    <section class="bg-[url('/image/bg.png')] bg-cover bg-center w-auto h-auto ">
        <div class="flex h-screen ">

            <form @submit.prevent="formSubmit" class="w-1/2 ">

                <div class=" flex-col  w-full h-full  p-6  ">
                    <h2 class="text-4xl font-bold mb-6 text-center text-amber-950">Login Desk </h2>
                    <div class=" mb-6 text-amber-950 text-center text-2xl">
                        <label for="email">Email</label>
                        <input type="email" id="email"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
                    </div>
                    <div class="  mb-6 text-amber-950 text-center text-2xl">
                        <label for="password">Password</label>
                        <input type="password" id="password"
                            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="flex items-center justify-center ">
                        <button
                            class=" rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl mr-1 w-3xs hover:opacity-80">
                            Login
                        </button>
                        <button
                            class=" rounded-lg bg-amber-950 text-amber-100 p-4 cursor-pointer text-2xl hover:opacity-80">
                            register
                        </button>
                    </div>
                </div>

            </form>
            <div class="w-1/2">
                <img src="/image/login.png" alt="registerImage"
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-auto">

            </div>
        </div>

    </section>
</template>
<script setup>

</script>