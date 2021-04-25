import Scrapping from "./scrapping";
import axios from "axios";
import cheerio from "cheerio";
import etherealEmailLog from "./etherealEmailLog";

const scrapping = new Scrapping();
const EtherealEmailLog = new etherealEmailLog();

export async function StartScrapping(cond: Boolean) {
    try {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let url = process.env.URL_PORTAL || "";

        const html = await axios.get(url);
        const $ = cheerio.load(html.data);

        const body = $("body").find("ul[id='imagenet-editais'] > li");

        let link;
        body.each(async (idx, el) => {
            let a = $(el).find("a");
            let dados = $(a).attr("href");
            let comparedDay = day < 10 ? "0" + day : day;
            let comparedMonth = month < 10 ? "0" + month : month;
            if (
                dados?.indexOf(
                    `coronavirus+${comparedDay}+${comparedMonth}+${year}`
                ) != -1
            ) {
                link = dados;
            }
        });

        console.log("It's Working");
        if (process.env.URL_PORTAL)
            await scrapping.execute(
                `http://www.piracicaba.sp.gov.br/${link}`,
                "PortalPiracicaba",
                new Date(year, month - 1, day, 19)
            );
        await EtherealEmailLog.execute();
    } catch (error) {
        console.log(error);
    }
}
