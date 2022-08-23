import { SQLDataSource } from "datasource-sql";
import { Mission } from "../generated/graphql";

interface MissionRecord {
  id: string;
  name: string;
  description: string;
  type: string;
  points: number;
}

export class MissionDataSource extends SQLDataSource {
  async listMissions(options: {
    limit: number;
    offset: number;
    typeFilter?: string[];
    sort?: { field: string; ascending: boolean };
  }): Promise<{ data: Mission[]; total: number }> {
    let filteredQuery = this.db<MissionRecord>("missions");
    if (options.typeFilter?.length) {
      filteredQuery = filteredQuery.whereIn("type", options.typeFilter);
    }

    let dataQuery = filteredQuery
      .clone()
      .limit(options.limit)
      .offset(options.offset);
    if (options.sort)
      dataQuery = dataQuery.orderBy(
        "name",
        options.sort?.ascending ? "asc" : "desc"
      );
    const data = await dataQuery;

    const totalCount = await filteredQuery.clone().count();
    const total = totalCount[0]["count"] as number;

    return { data, total };
  }
}
