import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { EmissionFactorsService } from './emission-factors.service';
import { EmissionFactor } from './entities/emission-factor.enitity';
import { ConstituentGasesRepository } from './repositories/constituent-gases.repository';

@Crud({
  model: {
    type: EmissionFactor,
  },
  query: {
    join: {
      constituent_gases: {
        eager: true,
      },
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@Controller('emissionFactors')
export class EmissionFactorsController
  implements CrudController<EmissionFactor>
{
  constructor(
    public service: EmissionFactorsService,
    @InjectRepository(ConstituentGasesRepository)
    private readonly constituentGasesRepository: ConstituentGasesRepository,
  ) {}

  get base(): CrudController<EmissionFactor> {
    return this;
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    const ef = await this.base.getOneBase(req);

    await this.base.deleteOneBase(req);

    if (ef?.constituent_gases?.id) {
      await this.constituentGasesRepository.delete({
        id: ef.constituent_gases.id,
      });
    }
  }
}
