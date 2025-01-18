import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationRoutingModule} from './operation-routing.module';
import {RegionComponent} from './region/region.component';
import {DataAnalyticsListComponent} from './data-analytics/list/data-analytics-list.component';
import {ListbuilderComponent} from '../../utility/listbuilder/listbuilder.component';
import {PaginationComponent} from '../../container/pagination/pagination.component';
import {FilterbuilderComponent} from '../../utility/filterbuilder/filterbuilder.component';


@NgModule({
  declarations: [
    RegionComponent,
    DataAnalyticsListComponent
  ],
  imports: [
    CommonModule,
    ListbuilderComponent,
    PaginationComponent,
    OperationRoutingModule,
    FilterbuilderComponent
  ]
})
export class OperationModule { }
