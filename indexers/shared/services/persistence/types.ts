export type KeySelector<Entity> = (data: Entity) => string | number | Buffer;

export interface Persistence<Entity> {
  save(entities: Entity[]): Promise<boolean>;
  delete(entities: Entity[]): Promise<boolean>;
  get(pk: string, sk: string | number | Buffer): Promise<Entity | undefined>;
}
