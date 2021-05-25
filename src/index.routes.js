import express from "express";
import CovidController from "./Controller/CovidController";

const covidController = new CovidController();

const route = express();

route.get("/dados", covidController.show);

export default route;
