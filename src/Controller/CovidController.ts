import { Request, Response } from "express";
import Covid from "../models/Covid";

class CovidController {
    public async show(request: Request, response: Response) {
        try {
            const retorno = await Covid.findOne({}).sort({
                field: "asc",
                date: -1,
            });
            return response.status(200).json(retorno);
        } catch (error) {
            console.log(error.message);
            return response.status(error.status);
        }
    }
}

export default CovidController;
