"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { uuid } from "uuidv4";
var typeorm_1 = require("typeorm");
// @PrimaryGeneratedColumn("uuid")
// id: string;
var Covid = /** @class */ (function () {
    function Covid() {
    }
    __decorate([
        typeorm_1.ObjectIdColumn(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], Covid.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Covid.prototype, "obitos", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Covid.prototype, "positivados", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Covid.prototype, "tratamento", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Covid.prototype, "suspeitos", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Covid.prototype, "recuperados", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Covid.prototype, "descartados", void 0);
    __decorate([
        typeorm_1.Column("timestamp"),
        __metadata("design:type", Date)
    ], Covid.prototype, "date", void 0);
    Covid = __decorate([
        typeorm_1.Entity("dbcovid")
    ], Covid);
    return Covid;
}());
exports.default = Covid;
