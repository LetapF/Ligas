import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EquiposService } from 'src/app/core/services/equipos/equipos.service';
import { JugadoresService } from 'src/app/core/services/jugadores/jugadores-service';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';
import { Equipo } from 'src/app/shared/models/equipo';
import { Jugador } from 'src/app/shared/models/jugador';
import { JugadorModalComponent } from '../jugador-modal/jugador-modal.component';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {



  titulo: string = 'Lista de jugadores';
  jugadores: Jugador[];
  numberOfJugadores: number;
  index: number;
  confirmModal: NzModalRef;


  constructor(
    private jugadoresService: JugadoresService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private equipoService: EquiposService,
    private notification: NzNotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        if (Object.keys(params).includes('s')) {
          this.searchByName(params['s'])
         } else{
           this.equipoService.getnameByID(params['l']).subscribe((res:Array<Equipo>) =>{
             console.log(res)
             this.titulo='Jugadores de: ' + res[0]['Nombre del equipo']
           })
           this.searchByTeam(params['l'])
        }
      }
      else {
        this.loadData()
      }
    })
  }

  changePage(index) {
    this.jugadoresService.obtenerLigas(index).subscribe((res: any) => {
      this.jugadores = res.body;
    }, error => { })
  }

  showConfirmDelete(equipo,index): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro que quieres eliminar este item?',
      nzContent: 'Eliminaras el equipo: ' + equipo["Nombre del equipo"],
      nzOnOk: () => {
        let eliminado = this.jugadores.splice(index, 1)[0]
        this.jugadoresService.eliminarJugador(eliminado['id'])
        this.numberOfJugadores = this.numberOfJugadores - 1
        this.notification.create(
          'success',
          'Equipo eliminado exitosamente',
          `El equipo ${eliminado['Nombre del equipo']} se elimino correctamente`
        );    
      }
    });
  }

  searchByTeam(teamId){
    this.jugadoresService.busquedaPorEquipo(teamId).subscribe((res : any) =>{
      this.jugadores = res.body
      this.numberOfJugadores = res.headers.get("x-total-count")
    })
    
  }

  openDialogCreate(){
    const dialog_config = new MatDialogConfig();
    const jugador = new Jugador
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data =  {res: jugador}
    this.dialog.open(JugadorModalComponent, dialog_config);
  }

  openDialogUpdate(jugador: Jugador){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data =  {res: jugador}
    this.dialog.open(JugadorModalComponent, dialog_config);
  }

  searchByName(nombre) {
    this.jugadoresService.busquedaPorNombre(nombre).subscribe((res: any) => {
      this.numberOfJugadores = res.headers.get("x-total-count")
      console.log(res.body)
      this.jugadores = res.body;
    }, error => { })

  }

  loadData() {
    this.jugadoresService.obtenerLigas(1).subscribe((res: any) => {
      this.numberOfJugadores = res.headers.get("x-total-count")
      this.jugadores = res.body;
    }, error => { })
  }
}
