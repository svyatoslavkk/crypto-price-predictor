import { ChangeEvent } from "react";
import { INews } from "./types";

export interface PaginationProps {
  sortedNews: INews[];
  handlePageChange: (page: number) => void;
  currentPage: number;
};

export interface ClassicInputProps {
  type: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onClick?: () => Promise<void>;
};

export interface NeutralBtnProps {
  buttonText: string;
  state?: string;
  onClick?: () => void;
};

export interface TransparentBtnProps {
  title?: string;
}

export interface StatProps {
  icon: JSX.Element;
  value: number | string | null;
  label: string;
};

export interface DefaultSlideProps {
  urlToImage: string;
  title: string;
  fakeImg: string;
};

export interface HeaderSectionProps {
  title: string;
  link?: string;
  buttonText?: string;
}

export interface ListItemProps {
  id: string;
  image: string;
  title: string;
  fakeImg: string;
  buttonText?: string | undefined;
  onClick?: ((event?: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
};

export interface SquareSnippetItemProps {
  image: string;
  pretitle: number;
  title: string;
  text: number;
}
