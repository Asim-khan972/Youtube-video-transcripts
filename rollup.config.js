import typescript from 'rollup-plugin-typescript2';
export default {
    input: 'src/index.ts',
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            useTsconfigDeclarationDir: true,
        }),
    ],
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    external: ['fs/promises', 'path'],
};
