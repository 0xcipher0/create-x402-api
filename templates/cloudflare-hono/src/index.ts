import { Hono } from "hono";
import { paymentMiddleware } from "x402-hono";
import { cors } from "hono/cors";

const app = new Hono();

const payTo = "0x1cc3fdfe7096cf14daaacdc7e2ced93665e5d72c";
const facilitatorUrl = "https://x402.org/facilitator";

app.use(
  "/*",
  cors({
    origin: "*",
    exposeHeaders: ["X-Payment-Response"],
  }),
);

app.use(
  paymentMiddleware(
    payTo,
    {
      "/ping": {
        price: "$0.01",
        network: "base",
      },
    },
    {
      url: facilitatorUrl,
    },
  ),
);

app.get("/ping", async (c) => {
  return c.json({
    message: "pong",
  });
});

export default app;
