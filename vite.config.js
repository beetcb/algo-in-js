/**
 * @type {import('vite').UserConfig}
 */
const config = () => {
  console.log(process.env.CODESANDBOX_SSE);
  if (process.env.CODESANDBOX_SSE) {
    return {
      logLevel: 'silent',
      server: {
        hmr: {
          clientPort: 443,
        },
      },
    };
  }

  return {};
};

export default config;
