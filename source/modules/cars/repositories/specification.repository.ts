import { clientPrisma } from '../../../configurations/prisma'
import { ICreateSpecificationDTO, ISpecificationRepository } from './ispecification.repository'
import { Specification } from '.prisma/client'
import { randomUUID } from 'crypto'

class SpecificationRepository implements ISpecificationRepository {
  async findByName (name: string) {
    const specification = await clientPrisma.specification.findFirst({
      where: { name }
    })
    return specification
  }

  async create ({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const createSpecification = await clientPrisma.specification.create({
      data: {
        id: randomUUID(),
        name,
        description,
        createdAt: new Date()
      }
    })
    return createSpecification
  }
}

export { SpecificationRepository }
