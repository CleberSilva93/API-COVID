import cheerio from "cheerio";
import axios from "axios";
import Covid from "../models/Covid";
class Scrapping {
    public async execute(url: string, fonte?: String, date?: Date) {
        let index = 0;
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const body = $("body").find("div[id='imagenet-conteudo'] > p");

        while (true) {
            let confirmed = 0;
            const search = $(body[index]).text().toLowerCase().trim();
            const arraySearch = search.split(" ");
            if (arraySearch.length <= 3) {
                arraySearch.forEach((word) => {
                    if (word == "casos" || word == "confirmados") {
                        confirmed++;
                    }
                });
            }
            if (confirmed >= 2 || index > 10) {
                break;
            }
            index++;
        }

        if (fonte == "PortalPiracicaba" && index <= 10) {
            const body = $("body").find("div[id='imagenet-conteudo'] > p");

            const oldStatus = await Covid.findOne({}).sort({
                field: "asc",
                date: -1,
            });

            const positivados = $(body[0 + index])
                .text()
                .toLowerCase()
                .replace("casos confirmados", "")
                .trim()
                .replace(/\D+/g, "");

            const suspeitos = $(body[1 + index])
                .text()
                .toLowerCase()
                .replace("casos suspeitos", "")
                .trim()
                .replace(/\D+/g, "");

            const descartados = $(body[2 + index])
                .text()
                .toLowerCase()
                .replace("casos descartados", "")
                .trim()
                .replace(/\D+/g, "");

            const recuperados = $(body[3 + index])
                .text()
                .toLowerCase()
                .replace("casos recuperados", "")
                .trim()
                .replace(/\D+/g, "");

            const tratamento = $(body[4 + index])
                .text()
                .toLowerCase()
                .replace("pessoas em tratamento", "")
                .trim()
                .replace(/\D+/g, "");

            const obitos = $(body[5 + index])
                .text()
                .toLowerCase()
                .replace("óbitos", "")
                .trim()
                .replace(/\D+/g, "");

            let res = {
                Obito: 0,
                Positivados: 0,
                Tratamento: 0,
                Suspeitos: 0,
                Recuperados: 0,
                Descartados: 0,
            };

            if (!!oldStatus) {
                res.Obito = +obitos - +oldStatus?.obitos;
                res.Positivados = +positivados - +oldStatus?.positivados;
                res.Tratamento = +tratamento - +oldStatus?.tratamento;
                res.Suspeitos = +suspeitos - +oldStatus?.suspeitos;
                res.Recuperados = +recuperados - +oldStatus?.recuperados;
                res.Descartados = +descartados - +oldStatus?.descartados;
            }

            const retorno = new Covid({
                obitos,
                positivados,
                tratamento,
                suspeitos,
                recuperados,
                descartados,
                newObitos: res.Obito,
                newPositivados: res.Positivados,
                newTratamento: res.Tratamento,
                newSuspeitos: res.Suspeitos,
                newRecuperados: res.Recuperados,
                newDescartados: res.Descartados,
                date,
            });
            await retorno.save();
        }
    }
}

export default Scrapping;
