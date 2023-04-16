<template>
    <CalculatorContainer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CalculatorContainer from "@/components/CalculatorContainer.vue";

export default defineComponent({
    name: "App",
    components: {
        CalculatorContainer,
    },
});
</script>

<style lang="scss">
body {
    background: #000;
    position: relative;
}
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #000;
}
</style>
