<template>
    <div class="calculator">
        <div class="calculator__input-window">
            {{ inputExpression }}
        </div>
        <div class="calculator__btns">
            <div class="btns__col">
                <ActionButton
                    v-for="(action, index) in $options.actions"
                    @click-on-action="actionController(action.name)"
                    :key="index"
                    :inner-action="action.action"
                />
                <NumberButton
                    v-for="(number, index) of $options.numbers"
                    @click-on-number="numberClickHandler"
                    :key="index"
                    :inner-number="number"
                />
                <div class="btns__row">
                    <NumberButton
                        :inner-number="0"
                        @click-on-number="numberClickHandler"
                    />
                    <ActionButton
                        :inner-action="','"
                        @click-on-action="actionController('fractional')"
                    />
                </div>
            </div>
            <div class="btns__col">
                <OperatorButton
                    v-for="(operator, index) of $options.operators"
                    @click-on-operator="
                        operatorClickHandler(operator.operator, operator.action)
                    "
                    :key="index"
                    :inner-operator="operator.operator"
                />
                <ActionButton
                    :inner-action="'='"
                    @click-on-action="actionCalculate"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Calculator from "@/models/Calculator";

import NumberButton from "@/components/NumberButton.vue";
import OperatorButton from "@/components/OperatorButton.vue";
import ActionButton from "@/components/ActionButton.vue";

interface IOperator {
    operator: string;
    action: string;
}

export default defineComponent({
    operators: [
        {
            operator: "/",
            action: "divide",
        },
        {
            operator: "*",
            action: "multiply",
        },
        {
            operator: "-",
            action: "minus",
        },
        {
            operator: "+",
            action: "plus",
        },
    ],
    numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3],
    actions: [
        {
            action: "C",
            name: "clear",
        },
        {
            action: "+/-",
            name: "sign-change",
        },
        {
            action: "%",
            name: "percent",
        },
    ],
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
            chosedOperatorName: "",
        };
    },
    computed: {
        inputExpression(): string {
            if (this.chosedOperator) {
                if (!this.inputValue) {
                    return `${this.history[0]} ${this.chosedOperator}`;
                }
                return `${this.history[0]} ${this.chosedOperator} ${this.inputValue}`;
            }
            return this.inputValue;
        },
    },
    methods: {
        numberClickHandler(num: number): void {
            if (!(num === 0 && this.inputExpression === "0")) {
                if (this.inputValue === "0") {
                    this.inputValue = num.toString();
                    return;
                }
                this.inputValue += num.toString();
            }
        },
        operatorClickHandler(operator: string, action: string): void {
            if (!this.chosedOperator) {
                this.chosedOperator = operator;
                this.chosedOperatorName = action;
                this.history[0] = +this.inputValue;
                this.inputValue = "";
                return;
            }

            if (!this.inputValue) {
                if (this.chosedOperator === operator) {
                    this.clearOperator();
                    return;
                }
                this.chosedOperator = operator;
                this.chosedOperatorName = action;
                return;
            }

            this.history[1] = +this.inputValue;

            this.calculatorController(action);
        },
        actionController(actionName: string): void {
            switch (actionName) {
            case "clear":
                this.actionClear();
                break;
            case "sign-change":
                this.actionSignChange();
                break;
            case "percent":
                this.actionPercent();
                break;
            case "fractional":
                this.actionFractional();
                break;
            default:
                console.log(actionName);
                break;
            }
        },
        actionFractional(): void {
            if (this.inputValue.indexOf(".") === -1) {
                this.inputValue = `${this.inputValue}.`;
            }
        },
        actionSignChange(): void {
            this.inputValue = (+this.inputValue * (-1)).toString();
        },
        actionClear(): void {
            this.clearOperator();
            this.history = [0, 0];
            this.inputValue = "0";
        },
        actionPercent(): void {
            this.inputValue = (+this.inputValue / 100).toString();
        },
        clearOperator(): void {
            this.chosedOperator = "";
            this.chosedOperatorName = "";
        },
        calculatorController(action: string): void {
            switch (this.chosedOperatorName) {
            case "plus":
                this.sum();
                break;
            case "multiply":
                this.multipy();
                break;
            case "minus":
                this.minus();
                break;
            case "divide":
                this.division();
                break;
            default:
                throw new Error("undefined operator");
            }
            this.inputValue = this.history[0].toString();
            if (!(this.chosedOperatorName === action)) {
                const newOperator = this.$options.operators.find(
                    (element: IOperator) => element.action === action,
                );
                this.chosedOperator = newOperator.operator;
                this.chosedOperatorName = action;

                this.inputValue = "";
                this.history[1] = 0;
                return;
            }

            this.clearOperator();
            this.history[1] = 0;
        },
        sum(): void {
            this.history[0] = Calculator.sum(this.history);
        },
        minus(): void {
            this.history[0] = Calculator.minus(this.history);
        },
        division(): void {
            this.history[0] = Calculator.division(this.history);
        },
        multipy(): void {
            this.history[0] = Calculator.multiply(this.history);
        },
        actionCalculate(): void {
            if (this.chosedOperatorName) {
                this.history[1] = +this.inputValue;
                this.calculatorController(this.chosedOperatorName);
            }
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
