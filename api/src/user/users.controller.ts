import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
