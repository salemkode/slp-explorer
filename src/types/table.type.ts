//
type table_cell__text = string | number;

//
interface table_cell__object {
  text: string;
  copy?: boolean;
  url?: string;
  tokenIcon?: string;
  warp?: boolean;
}

//
export type table_cell = table_cell__object | table_cell__text;

//
export type table_row = table_cell[];
