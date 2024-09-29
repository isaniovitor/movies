import { Dispatch, SetStateAction } from "react";
import { MovieFilters } from "../../@types/movie";
import Select from "../form/select/select";
import genres from "../../data/genres.json";
import { initialFilters } from "../../App";
import "./styles.css";
import Toggle from "../form/toggle/toggle";

type FiltersProps = {
  filters: MovieFilters;
  setFilters: Dispatch<SetStateAction<MovieFilters>>;
};

export default function Filters({ filters, setFilters }: FiltersProps) {
  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="filters__container">
      <input
        className="filters__container__search"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search: e.target.value.toLowerCase(),
          }))
        }
      />

      <div className="filters__container__genres">
        <Select
          options={genres}
          value={filters.genres}
          placeholder="Genres"
          onChange={(genres) =>
            setFilters((prev) => ({
              ...prev,
              genres,
            }))
          }
        />
      </div>

      <div className="filters__container__featured">
        <Toggle
          placeholder="Featureds"
          value={filters.onlyFeatureds}
          onChange={(onlyFeatureds) =>
            setFilters((prev) => ({
              ...prev,
              onlyFeatureds,
            }))
          }
        />
      </div>

      <button
        className="filters__container__clear"
        onClick={() => clearFilters()}
      >
        Clear
      </button>
    </div>
  );
}
