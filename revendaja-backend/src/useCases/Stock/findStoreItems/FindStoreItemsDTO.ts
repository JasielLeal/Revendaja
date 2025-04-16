export interface FindStoreItemsDTO {
  userId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
}
