<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  background: #f8f9fa;
}

.main-content {
  min-height: calc(100vh - 80px);
}
</style>
