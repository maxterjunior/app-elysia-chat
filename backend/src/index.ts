import { Elysia, } from "elysia";
import { wsRegister } from "./routes/ws";
import { authRegister } from "./routes/auth";
import { jobsRegister } from "./jobs/sockets.job";
import { testRegister } from "./routes/test";

const app = new Elysia()
  .use(testRegister)
  .use(wsRegister)
  .use(authRegister)
// .use(jobsRegister)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.url?.origin}`
);