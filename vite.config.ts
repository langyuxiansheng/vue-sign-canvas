import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const isDemoBuild = mode === 'demo';

    return {
        base: isDemoBuild ? '/vue-sign-canvas/' : '/',
        plugins: [vue()],
        publicDir: isDemoBuild ? 'public' : false,
        build: isDemoBuild
            ? {
                outDir: 'dist',
                emptyOutDir: true
            }
            : {
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
    };
});
