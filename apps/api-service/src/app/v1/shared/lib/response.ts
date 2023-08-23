export interface IPaginatedMetadata {
  page: number;
  lastPage: number;
  isLastPage: boolean;
  nextPageExists: boolean;
  totalCount: number;
}
