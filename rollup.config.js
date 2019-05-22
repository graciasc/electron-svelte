import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import postcss from 'postcss'
import tailwind from 'tailwindcss'
// import commonjs from 'rollup-plugin-commonjs';
// import livereload from 'rollup-plugin-livereload';
// import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: ['src/index.js', 'src/app.js'],
	output: {
		sourcemap: true,
		// format: 'iife',
		format: 'cjs',
		name: 'app',
		dir: 'dist/'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			preprocess: {
				style: async ({ content, filename }) => {
					const { css } = await postcss([
						tailwind
					]).process(content, { from: filename})
					return {code: css}
				}
			},
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('dist/app.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		// commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		// !production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		// production && terser()

		copy({
			targets: [
        'src/index.html'
      ],
      outputFolder: 'dist'
		})
	],
	watch: {
		clearScreen: true
	}
};