export interface IDatabaseMapper<Entity = any, DataMapper = any> {
  generateDataMapper(entity: Entity): DataMapper
  generateEntity(dataMapper: DataMapper): Entity
}
