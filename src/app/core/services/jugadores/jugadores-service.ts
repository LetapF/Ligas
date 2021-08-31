import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Jugador } from 'src/app/shared/models/jugador';


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
        const url = `${environment.apiBase}players?Nombre%20del%20Jugador_like=^${nombre}&_page=1&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    busquedaPorEquipo(teamId){
        const url = `${environment.apiBase}players?teamId_like=${teamId}&_page=1&_limit=10`;
        return this.http.get(url, {observe: 'response'})
    }

    eliminarJugador(id){
        const url = `${environment.apiBase}players/${id}`
        this.http.delete(url).subscribe()
    }

    actualizarJugador(jugador:Jugador){
        const url = `${environment.apiBase}players/${jugador.id}`
        this.http.put(url,jugador).subscribe()
    }

    crearJugador(jugador:Jugador){
        const url = `${environment.apiBase}players`
        this.http.post(url,jugador).subscribe()
    }


}
