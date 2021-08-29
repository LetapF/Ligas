import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//NG ZORRO

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { IconsProviderModule } from './icons-provider.module';

//Componentes
import { VisualizacionComponent } from './modules/Ligas/Visualizacion/Visualizacion.component';


@NgModule({
  declarations: [
    AppComponent,
    VisualizacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzMenuModule,
    NzDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
