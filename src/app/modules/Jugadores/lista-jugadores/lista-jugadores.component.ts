import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { JugadoresService } from 'src/app/core/services/jugadores/jugadores-service';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {

  jugadores: [];
  numberOfjugadores: number;
  index:number;
  confirmModal: NzModalRef;


  constructor(
    private equipoService: JugadoresService,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  changePage(index){
    this.equipoService.obtenerLigas(index).subscribe((res: any) => {
      this.jugadores = res.body;
    }, error => {})
  }

  showConfirmDelete(equipo): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro que quieres eliminar este item?',
      nzContent: 'Eliminaras el equipo: ' + equipo["Nombre del equipo"],
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  loadData(){
    this.equipoService.obtenerLigas(1).subscribe((res: any) => {
      this.numberOfjugadores = res.headers.get("x-total-count")
      this.jugadores = res.body;
    }, error => {})
  }
}
