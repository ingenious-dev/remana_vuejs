<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div>

      <!-- Hero section -->
      <div class="relative my-6">
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div class="absolute inset-0">
              <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops" />
              <div class="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
            </div>
            <div class="relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span class="block text-white">Take control of your</span>
                <span class="block text-indigo-200">interactions</span>
              </h1>
              <!-- <p class="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p> -->
              <p class="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">With Remana relationship managament app you stay informed on your interactions wether its an email or an event. Remana is simple and easy</p>
              <div class="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div class="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <RouterLink :to="{name: 'activities'}" class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8">Get started</RouterLink>
                  <!-- <RouterLink href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8">Live demo</RouterLink> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/ecommerce/page-examples/storefront-pages#component-087fa445e40f73cc5aa809b7ebac72f0 -->
<!-- https://tailwind-ui-two.vercel.app/components/marketing/page-examples/landing-pages#component-6b663161ec9333a3e026306b01ae45f8 -->