<template>
  <div class="bg-gray-800 h-screen flex items-center justify-center">
    <main class="bg-gray-300 p-6 rounded-md flex">
      <section class="flex flex-col justify-between mr-6">
        <div class="flex flex-col">
          <label for="text-value">Text</label>
          <input
            v-model="textValue"
            :placeholder="defaultText"
            type="text"
            id="text-value"
            class="px-3 py-2 mb-3 rounded-md"
          />

          <label for="text-color">Text Color</label>
          <input
            v-model="textColor"
            type="color"
            id="text-color"
            class="w-full mb-3"
          />

          <label for="background-color">Background Color</label>
          <input
            v-model="backgroundColor"
            type="color"
            id="background-color"
            class="w-full mb-3"
          />

          <label for="perspective">Perspective</label>
          <input
            v-model="perspective"
            type="range"
            min="0"
            max="1000"
            id="perspective"
            class="bg-gray-800 mb-3"
          />

          <label for="rotate-x">Rotate X</label>
          <input
            v-model="rotateX"
            type="range"
            min="-180"
            max="180"
            id="rotate-x"
            class="mb-3"
          />

          <label for="rotate-y">Rotate Y</label>
          <input
            v-model="rotateY"
            type="range"
            min="-180"
            max="180"
            id="rotate-y"
            class="mb-3"
          />

          <label for="rotate-z">Rotate Z</label>
          <input
            v-model="rotateZ"
            type="range"
            min="-180"
            max="180"
            id="rotate-z"
            class="mb-3"
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
          class="p-6 bg-gray-100 w-80 h-full flex items-center justify-center relative overflow-hidden"
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

// static variables
const defaultPerspective = 500;
const defaultRotate = 0;
const defaultText = "Choose your text!";
const defaultTextColor = "#ffffff";
const defaultBackgroundColor = "#6d28d9";

// dynamic variables
const perspective = ref(defaultPerspective);
const rotateX = ref(defaultRotate);
const rotateY = ref(defaultRotate);
const rotateZ = ref(defaultRotate);
const textValue = ref(defaultText);
const textColor = ref(defaultTextColor);
const backgroundColor = ref(defaultBackgroundColor);

// watch
watch(perspective, () => console.log(`perspective: ${perspective.value}`));
watch(rotateX, () => console.log(`rotateX: ${rotateX.value}`));
watch(rotateY, () => console.log(`rotateY: ${rotateY.value}`));
watch(rotateZ, () => console.log(`rotateZ: ${rotateZ.value}`));
watch(textValue, () => console.log(`textValue: ${textValue.value}`));
watch(textColor, () => console.log(`textColor: ${textColor.value}`));
watch(backgroundColor, () =>
  console.log(`backgroundColor: ${backgroundColor.value}`)
);

// computed
const containerStyles = computed(() => {
  return { perspective: `${perspective.value}px` };
});

const elementStyles = computed(() => {
  return {
    color: textColor.value,
    backgroundColor: backgroundColor.value,
    transformStyle: `preserve-3d`,
    transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) rotateZ(${rotateZ.value}deg)`,
  };
});

// methods
const reset = () => {
  perspective.value = defaultPerspective;
  rotateX.value = defaultRotate;
  rotateY.value = defaultRotate;
  rotateZ.value = defaultRotate;
  textValue.value = defaultText;
  textColor.value = defaultTextColor;
  backgroundColor.value = defaultBackgroundColor;
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
