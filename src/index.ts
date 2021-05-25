import cron from "node-cron";
import express from "express";
import cors from "cors";
import { StartScrapping } from "./service/StartScrapping";
import routes from "./index.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

cron.schedule(
    "00 11 22 * * *",
    async () => {
        await StartScrapping(false);
    },
    {
        scheduled: true,
        timezone: "America/Sao_Paulo",
    }
);

app.listen(process.env.PORT || 4545, () => {
    console.log("Online");
});

export default app;
