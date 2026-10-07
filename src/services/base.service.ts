import { api, ApiResponse } from "@/lib/api";

export abstract class BaseService<
  TEntity,
  TCreate = Partial<TEntity>,
  TUpdate = Partial<TEntity>
> {
  constructor(protected readonly endpoint: string) {}

  getAll() {
    return api.get<TEntity[]>(this.endpoint);
  }

  getById(id: string) {
    return api.get<TEntity>(`${this.endpoint}/${id}`);
  }

  create(dto: TCreate) {
    return api.post<TEntity, TCreate>(this.endpoint, dto);
  }

  update(id: string, dto: TUpdate) {
    return api.patch<TEntity, TUpdate>(`${this.endpoint}/${id}`, dto);
  }

  delete(id: string) {
    return api.delete<void>(`${this.endpoint}/${id}`);
  }
}
