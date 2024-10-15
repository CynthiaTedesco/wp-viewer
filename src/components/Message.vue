<template>
  <div class="relative bg-gray-100 p-2 rounded text-black mb-1">
    {{ content }}

    <!-- Caret on the bottom left -->
    <div
      class="absolute bottom-0 left-0 w-2 h-2 border-l-8 border-t-8 border-transparent border-t-blue-500"
    ></div>

    <!-- Caret on the bottom right -->
    <div
      class="absolute bottom-0 right-0 w-2 h-2 border-r-8 border-t-8 border-transparent border-t-blue-500"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();
</script>

