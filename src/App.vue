<template>
  <div class="bg-gray-800 h-screen flex items-center justify-center">
    <main class="bg-gray-300 p-6 rounded-md flex">
      <section class="flex flex-col justify-between mr-6">
        <div class="flex flex-col">
          <label for="text-value">Text</label>
          <input v-model="textValue" type="text" id="text-value" />

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
          <input
            v-model="rotateX"
            type="range"
            min="-180"
            max="180"
            id="rotate-x"
          />

          <label for="rotate-y">Rotate Y</label>
          <input
            v-model="rotateY"
            type="range"
            min="-180"
            max="180"
            id="rotate-y"
          />

          <label for="rotate-z">Rotate Z</label>
          <input
            v-model="rotateZ"
            type="range"
            min="-180"
            max="180"
            id="rotate-z"
          />
        </div>

        <div>
          <button
            @click="reset"
            class="px-3 py-2 bg-blue-500 text-white text-sm rounded-md uppercase tracking-wider"
          >
            Reset
          </button>
        </div>
      </section>
      <section>
        <div
          :style="containerStyles"
          class="p-6 bg-gray-100 w-60 h-60 flex items-center justify-center relative overflow-hidden"
        >
          <div
            :style="elementStyles"
            class="p-3 bg-purple-700 text-white flex items-center justify-center absolute"
          >
            {{ textValue }}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// dynamic variables
const perspective = ref(500);
const rotateX = ref(0);
const rotateY = ref(0);
const rotateZ = ref(0);
const textValue = ref("Choose your text!");

// watch
watch(perspective, () => console.log(`perspective: ${perspective.value}`));
watch(rotateX, () => console.log(`rotateX: ${rotateX.value}`));
watch(rotateY, () => console.log(`rotateY: ${rotateY.value}`));
watch(rotateZ, () => console.log(`rotateZ: ${rotateZ.value}`));

// computed
const containerStyles = computed(() => {
  return { perspective: `${perspective.value}px` };
});

const elementStyles = computed(() => {
  return {
    transformStyle: `preserve-3d`,
    transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) rotateZ(${rotateZ.value}deg)`,
  };
});

// methods
const reset = () => {
  perspective.value = 500;
  rotateX.value = 0;
  rotateY.value = 0;
  rotateZ.value = 0;
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
