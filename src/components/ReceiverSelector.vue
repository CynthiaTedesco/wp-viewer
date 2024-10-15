<template>
  <div class="flex items-center gap-2 justify-center">
    <label for="receiver-dropdown">Select Receiver:</label>
    <div class="flex gap-2 justify-center my-2">
      <div
        v-for="actor in actors"
        :key="actor"
        @click="selected(actor)"
        class="inline-flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer transition duration-200"
        :class="[
          actor === receiver
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-800 border-gray-300',
          actor !== receiver ? 'hover:text-blue-700' : '',
        ]"
      >
        {{ actor }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  actors: string[];
}>();

const receiver = ref("");

const emit = defineEmits(["select"]);

const selected = (actor: string) => {
  console.log("[Comp] selecting receiver to", actor);
  receiver.value = actor;
  emit("select", actor);
};

onMounted(() => selected(props.actors[0]));
</script>

<style scoped></style>
