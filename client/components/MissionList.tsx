import { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useEffectOnce, useSet } from "react-use";
import { useListMissions } from "../hooks/useListMissions";
import MissionCard from "./MissionCard";
import MissionPagination from "./MissionPagination";
import MissionTypeFilterToggle from "./MissionTypeFilterToggle";

const MISSIONS_PER_PAGE = 5;

const MissionList: React.FC = () => {
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);
  const [typeFilters, updateTypeFilters] = useSet<string>();
  const [nameSort, setNameSort] = useState<"asc" | "desc" | null>(null);
  const [page, setPage] = useState(0);

  const { execute, loading, missions, total } = useListMissions({
    limit: MISSIONS_PER_PAGE,
    offset: page * MISSIONS_PER_PAGE,
    typeFilter: Array.from(typeFilters.values()),
    sort: nameSort ? { field: "name", ascending: nameSort === "asc" } : null,
  });

  useEffect(() => {
    setPage(0);
  }, [typeFilters]);

  useEffect(() => {
    execute();
  }, [execute, typeFilters, page]);

  useEffectOnce(() => {
    const savedFilters = JSON.parse(
      window.localStorage.getItem("typeFilters") || "[]"
    );
    updateTypeFilters.reset();
    if (savedFilters) {
      for (const savedFilter of savedFilters) {
        updateTypeFilters.add(savedFilter);
      }
    }

    const savedSort = window.localStorage.getItem("nameSort");
    if (savedSort === "asc" || savedSort === "desc") setNameSort(savedSort);
    else setNameSort(null);

    setLoadedFromLocalStorage(true);
  });

  useEffect(() => {
    if (!loadedFromLocalStorage) {
      return;
    }
    window.localStorage.setItem(
      "typeFilters",
      JSON.stringify(Array.from(typeFilters.values()))
    );
    if (nameSort) window.localStorage.setItem("nameSort", nameSort);
    else window.localStorage.removeItem("nameSort");
  }, [typeFilters, nameSort, loadedFromLocalStorage]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex gap-2 items-center">
        <span className="font-bold">Filter:</span>
        {["photo", "text", "location"].map((type) => (
          <MissionTypeFilterToggle
            key={type}
            type={type}
            onChange={(checked) =>
              checked
                ? updateTypeFilters.add(type)
                : updateTypeFilters.remove(type)
            }
            checked={typeFilters.has(type)}
          />
        ))}
      </div>
      {/* List of missions */}
      <div>
        {/* Sortable header */}
        <div className="flex gap-4">
          <div className="w-16"></div>
          <button
            className="inline-flex items-center gap-px font-semibold text-sm py-1"
            onClick={() => {
              setNameSort(
                nameSort === "asc" ? "desc" : nameSort === "desc" ? null : "asc"
              );
            }}
          >
            Name{" "}
            <span className="text-slate-400">
              {nameSort === "asc" ? (
                <FaSortUp />
              ) : nameSort === "desc" ? (
                <FaSortDown />
              ) : (
                <FaSort />
              )}
            </span>
          </button>
        </div>
        {/* Mission cards */}
        {loading
          ? "Loading..."
          : missions.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.name}
                description={mission.description}
                missionType={mission.type}
                points={mission.points}
              />
            ))}
      </div>
      <MissionPagination
        page={page}
        perPage={MISSIONS_PER_PAGE}
        totalCount={total}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default MissionList;
