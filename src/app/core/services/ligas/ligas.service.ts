import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
export class LigasService {
    
    constructor(private http: HttpClient){ }

    obtenerLigas(){
        const url = `${environment.apiBase}teams`;
        return this.http.get(url)
    }

}
