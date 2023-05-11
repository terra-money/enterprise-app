require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: 'es2022',
    outdir: 'dist',
    outbase: 'src',
  })
  .catch(() => process.exit(1));
