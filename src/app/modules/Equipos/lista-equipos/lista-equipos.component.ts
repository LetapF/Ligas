import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EquiposService } from 'src/app/core/services/equipos/equipos.service';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.component.html',
  styleUrls: ['./lista-equipos.component.scss']
})
export class ListaEquiposComponent implements OnInit {


  titulo: string;
  equipos: [];
  numberOfEquipos: number;
  index: number;
  confirmModal: NzModalRef;


  constructor(
    private equipoService: EquiposService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private ligaService: LigasService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        if (Object.keys(params).includes('s')) {
          this.searchByName(params['s'])
        } else{
          this.ligaService.getnameByID(params['l']).subscribe(res =>{
            console.log(res[0])
            this.titulo='Equipos de la liga: ' + res[0]["Nombre De La Liga"]
          })
          this.searchByLiga(params['l'])
        }
      }
      else {
        this.titulo = 'Lista de equipos'
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
    console.log(index)
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro que quieres eliminar este item?',
      nzContent: 'Eliminaras el equipo: ' + equipo["Nombre del equipo"],
      nzOnOk: () => {
        let eliminado = this.equipos.splice(index, 1)[0]
        //this.equipoService.eliminarEquipo(eliminado['id'])
        this.notification.create(
          'success',
          'Equipo eliminado exitosamente',
          `El equipo ${eliminado['Nombre del equipo']} se elimino correctamente`
        );    
      }
    });
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

    console.log(this.numberOfEquipos)
  }

  loadData() {
    this.equipoService.obtenerLigas(1).subscribe((res: any) => {
      this.numberOfEquipos = res.headers.get("x-total-count")
      this.equipos = res.body;
    }, error => { })
  }

}
