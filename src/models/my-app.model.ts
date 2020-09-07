import {Entity, model, property} from '@loopback/repository';

@model(


)
export class MyApp extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'string',
    default: '',
    required: true
  })
  email?: string;
  @property({
    type: 'string'
  })
  firstName?: string;
  @property({
    type: 'string'
  })
  lastName?: string;

  constructor(data?: Partial<MyApp>) {
    super(data);
  }
}

export interface MyAppRelations {
  // describe navigational properties here
}

export type MyAppWithRelations = MyApp & MyAppRelations;
