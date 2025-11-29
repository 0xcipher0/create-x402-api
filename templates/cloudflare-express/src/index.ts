import express from "express";
import { httpServerHandler } from "cloudflare:node";
import { paymentMiddleware } from "x402-express";

const payTo = "0x1cc3fdfe7096cf14daaacdc7e2ced93665e5d72c";
const facilitatorUrl = "https://x402.org/facilitator";

const app = express();

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

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(3000);

export default httpServerHandler({ port: 3000 });
