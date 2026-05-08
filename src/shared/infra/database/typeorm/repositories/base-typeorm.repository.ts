import { BaseEntity, DataSource, EntityTarget, FindOptionsWhere, Repository } from 'typeorm'
import { DomainEntity } from '~/shared/domain/entities'
import { IRepository } from '~/shared/domain/repositories/base.repository'
import { IDatabaseMapper } from '~/shared/infra/database/mapper'

export abstract class BaseTypeormRepository<DataMapper extends BaseEntity, Entity extends DomainEntity>
  implements IRepository<Entity>
{
  repository: Repository<DataMapper>
  mapper: IDatabaseMapper

  constructor(connection: DataSource, dataMapper: EntityTarget<DataMapper>, mapper: IDatabaseMapper) {
    this.repository = connection.getRepository(dataMapper)
    this.mapper = mapper
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }

  async save(input: Entity): Promise<Entity> {
    const dataMapper = this.mapper.generateDataMapper(input)
    await this.repository.save(dataMapper)
    return input
  }

  async findByParam(input: IRepository.FindByParamInput<Entity>): IRepository.FindByParamOutput<Entity> {
    const dataMapper = await this.repository.findOne({
      where: {
        [input.key]: input.value,
      } as FindOptionsWhere<DataMapper>,
    })
    if (!dataMapper) return null
    return this.mapper.generateEntity(dataMapper)
  }
}
