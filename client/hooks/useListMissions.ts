import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  ListMissionsDocument,
  ListMissionsQueryVariables,
} from "../queries/generated";

export const useListMissions = (input?: ListMissionsQueryVariables) => {
  const [execute, { loading, error, data: queryData }] = useLazyQuery(
    ListMissionsDocument,
    { variables: input }
  );

  useEffect(() => {
    execute();
  }, [execute]);

  const total = queryData?.missions?.total ?? 0;
  const missions = queryData?.missions?.data ?? [];

  return {
    execute,
    loading,
    error,
    total,
    missions,
  };
};
