import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
	return {
		css: {
			devSourcemap: mode == 'development' ? true : false,
			postcss     : {
				plugins: [
					autoprefixer({
						grid: true
					})
				]
			}
		},
		plugins: [
			sassGlobImports(),
			viteStaticCopy({
				targets: [
					{
						src : 'resources/fonts/*',
						dest: 'fonts'
					}
				]
			}),
			vue(),
			laravel({
				input  : ['resources/scss/app.scss', 'resources/js/app.js'],
				refresh: true
			})
		],
		resolve: {
			alias: {
				'~': path.join(__dirname, 'resources/js/')
			}
		},
		build: {
			assetsInlineLimit: 0,
			sourcemap        : mode == 'development' ? true : false,
			minify           : mode == 'production' ? 'terser' : false
		}
	};
});
