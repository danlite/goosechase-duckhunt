import { gql } from "apollo-server";

export const typeDefs = gql`
  input Sort {
    field: String!
    ascending: Boolean!
  }

  input MissionListInput {
    typeFilter: [String!]
    sort: Sort
    limit: Int
    offset: Int
  }

  type MissionList {
    data: [Mission!]
    total: Int!
  }

  type Query {
    missions(input: MissionListInput): MissionList
  }

  type Mission {
    id: ID!
    name: String!
    description: String!
    type: String!
    points: Int!
  }
`;
