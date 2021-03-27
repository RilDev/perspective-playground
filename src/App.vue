<template>
  <div class="bg-gray-800 h-screen flex items-center justify-center">
    <main class="bg-gray-300 max-w-lg p-6 rounded-md flex">
      <section class="flex flex-col mr-6">
        <label for="perspective">Perspective</label>
        <input
          v-model="perspective"
          type="range"
          min="0"
          max="1000"
          id="perspective"
          class="bg-gray-800"
        />

        <label for="rotate-x">Rotate X</label>
        <input type="range" min="-180" max="180" id="rotate-x" />

        <label for="rotate-y">Rotate Y</label>
        <input type="range" min="-180" max="180" id="rotate-y" />

        <label for="rotate-z">Rotate Z</label>
        <input type="range" min="-180" max="180" id="rotate-z" />
      </section>
      <section>
        <div
          :style="{ perspective: `${perspective}px` }"
          class="bg-gray-100 w-60 h-60 flex items-center justify-center relative overflow-hidden"
        >
          <div
            :style="{
              transformStyle: `preserve-3d`,
              transform: `rotateX(50deg)`,
            }"
            class="bg-purple-700 text-white w-16 h-16 flex items-center justify-center absolute"
          >
            test
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// dynamic variables
const perspective = ref(0);

// watch
watch(perspective, () => console.log(perspective.value));

// computed
const containerStyles = computed(() => {
  return {
    perspective: `${perspective.value}px`,
  };
});

const elementStyles = computed(() => {
  return {
    transformStyle: `preserve-3d`,
    transform: `rotateX(-50deg)`,
  };
});
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
