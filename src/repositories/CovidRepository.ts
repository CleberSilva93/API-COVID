// import { isEqual } from "date-fns";
import { EntityRepository, Repository } from "typeorm";

import Covid from "../models/Covid";

// interface CovidDTO {
//     obitos: number;
//     positivados: number;
//     tratamento: number;
//     suspeitos: number;
//     recuperados: number;
//     descartados: number;
//     date: Date;
// }

@EntityRepository(Covid)
class CovidRepository extends Repository<Covid> {
    public async findByDate(date: Date): Promise<Covid | null> {
        // const findCovidDate = this.covids.find((covid) => {
        //     isEqual(date, covid.date);
        // });

        const findCovid = await this.findOne({
            where: { date },
        });
        return findCovid || null;
    }
}

export default CovidRepository;
