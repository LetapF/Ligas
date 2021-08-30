import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
export class EquiposService {

    constructor(private http: HttpClient){

    }

    obtenerLigas(page){
        const url = `${environment.apiBase}teams?_page=${page}&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    busquedaPorNombre(nombre){
        const url = `${environment.apiBase}teams?Nombre%20del%20equipo_like=${nombre}&_page=1&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    busquedaPorliga(liga){
        const url = `${environment.apiBase}teams?Liga_like=${liga}&_page=1&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    eliminarEquipo(id){
        const url = `${environment.apiBase}teams/${id}`
        this.http.delete(url).subscribe()
    }

}
