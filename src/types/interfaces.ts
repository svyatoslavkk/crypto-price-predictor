import { INews } from "./types";

export interface PaginationProps {
  sortedNews: INews[];
  handlePageChange: (page: number) => void;
  currentPage: number;
}