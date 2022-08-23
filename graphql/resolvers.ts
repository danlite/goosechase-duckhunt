import { ApplicationDataSources } from "./dataSources";
import { Resolvers } from "./generated/graphql";

export const resolvers: Resolvers<{ dataSources: ApplicationDataSources }> = {
  Query: {
    missions: async (_, { input }, { dataSources }) =>
      dataSources.missionAPI.listMissions({
        limit: input?.limit ?? 5,
        offset: input?.offset ?? 0,
        typeFilter: input?.typeFilter ?? undefined,
        sort: input?.sort ?? undefined,
      }),
  },
};
