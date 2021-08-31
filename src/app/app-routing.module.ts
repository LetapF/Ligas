import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEquiposComponent } from './modules/Equipos/lista-equipos/lista-equipos.component';
import { ListaJugadoresComponent } from './modules/Jugadores/lista-jugadores/lista-jugadores.component';
import { ListaLigasComponent } from './modules/Ligas/lista-ligas/lista-ligas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ligas' },
  //{ path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  { path: 'ligas', component: ListaLigasComponent},
  { path: 'equipo', component: ListaEquiposComponent},
  { path: 'jugadores', component: ListaJugadoresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

