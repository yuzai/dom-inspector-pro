import type { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const config: RollupOptions = {
  input: 'demo/index.ts',
  output: [
    {
      dir: 'demo',
      format: 'umd',
    },
  ],
  plugins: [
    typescript(),
    serve(),
    postcss(),
    livereload(),
  ],
};

export default config;