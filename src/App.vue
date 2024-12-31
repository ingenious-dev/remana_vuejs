<template>
  <div>
    <RouterView />

    <Alert />
  </div>
</template>

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Alert from './components/Alert.vue'

export default {
  components: {
    Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
    Alert,
  },

  computed: {
    items() {
      // `this` points to the component instance
      // return this.$store.state.cartItems;
      return this.$store.getters.cartItems;
    },
  },
}
</script>
