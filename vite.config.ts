import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    publicDir: false,
    build: {
        outDir: 'lib',
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'packages/index.ts'),
            name: 'SignCanvas',
            fileName: 'sign-canvas'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
