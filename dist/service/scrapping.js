"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var axios_1 = __importDefault(require("axios"));
var typeorm_1 = require("typeorm");
var date_fns_1 = require("date-fns");
var CovidRepository_1 = __importDefault(require("../repositories/CovidRepository"));
var Mes = [
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
var Scrapping = /** @class */ (function () {
    function Scrapping() {
    }
    Scrapping.prototype.execute = function (url, dateConsider) {
        return __awaiter(this, void 0, void 0, function () {
            var covidRepository, html, $, body;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        covidRepository = typeorm_1.getCustomRepository(CovidRepository_1.default);
                        console.log("Chegou aqui");
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        html = _a.sent();
                        $ = cheerio_1.default.load(html.data);
                        body = $("body").find("div[class='_1xnd'] > div");
                        return [4 /*yield*/, body.each(function (idx, el) { return __awaiter(_this, void 0, void 0, function () {
                                var dia, mes, dateFormated, data, dateEnd, date, result, dados, obitos, positivados, tratamento, suspeitos, recuperados, descartados, covid;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            data = $(el).text().toLowerCase();
                                            if (!(data.indexOf("covid-19 em piracicaba") != -1)) return [3 /*break*/, 2];
                                            dateEnd = data.indexOf("·");
                                            date = data.substring(12, dateEnd);
                                            if (date.includes("de")) {
                                                dia = date.substring(0, 2).trim();
                                                mes = date.substring(6, date.indexOf("às")).trim();
                                                Mes.forEach(function (data) {
                                                    if (data[0] == mes) {
                                                        mes = data[1];
                                                    }
                                                });
                                                dateFormated = new Date("2020," + mes + "," + dia);
                                            }
                                            else {
                                                dateFormated = new Date();
                                            }
                                            if (dateConsider) {
                                                result = !!dateFormated
                                                    ? date_fns_1.isEqual(dateFormated, new Date())
                                                    : false;
                                                if (!result) {
                                                    return [2 /*return*/];
                                                }
                                            }
                                            else {
                                                dateFormated = new Date(dateFormated.getFullYear(), dateFormated.getMonth(), dateFormated.getDate() - 1);
                                            }
                                            dados = data.substring(data.indexOf("pracegover"), data.length);
                                            obitos = dados
                                                .substring(dados.indexOf(", com") + 5, dados.indexOf("óbitos"))
                                                .trim();
                                            positivados = dados
                                                .substring(dados.indexOf("óbitos") + 7, dados.indexOf("positivados"))
                                                .trim();
                                            tratamento = dados
                                                .substring(dados.indexOf("positivados") + 12, dados.indexOf("em tratamento"))
                                                .trim();
                                            suspeitos = dados
                                                .substring(dados.indexOf("em tratamento") + 14, dados.indexOf("suspeitos"))
                                                .trim();
                                            recuperados = dados
                                                .substring(dados.indexOf("suspeitos") + 10, dados.indexOf("recuperados"))
                                                .trim();
                                            descartados = dados
                                                .substring(dados.indexOf("recuperados") + 14, dados.indexOf("casos descartados"))
                                                .trim();
                                            covid = covidRepository.create({
                                                obitos: obitos,
                                                descartados: descartados,
                                                positivados: positivados,
                                                recuperados: recuperados,
                                                suspeitos: suspeitos,
                                                tratamento: tratamento,
                                                date: dateFormated,
                                            });
                                            return [4 /*yield*/, covidRepository.save(covid)];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Scrapping;
}());
exports.default = Scrapping;
