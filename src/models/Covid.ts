import mongoose from "mongoose";
export interface ICovid extends mongoose.Document {
    obitos: String;
    positivados: String;
    tratamento: String;
    suspeitos: String;
    recuperados: String;
    descartados: String;
    date: Date;
}

export const CovidSchema = new mongoose.Schema({
    obitos: { type: String },
    positivados: { type: String },
    tratamento: { type: String },
    suspeitos: { type: String },
    recuperados: { type: String },
    descartados: { type: String },
    date: { type: Date },
});

const Covid = mongoose.model<ICovid>("Covid", CovidSchema);
export default Covid;
