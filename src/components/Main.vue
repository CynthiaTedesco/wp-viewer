<script setup lang="ts">
import { computed, onBeforeMount, ref, watchEffect } from "vue";
import Message from "./Message.vue";
import ReceiverSelector from "./ReceiverSelector.vue";

import {
  DATE_TIME_PATTERN,
  DATE_TIME_SEPARATOR,
  NEW_LINE_SEPARATOR,
} from "../utils/constants.ts";

const fileContent = ref<string | null>(null);
const messages = ref<string[]>([]);

const actors = computed(() => {
  const actors: Set<string> = new Set();

  messages.value.find((msg) => {
    const parts = msg
      .replace(DATE_TIME_PATTERN, DATE_TIME_SEPARATOR)
      .split(":");

    if (parts.length > 1) {
      const senderParts = parts[0].split("-");
      const actor = senderParts[senderParts.length - 1].trim();
      actors.add(actor);
    }
  });

  return Array.from(actors);
});

const fetchFileContent = async () => {
  try {
    const response = await fetch("/data/WhatsApp Chat with Cynthia ❤.txt");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fileContent.value = await response.text();

    fileContent.value.split("\n").forEach((content) => {
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
    console.error("Error fetching file:", error);
  }
};

const selectReceiver = (actor: string) => {
  console.log("[MAIN] selecting receiver to", actor);
  receiver.value = actor;
};

onBeforeMount(() => fetchFileContent());
</script>

<template>
  {{ actors }}
  <ReceiverSelector :actors="actors" @select="selectReceiver" />

  <Message
    v-for="(message, i) in messages.slice(0, 100)"
    :key="`${message.split(',')[0]}-${i}`"
    :content="message"
  >
  </Message>
  <!-- <MessageReceived />
  <MessageSent /> -->

  <div class="card">
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
