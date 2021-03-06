import {IProject} from '../project/IProject';

export interface ProjectPage {
  content: IProject[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    },
    page_size: number;
    page_number: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  total_pages: number;
  total_elements: number;
  last: boolean;
  first: boolean;
  number_of_elements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  number: number;
}
