import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {MyApp} from '../models';
import {MyAppRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(MyAppRepository)
    public myAppRepository : MyAppRepository,
  ) {}

  @post('/my-apps', {
    responses: {
      '200': {
        description: 'MyApp model instance',
        content: {'application/json': {schema: getModelSchemaRef(MyApp)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyApp, {
            title: 'NewMyApp',
            exclude: ['id'],
          }),
        },
      },
    })
    myApp: Omit<MyApp, 'id'>,
  ): Promise<MyApp> {
    return this.myAppRepository.create(myApp);
  }

  @get('/my-apps/count', {
    responses: {
      '200': {
        description: 'MyApp model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MyApp) where?: Where<MyApp>,
  ): Promise<Count> {
    return this.myAppRepository.count(where);
  }

  @get('/my-apps', {
    responses: {
      '200': {
        description: 'Array of MyApp model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MyApp, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MyApp) filter?: Filter<MyApp>,
  ): Promise<MyApp[]> {
    return this.myAppRepository.find(filter);
  }

  @patch('/my-apps', {
    responses: {
      '200': {
        description: 'MyApp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyApp, {partial: true}),
        },
      },
    })
    myApp: MyApp,
    @param.where(MyApp) where?: Where<MyApp>,
  ): Promise<Count> {
    return this.myAppRepository.updateAll(myApp, where);
  }

  @get('/my-apps/{id}', {
    responses: {
      '200': {
        description: 'MyApp model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MyApp, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MyApp, {exclude: 'where'}) filter?: FilterExcludingWhere<MyApp>
  ): Promise<MyApp> {
    return this.myAppRepository.findById(id, filter);
  }

  @patch('/my-apps/{id}', {
    responses: {
      '204': {
        description: 'MyApp PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyApp, {partial: true}),
        },
      },
    })
    myApp: MyApp,
  ): Promise<void> {
    await this.myAppRepository.updateById(id, myApp);
  }

  @put('/my-apps/{id}', {
    responses: {
      '204': {
        description: 'MyApp PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() myApp: MyApp,
  ): Promise<void> {
    await this.myAppRepository.replaceById(id, myApp);
  }

  @del('/my-apps/{id}', {
    responses: {
      '204': {
        description: 'MyApp DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.myAppRepository.deleteById(id);
  }
}
