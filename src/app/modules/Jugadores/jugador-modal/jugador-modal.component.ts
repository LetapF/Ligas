import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquiposService } from 'src/app/core/services/equipos/equipos.service';
import { JugadoresService } from 'src/app/core/services/jugadores/jugadores-service';
import { Equipo } from 'src/app/shared/models/equipo';
import { Jugador } from '../../../shared/models/jugador';

@Component({
  selector: 'app-jugador-modal',
  templateUrl: './jugador-modal.component.html',
  styleUrls: ['./jugador-modal.component.scss']
})
export class JugadorModalComponent implements OnInit {

  jugador: Jugador;
  equipos: Array<Equipo>;
  titulo: string = 'Actualizar Jugador'
  boton: string = 'Actualizar'

  constructor(
    private dialog_ref: MatDialogRef<JugadorModalComponent>,
    private jugadorService: JugadoresService,
    private equipoService: EquiposService,
    @Inject(MAT_DIALOG_DATA) public data: {res: Jugador},)
    { }

  ngOnInit() {
    this.cargarEquipos()
    this.jugador = this.data.res
    if(!this.jugador.id){
      console.log(this.jugador.id)
      this.titulo = this.titulo.replace('Actualizar','Crear')
      this.boton = 'Crear'
    }
  }

  cargarEquipos(){
    this.equipoService.getAllEquipos().subscribe((res: any) =>{
      this.equipos = res
    })
  }

  actualizarCrearEquipo(){
    if(!this.jugador.id){
      this.jugadorService.crearJugador(this.jugador)
      this.dialog_ref.close()
    } else {
      this.jugadorService.actualizarJugador(this.jugador)
      this.dialog_ref.close()
    }
  }
}
