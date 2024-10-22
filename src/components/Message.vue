<template>
  <div
    class="relative flex px-4 py-2 rounded-md text-black my-3 text-left w-fit bg-gray-100 max-w-[60%]"
    :class="{
      'bg-gray-100 text-xs mx-auto': informative,
      'text-sm text-white': !informative,
      'ml-auto bg-mine-dark': isMyMessage,
      'mr-auto bg-theirs-dark': !isMyMessage && !informative,
    }"
  >
    {{ messageParts.message }}

    <div
      v-if="isMyMessage"
      class="absolute bottom-0 right-0 w-2 h-2 border-r-8 border-t-8 border-transparent border-t-blue-500"
    ></div>
    <div
      v-else
      class="absolute bottom-0 left-0 w-2 h-2 border-l-8 border-t-8 border-transparent border-t-blue-500"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { messages } from '../utils/constants';
import { useMessagesStore } from '../store/messages';

const props = defineProps<{
  content: string;
}>();

const messagesStore = useMessagesStore();

const messageParts = computed(() => {
  // Apply the regular expression to the message
  const non_informative = props.content.match(messages.NON_INFORMATIVE);
  const other = props.content.match(messages.ALL);

  // If the regex matched the input, assign values; otherwise, return empty fields
  if (non_informative) {
    return {
      date: non_informative[1], // Date
      time: non_informative[2], // Time
      name: non_informative[3], // Name
      message: non_informative[4], // Message content
      media: non_informative[5] ? 'Media omitted' : '', // Media indicator (if present)
    };
  } else if (other) {
    return {
      date: other[1], // Date
      time: other[2], // Time
      message: other[4], // Message content
    };
  } else {
    // Fallback in case the message doesn't match the expected pattern
    return {
      date: '',
      time: '',
      name: '',
      message: '',
      media: '',
    };
  }
});

// const informativeFormat =
const informative = computed(() => messages.INFORMATIVE.test(props.content));

const isMyMessage = computed(
  () => messageParts.value.name === messagesStore.thisActor
);
</script>
