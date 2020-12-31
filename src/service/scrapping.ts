import cheerio from "cheerio";
import axios from "axios";
import { getCustomRepository } from "typeorm";
import { isEqual } from "date-fns";
import CovidRepository from "../repositories/CovidRepository";

let Mes = [
    ["janeiro", "1"],
    ["fevereiro", "2"],
    ["março", "3"],
    ["abril", "4"],
    ["maio", "5"],
    ["junho", "6"],
    ["jullho", "7"],
    ["agosto", "8"],
    ["setembro", "9"],
    ["outubro", "10"],
    ["novembro", "11"],
    ["dezembro", "12"],
];

class Scrapping {
    public async execute(url: string, dateConsider?: Boolean) {
        const covidRepository = getCustomRepository(CovidRepository);
        console.log("Chegou aqui");

        const html = await axios.get(url);
        const $ = cheerio.load(html.data);

        const body = $("body").find("div[class='_1xnd'] > div");

        return await body.each(async (idx, el) => {
            let dia: String;
            let mes: String;
            let dateFormated;
            let data = $(el).text().toLowerCase();
            if (data.indexOf("covid-19 em piracicaba") != -1) {
                let dateEnd = data.indexOf("·");
                let date = data.substring(12, dateEnd);
                if (date.includes("de")) {
                    dia = date.substring(0, 2).trim();
                    mes = date.substring(6, date.indexOf("às")).trim();
                    Mes.forEach((data) => {
                        if (data[0] == mes) {
                            mes = data[1];
                        }
                    });
                    dateFormated = new Date(`2020,${mes},${dia}`);
                } else {
                    dateFormated = new Date();
                }

                if (dateConsider) {
                    const result = !!dateFormated
                        ? isEqual(dateFormated, new Date())
                        : false;
                    if (!result) {
                        return;
                    }
                } else {
                    dateFormated = new Date(
                        dateFormated.getFullYear(),
                        dateFormated.getMonth(),
                        dateFormated.getDate() - 1
                    );
                }

                let dados = data.substring(
                    data.indexOf("pracegover"),
                    data.length
                );
                let obitos = dados
                    .substring(
                        dados.indexOf(", com") + 5,
                        dados.indexOf("óbitos")
                    )
                    .trim();
                let positivados = dados
                    .substring(
                        dados.indexOf("óbitos") + 7,
                        dados.indexOf("positivados")
                    )
                    .trim();
                let tratamento = dados
                    .substring(
                        dados.indexOf("positivados") + 12,
                        dados.indexOf("em tratamento")
                    )
                    .trim();
                let suspeitos = dados
                    .substring(
                        dados.indexOf("em tratamento") + 14,
                        dados.indexOf("suspeitos")
                    )
                    .trim();
                let recuperados = dados
                    .substring(
                        dados.indexOf("suspeitos") + 10,
                        dados.indexOf("recuperados")
                    )
                    .trim();
                let descartados = dados
                    .substring(
                        dados.indexOf("recuperados") + 14,
                        dados.indexOf("casos descartados")
                    )
                    .trim();

                const covid = covidRepository.create({
                    obitos,
                    descartados,
                    positivados,
                    recuperados,
                    suspeitos,
                    tratamento,
                    date: dateFormated,
                });

                await covidRepository.save(covid);
            }
        });
    }
}

export default Scrapping;
