import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/image-formats-support.ts',
	output: {
		dir: 'dist',
		format: 'umd',
		//format: 'iife',
		name: 'image-formats-support.js',
	},
	plugins: [typescript()]
};
