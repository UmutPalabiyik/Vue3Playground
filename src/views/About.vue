<template>
  <div class="about">
    <div class="hero">
      <h1>Vue.js Özellikleri</h1>
      <p>Bu uygulama Vue.js'in temel özelliklerini ve en popüler kütüphanelerini gösterir</p>
    </div>

    <div class="features">
      <div class="feature-section">
        <h2>🎯 Vue.js Temel Özellikler</h2>
        <div class="feature-grid">
          <div class="feature-item">
            <h3>Reactive Data</h3>
            <p>ref() ve reactive() ile veri reaktivitesi</p>
            <code>const count = ref(0)</code>
          </div>
          <div class="feature-item">
            <h3>Computed Properties</h3>
            <p>Hesaplanmış özellikler ve otomatik güncelleme</p>
            <code>const doubled = computed(() => count.value * 2)</code>
          </div>
          <div class="feature-item">
            <h3>Watchers</h3>
            <p>Veri değişikliklerini izleme ve tepki verme</p>
            <code>watch(count, (newVal) => console.log(newVal))</code>
          </div>
          <div class="feature-item">
            <h3>Lifecycle Hooks</h3>
            <p>Component yaşam döngüsü yönetimi</p>
            <code>onMounted(() => { /* component mounted */ })</code>
          </div>
        </div>
      </div>

      <div class="feature-section">
        <h2>📦 Kullanılan Kütüphaneler</h2>
        <div class="library-grid">
          <div class="library-item">
            <h3>Vue Router 4</h3>
            <p>Resmi routing kütüphanesi</p>
            <ul>
              <li>SPA (Single Page Application) desteği</li>
              <li>Programmatic navigation</li>
              <li>Route guards ve meta fields</li>
              <li>Lazy loading</li>
            </ul>
          </div>
          <div class="library-item">
            <h3>Pinia</h3>
            <p>Modern state management</p>
            <ul>
              <li>Vuex'in yerini alan yeni store</li>
              <li>TypeScript desteği</li>
              <li>Composition API ile uyumlu</li>
              <li>Devtools entegrasyonu</li>
            </ul>
          </div>
          <div class="library-item">
            <h3>Axios</h3>
            <p>HTTP client kütüphanesi</p>
            <ul>
              <li>Promise tabanlı API</li>
              <li>Request/Response interceptors</li>
              <li>Automatic JSON parsing</li>
              <li>Error handling</li>
            </ul>
          </div>
          <div class="library-item">
            <h3>VueUse</h3>
            <p>Vue composables koleksiyonu</p>
            <ul>
              <li>Hazır composable fonksiyonlar</li>
              <li>Browser API'leri için wrapper'lar</li>
              <li>Utility fonksiyonlar</li>
              <li>TypeScript desteği</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="feature-section">
        <h2>🛠️ Uygulama Yapısı</h2>
        <div class="structure">
          <div class="structure-item">
            <h3>Component Architecture</h3>
            <p>Single File Components (.vue) kullanarak modüler yapı</p>
            <ul>
              <li><code>template</code> - HTML template</li>
              <li><code>script setup</code> - TypeScript logic</li>
              <li><code>style scoped</code> - CSS styles</li>
            </ul>
          </div>
          <div class="structure-item">
            <h3>State Management</h3>
            <p>Pinia stores ile merkezi state yönetimi</p>
            <ul>
              <li>Todo Store - Todo işlemleri</li>
              <li>User Store - Kullanıcı verileri</li>
              <li>Reactive state ve actions</li>
            </ul>
          </div>
          <div class="structure-item">
            <h3>Type Safety</h3>
            <p>TypeScript ile tip güvenliği</p>
            <ul>
              <li>Interface tanımları</li>
              <li>Type checking</li>
              <li>IntelliSense desteği</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="feature-section">
        <h2>🚀 Öğrenilen Kavramlar</h2>
        <div class="concepts">
          <div class="concept-item">
            <h3>Composition API</h3>
            <p>Vue 3'ün yeni API'si ile daha iyi kod organizasyonu</p>
          </div>
          <div class="concept-item">
            <h3>Reactivity System</h3>
            <p>Proxy tabanlı reaktif sistem ve otomatik güncellemeler</p>
          </div>
          <div class="concept-item">
            <h3>Component Communication</h3>
            <p>Props, emits ve provide/inject ile component iletişimi</p>
          </div>
          <div class="concept-item">
            <h3>Async Operations</h3>
            <p>API çağrıları ve async/await kullanımı</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Bu sayfa sadece bilgi gösterimi için kullanılıyor
// Herhangi bir reactive data veya logic gerektirmiyor
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  color: #42b883;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.feature-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.feature-item h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.feature-item p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.feature-item code {
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #d63384;
}

.library-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.library-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.library-item h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.library-item p {
  color: #666;
  margin-bottom: 1rem;
  font-weight: 500;
}

.library-item ul {
  list-style: none;
  padding: 0;
}

.library-item li {
  padding: 0.25rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.library-item li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #42b883;
  font-weight: bold;
}

.structure {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.structure-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.structure-item h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.structure-item p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.structure-item ul {
  list-style: none;
  padding: 0;
}

.structure-item li {
  padding: 0.25rem 0;
  color: #666;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin: 0.25rem 0;
}

.concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.concept-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b883;
  text-align: center;
}

.concept-item h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.concept-item p {
  color: #666;
  line-height: 1.5;
}
</style>
