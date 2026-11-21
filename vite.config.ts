import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import contactHandler, { type ContactRequest } from './api/contact';

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      const smtpVariables = [
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
        'CONTACT_EMAIL_TO',
      ];

      for (const key of smtpVariables) {
        if (process.env[key] === undefined && env[key] !== undefined) {
          process.env[key] = env[key];
        }
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/contact') {
          next();
          return;
        }

        try {
          const chunks: Buffer[] = [];
          let bodySize = 0;
          for await (const chunk of req) {
            const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            bodySize += buffer.length;
            if (bodySize > 16_384) {
              res.statusCode = 413;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ message: 'Request body is too large.' }));
              return;
            }
            chunks.push(buffer);
          }

          try {
            (req as ContactRequest).body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          } catch {
            (req as ContactRequest).body = undefined;
          }

          await contactHandler(req as ContactRequest, res);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          lenis: ['lenis'],
        },
      },
    },
  },
});
