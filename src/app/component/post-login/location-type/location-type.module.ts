import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationTypeRoutingModule } from './location-type-routing.module';
import { LocationTypeComponent } from './location-type.component';
import { LocationTypeFormComponent } from './location-type-form/location-type-form.component';
import { LocationTypeViewComponent } from './location-type-view/location-type-view.component';
import { LocationTypeTableComponent } from './location-type-table/location-type-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    LocationTypeComponent,
    LocationTypeFormComponent,
    LocationTypeViewComponent,
    LocationTypeTableComponent
  ],
  imports: [
    CommonModule,
    LocationTypeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class LocationTypeModule { }
