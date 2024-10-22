<template>
  <div class="flex items-center gap-2 justify-center">
    <label for="sender-dropdown">Select Sender:</label>
    <div class="flex gap-2 justify-center my-2">
      <div
        v-for="actor in actors"
        :key="actor"
        @click="selected(actor)"
        class="inline-flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer transition duration-200"
        :class="[
          actor === sender
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-800 border-gray-300',
          actor !== sender ? 'hover:text-blue-700' : '',
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

const props = defineProps<{
  actors: string[];
}>();

const messagesStore = useMessagesStore();

const sender = computed(() => messagesStore.sender);

const selected = (sender: string) => {
  messagesStore.setActors(
    sender,
    props.actors.find((a) => a != sender)
  );
};

onMounted(() => selected(props.actors[0]));
</script>

<style scoped></style>
