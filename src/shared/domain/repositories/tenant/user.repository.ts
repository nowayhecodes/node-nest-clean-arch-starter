import { User } from '~/shared/domain/entities'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
  softDelete(id: string): Promise<void>
}
