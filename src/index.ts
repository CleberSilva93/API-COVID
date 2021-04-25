import "dotenv/config";
import "./database";
import cron from "node-cron";
import express from "express";
import Covid from "./models/Covid";
import cors from "cors";
import { StartScrapping } from "./service/StartScrapping";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/dados", async (req, res) => {
    try {
        const retorno = await Covid.findOne({}).sort({
            field: "asc",
            date: -1,
        });
        return res.status(200).json(retorno);
    } catch (error) {
        console.log(error.message);
        return res.status(error.status);
    }
});

cron.schedule(
    "00 10 21 * * *",
    async () => {
        console.log("Update");
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
