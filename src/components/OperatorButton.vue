<template>
    <div class="btn" @click="clickOnOperatorHandler">
        {{ innerOperator }}
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    emits: ["click-on-operator"],
    props: {
        innerOperator: {
            type: String,
        },
    },
    methods: {
        clickOnOperatorHandler(): void {
            this.$emit("click-on-operator", this.innerOperator);
        },
    },
});
</script>
