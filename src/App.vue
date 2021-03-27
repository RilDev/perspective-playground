<template>
  <div class="px-10 py-24 bg-gray-800 h-screen">
    <header>
      <div class="text-5xl text-gray-50 text-center font-bold">
        Perspective Playground
      </div>
    </header>
    <div class="flex flex-col items-center justify-center h-full">
      <main class="bg-gray-300 p-6 rounded-md flex">
        <section class="flex flex-col justify-between mr-6">
          <div class="flex flex-col">
            <input
              v-model="textValue"
              :placeholder="defaultText"
              type="text"
              id="text-value"
              class="px-3 py-2 mb-3 rounded-md"
            />

            <label for="text-color">Text Color: {{ textColor }}</label>
            <input
              v-model="textColor"
              type="color"
              id="text-color"
              class="w-full mb-3"
            />

            <label for="background-color"
              >Background Color: {{ backgroundColor }}</label
            >
            <input
              v-model="backgroundColor"
              type="color"
              id="background-color"
              class="w-full mb-3"
            />

            <label for="perspective">Perspective: {{ perspective }}px</label>
            <input
              v-model="perspective"
              type="range"
              min="0"
              max="1000"
              id="perspective"
              class="bg-gray-800 mb-3"
            />

            <label for="rotate-x">Rotate X: {{ rotateX }}deg</label>
            <input
              v-model="rotateX"
              type="range"
              min="-180"
              max="180"
              id="rotate-x"
              class="mb-3"
            />

            <label for="rotate-y">Rotate Y: {{ rotateY }}deg</label>
            <input
              v-model="rotateY"
              type="range"
              min="-180"
              max="180"
              id="rotate-y"
              class="mb-3"
            />

            <label for="rotate-z">Rotate Z: {{ rotateZ }}deg</label>
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
              class="px-3 py-2 mr-2 bg-blue-500 text-white text-sm rounded-md uppercase tracking-wider"
            >
              Reset
            </button>
            <button
              @click="copy"
              class="px-3 py-2 bg-green-500 text-white text-sm rounded-md uppercase tracking-wider"
            >
              Copy
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// static variables
const defaultPerspective = 100;
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

const copy = () => {
  // create textarea that will hold content to copy to clipboard
  const element = document.createElement("textarea");

  // set element's css and content
  element.setAttribute("readonly", "");
  element.style.position = "absolute";
  element.style.left = "-10000px";
  element.value = `<div class="card">${textValue.value}</div>

<style>
  .card {
    position: absolute;
    color: ${textColor.value};
    background-color: ${backgroundColor.value};
    transform-style: preserve-3d;
    transform: perspective(${perspective.value}px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) rotateZ(${rotateZ.value}deg);
    padding: 12px;
  }
</style>`;

  // copy element value to clipboard
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
