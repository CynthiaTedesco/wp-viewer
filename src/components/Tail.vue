<template>
  <svg
    v-if="drawTail"
    class="absolute -bottom-[25px]"
    :class="
      isMine ? '-right-[25px] fill-mine-dark' : '-left-[25px] fill-theirs-dark'
    "
    width="60"
    height="60"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20 Q5 25, 20 30 Q15 25, 20 20 Q15 15, 10 20 Z"
      :transform="!isMine ? 'scale(-1, 1) translate(-40, 0)' : ''"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isMine: boolean;
  nextMessageIsMine: boolean;
}>();

const drawTail = computed(() => props.isMine !== props.nextMessageIsMine);
</script>

<style scoped></style>
