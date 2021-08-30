import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEquiposComponent } from './modules/Equipos/lista-equipos/lista-equipos.component';
import { ListaLigasComponent } from './modules/Ligas/lista-ligas/lista-ligas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ligas' },
  //{ path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  { path: 'ligas', component: ListaLigasComponent},
  { path: 'equipo', component: ListaEquiposComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
