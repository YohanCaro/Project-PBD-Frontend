import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SideBarComponent} from './components/side-bar/side-bar.component';
import { ReportsComponent} from './components/reports/reports.component';
import { SearchComponent} from './components/search/search.component';
import { TablesComponent} from './components/tables/tables.component';
import { CharsViewComponent } from './components/chars-view/chars-view.component';

const routes: Routes = [
  {path: 'side-bar', component:SideBarComponent},
  {path: 'reports', component:ReportsComponent},
  {path: 'search', component:SearchComponent},
  {path: 'tables', component:TablesComponent},
  {path: 'chars-view', component:CharsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
