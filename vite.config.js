/**
 * @type {import('vite').UserConfig}
 */
const config = () => {
  if (process.env.CODESANDBOX_SSE) {
    return {
      logLevel: "silent",
      server: {
        hmr: {
          clientPort: 443
        }
      }
    };
  }

  return {};
};

export default config;
