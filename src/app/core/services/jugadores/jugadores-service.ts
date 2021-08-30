import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })

export class JugadoresService {

    constructor(private http:HttpClient){
    }

    obtenerLigas(page){
        const url = `${environment.apiBase}players?_page=${page}&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    busquedaPorNombre(nombre){
        const url = `${environment.apiBase}players?Nombre%20De%20La%20Liga=${nombre}&_page=1&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

}
