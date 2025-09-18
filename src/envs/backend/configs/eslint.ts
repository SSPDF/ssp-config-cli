// ESLint configuration for backend projects
export default {
    ignores: ['dist/**', 'node_modules/**', '.eslintrc.js', 'prettier.config.js'],
    languageOptions: {
        parserOptions: {
            projectService: true,
        },
    },
    rules: {
        // Add custom or override rules here if needed
        // '@typescript-eslint/no-unused-vars': ['warn'],
    },
}


