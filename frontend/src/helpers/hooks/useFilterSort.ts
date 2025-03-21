import React, { MouseEvent as ReactMouseEvent } from "react";
import { Review } from "../types/review";
import { SortOrder, FilterType } from "../types/FilterSort";

export const useFilterSort = (initialData: Review[]) => {
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(null);
  const [filter, setFilter] = React.useState<FilterType>(null);

  const sortFilteredData = React.useMemo(() => {
    let updatedData = [...initialData];
    if (filter) {
      updatedData = updatedData.filter(
        (review) => review.userRating === filter
      );
    }

    if (sortOrder) {
      updatedData = updatedData.sort((a, b) => {
        switch (sortOrder) {
          case "a-z":
            return a.title.localeCompare(b.title);

          case "z-a":
            return b.title.localeCompare(a.title);

          case "low-high":
            return a.userRating - b.userRating;

          case "high-low":
            return b.userRating - a.userRating;
        }
      });
    }
    return updatedData;
  }, [sortOrder, filter, initialData]);

  const handleSortOrderChange = (
    event?: ReactMouseEvent<HTMLButtonElement>
  ) => {
    const target = event?.target as HTMLButtonElement;
    const newSortOrder: SortOrder = target.dataset.filterSortValue as SortOrder;
    setSortOrder(prevSortOrder => {
      if (prevSortOrder === newSortOrder) {
        return null
      }

      return newSortOrder
    });
  };

  const handleFilterChange = (event?: ReactMouseEvent<HTMLButtonElement>) => {
    const target = event?.target as HTMLButtonElement;
    const newFilter: FilterType = parseInt(
      target.dataset.filterSortValue as string,
      10
    ) as FilterType;
    setFilter( prevFilter => {
      if (prevFilter === newFilter) {
        return null
      }

      return newFilter
    });
  };

  return { sortFilteredData, handleSortOrderChange, handleFilterChange };
};
