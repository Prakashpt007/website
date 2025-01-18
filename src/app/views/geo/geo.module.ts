import {NgModule} from "@angular/core";
import {CityFormComponent} from "./city/form/city-form.component";
import {CityListComponent} from "./city/list/city-list.component";
import {CountryFormComponent} from "./country/form/country-form.component";
import {CountryListComponent} from "./country/list/country-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../../container/pagination/pagination.component";
import {FilterbuilderComponent} from "../../utility/filterbuilder/filterbuilder.component";
import {FormbuilderComponent} from "../../utility/formbuilder/formbuilder.component";
import {ListbuilderComponent} from "../../utility/listbuilder/listbuilder.component";
import {ContinentFormComponent} from "./continent/form/continent-form.component";
import {ContinentListComponent} from "./continent/list/continent-list.component";
import {DistrictFormComponent} from "./district/form/district-form.component";
import {DistrictListComponent} from "./district/list/district-list.component";
import {GeoRoutingModule} from "./geo-routing.module";
import {RegionFormComponent} from "./region/form/region-form.component";
import {RegionListComponent} from "./region/list/region-list.component";
import {StateFormComponent} from "./state/form/state-form.component";
import {StateListComponent} from "./state/list/state-list.component";
import { PomListComponent } from './pom/list/pom-list.component';
import { PomFormComponent } from './pom/form/pom-form.component';
@NgModule({
  declarations: [
    CityFormComponent,
    CityListComponent,
    CountryFormComponent,
    CountryListComponent,
    DistrictFormComponent,
    DistrictListComponent,
    StateFormComponent,
    StateListComponent,
    RegionFormComponent,
    RegionListComponent,
    ContinentFormComponent,
    ContinentListComponent,
    PomListComponent,
    PomFormComponent
  ],
  imports: [
    CommonModule,
    GeoRoutingModule,
    FormsModule,
    FormbuilderComponent,
    ListbuilderComponent,
    PaginationComponent,
    FilterbuilderComponent,
  ],
})
export class GeoModule { }
