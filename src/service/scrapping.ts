import cheerio from "cheerio";
import axios from "axios";
import { isEqual, parseISO } from "date-fns";
import Covid from "../models/Covid";

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
    public async execute(
        url: string,
        dateConsider?: Boolean,
        fonte?: String,
        date?: Date
    ) {
        const index = 2;
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);

        if (fonte == "PortalPiracicaba") {
            const body = $("body").find("div[id='imagenet-conteudo'] > p");

            // return body.each(async (idx, el) => {
            //     let data = $(el).text().toLowerCase();
            //     if (data.indexOf("casos confirmados") != -1) {
            //         data = data.substring(data.indexOf("2021"), data.length);
            //         let dados = data.split("\n");
            let oldStatus = await Covid.findOne({}).sort({
                field: "asc",
                date: -1,
            });

            let positivados = $(body[0 + index])
                .text()
                .toLowerCase()
                .replace("casos confirmados", "")
                .trim()
                .replace(/\D+/g, "");
            let suspeitos = $(body[1 + index])
                .text()
                .toLowerCase()
                .replace("casos suspeitos", "")
                .trim()
                .replace(/\D+/g, "");

            let descartados = $(body[2 + index])
                .text()
                .toLowerCase()
                .replace("casos descartados", "")
                .trim()
                .replace(/\D+/g, "");
            let recuperados = $(body[3 + index])
                .text()
                .toLowerCase()
                .replace("casos recuperados", "")
                .trim()
                .replace(/\D+/g, "");
            let tratamento = $(body[4 + index])
                .text()
                .toLowerCase()
                .replace("pessoas em tratamento", "")
                .trim()
                .replace(/\D+/g, "");
            let obitos = $(body[5 + index])
                .text()
                .toLowerCase()
                .replace("óbitos", "")
                .trim()
                .replace(/\D+/g, "");

            let resObito = 0;
            let resPositivados = 0;
            let resTratamento = 0;
            let resSuspeitos = 0;
            let resRecuperados = 0;
            let resDescartados = 0;
            if (!!oldStatus) {
                resObito = +obitos - +oldStatus?.obitos;
                resPositivados = +positivados - +oldStatus?.positivados;
                resTratamento = +tratamento - +oldStatus?.tratamento;
                resSuspeitos = +suspeitos - +oldStatus?.suspeitos;
                resRecuperados = +recuperados - +oldStatus?.recuperados;
                resDescartados = +descartados - +oldStatus?.descartados;
            }

            const retorno = new Covid({
                obitos,
                positivados,
                tratamento,
                suspeitos,
                recuperados,
                descartados,
                newObitos: resObito,
                newPositivados: resPositivados,
                newTratamento: resTratamento,
                newSuspeitos: resSuspeitos,
                newRecuperados: resRecuperados,
                newDescartados: resDescartados,

                date,
            });
            await retorno.save();
            //     }
            // });
        } else {
            const body = $("body").find("div[class='_1xnd'] > div");

            return body.each(async (idx, el) => {
                let day: String;
                let month: String;
                let dateFormated;
                let data = $(el).text().toLowerCase();
                if (data.indexOf("covid-19 em piracicaba") != -1) {
                    let dateEnd = data.indexOf("·");
                    let date = data.substring(12, dateEnd);
                    if (date.includes("de")) {
                        day = date.substring(0, 2).trim();
                        month = date
                            .substring(6, date.indexOf("2020") - 3)
                            .trim();
                        Mes.forEach((data) => {
                            if (data[0] == month) {
                                month = data[1];
                            }
                        });
                        dateFormated = new Date(`2020,${month},${day}`);
                    } else {
                        dateFormated = new Date();
                        dateFormated = new Date(
                            dateFormated.getFullYear(),
                            dateFormated.getMonth() + 1,
                            dateFormated.getDate() - 1
                        );
                    }

                    if (dateConsider) {
                        const result = !!dateFormated
                            ? isEqual(dateFormated, new Date())
                            : false;
                        if (!result) {
                            return;
                        }
                    }

                    let oldStatus = await Covid.findOne({}).sort({
                        field: "asc",
                        date: -1,
                    });

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
                    let resObito = 0;
                    let resPositivados = 0;
                    let resTratamento = 0;
                    let resSuspeitos = 0;
                    let resRecuperados = 0;
                    let resDescartados = 0;
                    if (!!oldStatus) {
                        resObito = +obitos - +oldStatus?.obitos;
                        resPositivados = +positivados - +oldStatus?.positivados;
                        resTratamento = +tratamento - +oldStatus?.tratamento;
                        resSuspeitos = +suspeitos - +oldStatus?.suspeitos;
                        resRecuperados = +recuperados - +oldStatus?.recuperados;
                        resDescartados = +descartados - +oldStatus?.descartados;
                    }

                    const retorno = new Covid({
                        obitos,
                        positivados,
                        tratamento,
                        suspeitos,
                        recuperados,
                        descartados,
                        newObitos: resObito,
                        newPositivados: resPositivados,
                        newTratamento: resTratamento,
                        newSuspeitos: resSuspeitos,
                        newRecuperados: resRecuperados,
                        newDescartados: resDescartados,

                        date: dateFormated,
                    });
                    await retorno.save();
                }
            });
        }
    }
}

export default Scrapping;
