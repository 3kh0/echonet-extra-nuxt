<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsContent, type TabsContentProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<TabsContentProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsContent :class="cn('mt-2 ring-offset-zinc-900 bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)" v-bind="delegatedProps">
    <slot />
  </TabsContent>
</template>
