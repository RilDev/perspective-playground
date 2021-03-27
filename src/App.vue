<template>
  <div class="px-10 py-24 bg-gray-800 h-screen flex flex-col justify-between">
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
              class="px-3 py-2 mr-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white text-sm rounded-md uppercase tracking-wider transition"
            >
              Reset
            </button>
            <button
              @click="copy"
              class="px-3 py-2 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white text-sm rounded-md uppercase tracking-wider transition"
            >
              {{ computedCopyText }}
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
    <footer class="flex justify-center text-gray-50">
      <a
        href="https://rildev.website"
        target="_blank"
        class="text-blue-500 hover:text-blue-400 mr-1"
        >RilDev</a
      >
      &copy;
      <a
        href="https://github.com/RilDev/perspective-playground"
        target="_blank"
        class="flex text-blue-500 hover:text-blue-400 ml-1"
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current mr-1"
        >
          <path
            d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        GitHub</a
      >
    </footer>
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
const defaultCopyText = "Copy";
const copiedText = "Copied!";

// dynamic variables
const perspective = ref(defaultPerspective);
const rotateX = ref(defaultRotate);
const rotateY = ref(defaultRotate);
const rotateZ = ref(defaultRotate);
const textValue = ref(defaultText);
const textColor = ref(defaultTextColor);
const backgroundColor = ref(defaultBackgroundColor);
const isCopied = ref(false);

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

const computedCopyText = computed(() => {
  if (isCopied.value) {
    return copiedText;
  }

  return defaultCopyText;
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

  // show that content was copied
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 3000);
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
