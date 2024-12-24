// vite.config.js
export default {
    server: {
      proxy: {
        '/scrape': 'http://localhost:3000', // Proxy requests to your Express server
      },
    },
  };
  