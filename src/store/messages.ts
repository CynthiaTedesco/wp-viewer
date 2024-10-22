import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessagesStore = defineStore('messages', () => {
  const thatActor = ref<string>('');
  const thisActor = ref<string>('');
  const actors = ref<string[]>([]);

  const setActors = (theActors: string[]) => {
    actors.value = theActors;
    thisActor.value = theActors[0];
    thatActor.value = theActors.slice(1, theActors.length)[0];
  };

  const setThisActor = (actor: string) => {
    thisActor.value = actor;
    thatActor.value = actors.value?.find((name) => name != actor) || '';
  };

  return { setActors, setThisActor, thisActor, actors };
});
