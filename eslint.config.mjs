import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            "no-unused-vars": "warn",
        },
    },
];