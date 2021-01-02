import "dotenv/config";
import Scrapping from "./service/scrapping";
import "./database";
import cron from "node-cron";
import express from "express";
import Covid from "./models/Covid";

const app = express();
app.use(express.json());

app.get("/dados", async (req, res) => {
    try {
        let retorno = await Covid.findOne({}).sort({ field: "asc", _id: -1 });
        return res.status(200).json(retorno);
    } catch (error) {
        console.log(error.message);
        return res.status(error.status);
    }
});

async function main(cond: Boolean) {
    try {
        const scrapping = new Scrapping();
        console.log("Está funcionando");
        if (process.env.URL) await scrapping.execute(process.env.URL, cond);
    } catch (error) {
        console.log(error);
    }
}

cron.schedule(
    "30 * * * * *",
    async () => {
        console.log("Atualização");
        await main(true);
    },
    {
        scheduled: true,
        timezone: "America/Sao_Paulo",
    }
);

app.listen(process.env.PORT || 3000, () => {
    console.log("Online");
});
