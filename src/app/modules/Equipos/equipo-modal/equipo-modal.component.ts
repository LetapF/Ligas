import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquiposService } from 'src/app/core/services/equipos/equipos.service';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';
import { Equipo } from 'src/app/shared/models/equipo';
import { Liga } from '../../../shared/models/liga';

@Component({
  selector: 'app-equipo-modal',
  templateUrl: './equipo-modal.component.html',
  styleUrls: ['./equipo-modal.component.scss']
})
export class EquipoModalComponent implements OnInit {

  ligas: Array<Liga> =[];
  equipo: Equipo;
  titulo: string = 'Actualizar equipo'
  boton: string = 'Actualizar'


  constructor(
    private dialog_ref: MatDialogRef<EquipoModalComponent>,
    private ligasService: LigasService,
    private equipoService: EquiposService,
    @Inject(MAT_DIALOG_DATA) public data: {res: Equipo},)
    { }

  ngOnInit() {
    this.cargarLigas()
    this.equipo = this.data.res
    console.log(this.equipo.id)
    if(!this.equipo.id){
      console.log(this.equipo.id)
      this.titulo = this.titulo.replace('Actualizar','Crear')
      this.boton = 'Crear'
    }
  }

  cargarLigas(){
    this.ligasService.getAllLigas().subscribe((res: any) =>{
      this.ligas = res
      console.log(this.equipo['Liga'])
      
    })
  }

  actualizarCrearEquipo(){
    if(!this.equipo.id){
      this.equipoService.crearEquipo(this.equipo)
      this.dialog_ref.close()
    } else {
      this.equipoService.actualizarEquipo(this.equipo)
      this.dialog_ref.close()
    }
    
  }
}
