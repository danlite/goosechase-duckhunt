import { MissionDataSource } from "./mission";

import knex from "knex";
const pg = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
});

export type ApplicationDataSources = {
  missionAPI: MissionDataSource;
};

const applicationDataSources: ApplicationDataSources = {
  missionAPI: new MissionDataSource(pg),
};

export default () => applicationDataSources;
