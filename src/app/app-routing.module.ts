import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizacionComponent } from './modules/Ligas/Visualizacion/Visualizacion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ligas' },
  //{ path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  { path: 'ligas', component: VisualizacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
