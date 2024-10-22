import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessagesStore = defineStore('messages', () => {
  const receiver = ref<string>();
  const sender = ref<string>();

  const setActors = (theSender: string, theReceiver: string | undefined) => {
    sender.value = theSender;
    receiver.value = theReceiver;
  };

  return { setActors, sender };
});
