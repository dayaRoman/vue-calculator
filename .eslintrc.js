module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "@vue/airbnb",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        quotes: ["error", "double"],
        indent: ["error", 4],
        "linebreak-style": ["error", "windows"],
        "vuejs-accessibility/click-events-have-key-events": "off",
        "no-trailing-spaces": ["error", { skipBlankLines: true }],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};
