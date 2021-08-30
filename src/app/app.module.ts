import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//NG ZORRO

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { IconsProviderModule } from './icons-provider.module';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';

//NG ZORRO LANGUAGE CONFIG
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';

//COMPONENTS
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
    NzPaginationModule,
    NzAutocompleteModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
  ],
  providers: [{provide: NZ_I18N, useValue: es_ES}],
  bootstrap: [AppComponent],
})
export class AppModule { }
