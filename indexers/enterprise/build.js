require('esbuild')
  .build({
    entryPoints: [
      'src/collectors/events/index.ts',
      'src/indexers/analytics/index.ts',
      'src/indexers/daos/index.ts',
      'src/indexers/proposals/index.ts',
    ],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: 'es2022',
    outdir: 'dist',
    outbase: 'src',
  })
  .catch(() => process.exit(1));
