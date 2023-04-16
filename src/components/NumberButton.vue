<template>
    <button class="btn" @click="clickOnNumberHandler">
        {{ innerNumber }}
    </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    emits: ["click-on-number"],
    props: {
        innerNumber: {
            type: Number,
        },
    },
    methods: {
        clickOnNumberHandler(): void {
            this.$emit("click-on-number", this.innerNumber);
        },
    },
});
</script>
