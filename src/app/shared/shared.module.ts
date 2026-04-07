import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from './property-card/property-card.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FilerComponent } from './filer/filter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PropertyCardComponent,
    SearchFilterComponent,
    FilerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    FilerComponent
  ]
})
export class SharedModule { }
