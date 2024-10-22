<template>
  <div class="flex items-center gap-2 justify-center">
    <label for="thisActor-dropdown">Select this side:</label>
    <div class="flex gap-2 justify-center my-2">
      <div
        v-for="actor in messagesStore.actors"
        :key="actor"
        @click="selected(actor)"
        class="inline-flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer transition duration-200"
        :class="[
          actor === thisActor
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-800 border-gray-300',
          actor !== thisActor ? 'hover:text-blue-700' : '',
        ]"
      >
        {{ actor }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMessagesStore } from '../store/messages';

const messagesStore = useMessagesStore();

const thisActor = computed(() => messagesStore.thisActor);

const selected = (thisActor: string) => {
  messagesStore.setThisActor(thisActor);
};

onMounted(() => selected(messagesStore.actors[0]));
</script>

<style scoped></style>
