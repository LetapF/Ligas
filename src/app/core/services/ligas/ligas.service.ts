import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
export class LigasService {
    
    constructor(private http: HttpClient){ }

    obtenerLigas(page){
        const url = `${environment.apiBase}teams?_page=${page}&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    busquedaPorNombre(nombre){
        const url = `${environment.apiBase}teams?Nombre%20De%20La%20Liga=${nombre}&_page=1&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

}
