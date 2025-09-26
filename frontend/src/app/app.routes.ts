import { Routes } from '@angular/router';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { WorkshopDetailComponent } from './components/workshop-detail/workshop-detail.component';
import { GraficosComponent } from './components/graficos/graficos.component';


export const routes: Routes = [
  { path: 'graficos', component: GraficosComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: 'workshops/:id', component: WorkshopDetailComponent },
  { path: 'colaboradores', component: ColaboradoresComponent }
];
