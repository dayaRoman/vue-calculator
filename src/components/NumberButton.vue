<template>
    <div class="btn" @click="clickOnNumberHandler">
        {{ innerNumber }}
    </div>
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
<style lang="scss">
.btn {
    font-size: 2rem;
    user-select: none;
}
</style>
