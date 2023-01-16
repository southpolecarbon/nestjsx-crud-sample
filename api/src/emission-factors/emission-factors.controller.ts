import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { EmissionFactorsService } from './emission-factors.service';
import { EmissionFactor } from './entities/emission-factor.enitity';

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
  constructor(public service: EmissionFactorsService) {}
}
