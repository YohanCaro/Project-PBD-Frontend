import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent} from './components/home/home.component';
import { ReportsComponent} from './components/reports/reports.component';
import { SearchComponent} from './components/search/search.component';
import { TablesComponent} from './components/tables/tables.component';
import { CharsViewComponent } from './components/chars-view/chars-view.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'reports', component:ReportsComponent},
  {path: 'search', component:SearchComponent},
  {path: 'tables', component:TablesComponent},
  {path: 'chars-view', component:CharsViewComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
