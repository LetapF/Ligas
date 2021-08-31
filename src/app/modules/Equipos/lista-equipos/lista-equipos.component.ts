import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EquiposService } from 'src/app/core/services/equipos/equipos.service';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Equipo } from 'src/app/shared/models/equipo';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Jugador } from 'src/app/shared/models/jugador';
import { EquipoModalComponent } from '../equipo-modal/equipo-modal.component';
import { Liga } from 'src/app/shared/models/liga';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.component.html',
  styleUrls: ['./lista-equipos.component.scss']
})
export class ListaEquiposComponent implements OnInit {


  titulo: string = 'Lista de equipos';
  equipos: Equipo[];
  numberOfEquipos: number;
  index: number;
  confirmModal: NzModalRef;


  constructor(
    private equipoService: EquiposService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private ligaService: LigasService,
    private notification: NzNotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        if (Object.keys(params).includes('s')) {
          this.searchByName(params['s'])
        } else{
          this.ligaService.getnameByID(params['l']).subscribe((res : Liga) =>{
            console.log(res)
            this.titulo='Equipos de la liga: ' + res[0]['Nombre De La Liga']
          })
          this.searchByLiga(params['l'])
        }
      }
      else {
        this.loadData()
      }
    })
  }

  changePage(index) {
    this.equipoService.obtenerLigas(index).subscribe((res: any) => {
      this.equipos = res.body;
    }, error => { })
  }

  showConfirmDelete(equipo,index): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro que quieres eliminar este item?',
      nzContent: 'Eliminaras el equipo: ' + equipo["Nombre del equipo"],
      nzOnOk: () => {
        let eliminado = this.equipos.splice(index, 1)[0]
        this.numberOfEquipos = this.numberOfEquipos - 1
        //this.equipoService.eliminarEquipo(eliminado['id'])
        this.notification.create(
          'success',
          'Equipo eliminado exitosamente',
          `El equipo ${eliminado['Nombre del equipo']} se elimino correctamente`
        );    
      }
    });
  }


  openDialogCreate(){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data =  {res: new Equipo}
    this.dialog.open(EquipoModalComponent, dialog_config);

  }

  openDialogUpdate(equipo: Equipo){
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '60%';
    dialog_config.height = '80%';
    dialog_config.data =  {res: equipo}
    this.dialog.open(EquipoModalComponent, dialog_config);

  }


  searchByLiga(liga){
    this.equipoService.busquedaPorliga(liga).subscribe((res: any) => {
      this.numberOfEquipos = res.headers.get("x-total-count")
      this.equipos = res.body;
    }, error => { })
  }

  searchByName(nombre) {
    this.equipoService.busquedaPorNombre(nombre).subscribe((res: any) => {
      this.numberOfEquipos = res.headers.get("x-total-count")
      this.equipos = res.body;
    }, error => { })
  }

  loadData() {
    this.equipoService.obtenerLigas(1).subscribe((res: any) => {
      this.numberOfEquipos = res.headers.get("x-total-count")
      this.equipos = res.body;
    }, error => { })
  }

}
