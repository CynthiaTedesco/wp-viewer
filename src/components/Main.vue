<script setup lang="ts">
import { computed, onBeforeMount, ref, watchEffect } from 'vue';
import Message from './Message.vue';
import thisActorSelector from './thisActorSelector.vue';
import { parseToCSV } from '../utils/parser.js';
import { useMessagesStore } from '../store/messages.ts';

import {
  DATE_TIME_PATTERN,
  DATE_TIME_SEPARATOR,
  NEW_LINE_SEPARATOR,
} from '../utils/constants.ts';

const messagesStore = useMessagesStore();
const messages = ref<string[]>([]);

// TODO paginate properly
const page1 = computed(() => {
  return messages.value.slice(0, 100);
});

const fileContent = ref<string | null>(null);

const setActors = () => {
  const actors: Set<string> = new Set();
  messages.value.find((msg) => {
    const parts = msg
      .replace(DATE_TIME_PATTERN, DATE_TIME_SEPARATOR)
      .split(':');

    if (parts.length > 1) {
      const senderParts = parts[0].split('-');
      const actor = senderParts[senderParts.length - 1].trim();
      actors.add(actor);
    }
  });

  messagesStore.actors = Array.from(actors);
};

const fetchFileContent = async () => {
  try {
    const response = await fetch('/data/WhatsApp Chat with Cynthia ❤.txt');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fileContent.value = await response.text();

    fileContent.value.split('\n').forEach((content) => {
      const line = content.trim();

      if (DATE_TIME_PATTERN.test(line)) {
        messages.value.push(line);
      } else {
        const lastIndex = messages.value.length - 1;
        messages.value[lastIndex] =
          messages.value[lastIndex] + NEW_LINE_SEPARATOR + line;
      }
    });
  } catch (error) {
    console.error('Error fetching file:', error);
  }
};

onBeforeMount(() => {
  fetchFileContent();
});
watchEffect(() => {
  if (fileContent.value) {
    console.log(parseToCSV(fileContent.value));
    setActors();
  }
});
</script>

<template>
  {{ messagesStore.actors }}
  <thisActorSelector />

  <template v-if="page1">
    <Message
      v-for="(message, i) in page1"
      :key="`${message.split(',')[0]}-${i}`"
      :content="message"
    >
    </Message>
  </template>
</template>
