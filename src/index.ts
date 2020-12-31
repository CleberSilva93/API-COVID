import "reflect-metadata";
import "dotenv/config";
import interval from "interval-promise";
import Scrapping from "./service/scrapping";
import "./database";

async function main() {
    try {
        const scrapping = new Scrapping();
        console.log("Está funcionando");
        if (process.env.URL) await scrapping.execute(process.env.URL, true);
    } catch (error) {
        console.log(error);
    }
}

interval(async () => {
    await main();
}, 10000);
console.log("Servidor Online");
