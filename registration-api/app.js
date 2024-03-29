import { Application } from './deps.js';
import * as registrationService from './services/registrationService.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { userMiddleware } from './middlewares/userMiddleware.js';
import { adminMiddleware } from './middlewares/adminMiddleware.js';
import { Snelm } from './deps.js';
import { green, yellow } from 'https://deno.land/std@0.53.0/fmt/colors.ts';
import registrationRouter from './routes/registration.js';
import { Session, PostgresStore } from 'https://deno.land/x/oak_sessions/mod.ts';
import { sql } from './database/database.js';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

const app = new Application();
const snelm = new Snelm('oak');
app.use(oakCors({ origin: 'http://localhost:3000' }));

const store = new PostgresStore(sql, 'session_table');
await store.initSessionsTable();
app.use(Session.initMiddleware(store));

app.use(async (ctx, next) => {
  ctx.response = snelm.snelm(ctx.request, ctx.response);

  await next();
});

app.use(registrationRouter.routes());
app.use(registrationRouter.allowedMethods());

const port = 7777;

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? 'localhost'}:${port}`;
  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

await app.listen({ port });

/*await app.listen({ hostname: '0.0.0.0', port: port });*/
