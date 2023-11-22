import { Elysia, } from "elysia";
import { wsRegister } from "./routes/ws";
import { authRegister } from "./routes/auth";
import { jobsRegister } from "./jobs/sockets.job";
import { testRegister } from "./routes/test";
import { cors } from '@elysiajs/cors'


const app = new Elysia()
  .use(cors())
  .use(testRegister)
  .use(wsRegister)
  .group('/api', (api) => api
    .use(authRegister)
  )
// .use(jobsRegister)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.url?.origin}`
);