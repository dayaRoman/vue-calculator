<template>
    <div class="btn" @click="clickOnActionHandler">
        {{ innerAction }}
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    emits: ["click-on-action"],
    props: {
        innerAction: {
            type: String,
        },
    },
    methods: {
        clickOnActionHandler(): void {
            this.$emit("click-on-action", this.innerAction);
        },
    },
});
</script>
