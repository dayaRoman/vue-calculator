<template>
    <div @keyup="keyUpHandler" class="calculator">
        <div class="calculator__input-window">
            {{ inputValue }}
        </div>
        <div class="calculator__btns">
            <div class="btns__col">
                <div class="btn">C</div>
                <div class="btn">+/-</div>
                <div class="btn">%</div>
                <NumberButton
                    @clickOnNumber="testClickHandler"
                    :inner-number="7"
                />
                <div class="btn">8</div>
                <div class="btn">9</div>
                <div class="btn">4</div>
                <div class="btn">5</div>
                <div class="btn">6</div>
                <div class="btn">1</div>
                <div class="btn">2</div>
                <div class="btn">3</div>
                <div class="btns__row">
                    <div class="btn">0</div>
                    <div class="btn">,</div>
                </div>
            </div>
            <div class="btns__col">
                <div class="btn">%</div>
                <div class="btn">&#215;</div>
                <div class="btn">-</div>
                <div class="btn">+</div>
                <div class="btn">=</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NumberButton from "./NumberButton.vue";

export default defineComponent({
    components: {
        NumberButton,
    },
    data() {
        return {
            inputValue: 0,
        };
    },
    methods: {
        testClickHandler(num: number): void {
            console.log(num);
        },
        keyUpHandler() {
            console.log(1);
        },
        changeVal(): void {
            this.inputValue = 3;
        },
    },
});
</script>
<style lang="scss" scoped>
.calculator {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 355px;
    transform: translate(-50%, -50%);
    background: linear-gradient(
        167.27deg,
        #f7f8fb -5.94%,
        rgba(247, 248, 251, 0.19) 103.62%
    );
    backdrop-filter: blur(51px);
    padding: 138px 33px 33px;
    border-radius: 39px;
    &__input-window {
        margin-bottom: 80px;
    }
    &__btns {
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 10px;
        .btns {
            &__row {
                display: grid;
                grid-template-columns: 3fr 1fr;
                gap: 10px;
                .btn:first-of-type {
                    width: 100%;
                    border-radius: 32px;
                }
            }
            &__col {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                &:first-of-type {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
        }
        .btn {
            cursor: pointer;
            height: 62px;
            width: 62px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #005db2;
            color: #b2daff;
        }
    }
}
</style>
