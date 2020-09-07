import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MyAppDataSource} from '../datasources';
import {MyApp, MyAppRelations} from '../models';

export class MyAppRepository extends DefaultCrudRepository<
  MyApp,
  typeof MyApp.prototype.id,
  MyAppRelations
  > {
  constructor(
    @inject('datasources.MyApp') dataSource: MyAppDataSource,
  ) {
    super(MyApp, dataSource);
  }
}
