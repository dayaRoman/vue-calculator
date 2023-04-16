<template>
    <div class="calculator">
        <div class="calculator__input-window">
            {{ inputExpression }}
        </div>
        <div class="calculator__btns">
            <div class="btns__col">
                <ActionButton
                    v-for="(action, index) of $options.actions"
                    @click-on-action="testActionHandler"
                    :key="index"
                    :inner-action="action"
                />
                <NumberButton
                    v-for="(number, index) of $options.numbers"
                    @click-on-number="testNumberHandler"
                    :key="index"
                    :inner-number="number"
                />
                <div class="btns__row">
                    <NumberButton
                        :inner-number="0"
                        @click-on-number="testNumberHandler"
                    />
                    <ActionButton
                        :inner-action="','"
                        @click-on-action="testActionHandler"
                    />
                </div>
            </div>
            <div class="btns__col">
                <OperatorButton
                    v-for="(operator, index) of $options.operators"
                    @click-on-operator="testOperatorHandler"
                    :key="index"
                    :inner-operator="operator"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import NumberButton from "@/components/NumberButton.vue";
import OperatorButton from "@/components/OperatorButton.vue";
import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
    operators: ["/", "* ", "-", "+", "="],
    numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3],
    actions: ["C", "+/-", "%"],
    components: {
        NumberButton,
        OperatorButton,
        ActionButton,
    },
    data() {
        return {
            inputValue: "0",
            history: [0, 0],
            chosedOperator: "",
            expressionHasOperator: false,
        };
    },
    computed: {
        inputExpression(): string {
            if (this.chosedOperator) {
                if (!this.inputValue) {
                    return `${this.history[0]} ${this.chosedOperator}`;
                }
                return `${this.history[0]} ${this.chosedOperator} ${this.history[1]}`;
            }
            return `${this.history[0]}`;
        },
    },
    methods: {
        testNumberHandler(num: number): void {
            if (!(num === 0 && this.inputExpression === "0")) {
                if (this.inputValue === "0") {
                    this.inputValue = num.toString();
                } else {
                    this.inputValue += num.toString();
                }

                if (!this.chosedOperator) {
                    this.history[0] = +this.inputValue;
                    return;
                }
                this.history[1] = +this.inputValue;
            }
        },
        testOperatorHandler(operator: string): void {
            if (!this.chosedOperator) {
                this.chosedOperator = operator;
                this.inputValue = "";
                return;
            }
            this.calculate();
        },
        testActionHandler(action: string): void {
            console.log(action);
        },
        calculate(): void {
            console.log(this.history.reduce((a, b) => a + b, 0));
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