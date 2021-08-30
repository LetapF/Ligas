import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-Visualizacion',
  templateUrl: './Visualizacion.component.html',
  styleUrls: ['./Visualizacion.component.scss']
})
export class VisualizacionComponent implements OnInit {

  ligas: [];
  numberOfLigas: number;
  index:number;
  confirmModal: NzModalRef;


  constructor(
    private ligasService: LigasService,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this.loadData()
  }


  printindex(index){
    console.log(index)
  }

  changePage(index){
    this.ligasService.obtenerLigas(index).subscribe((res: any) => {
      this.ligas = res.body;
    }, error => {})
  }

  showConfirm(liga): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro que quieres eliminar este item?',
      nzContent: 'Eliminaras la Liga: ' + liga["Nombre del equipo"],
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }



  loadData(){
    this.ligasService.obtenerLigas(1).subscribe((res: any) => {
      this.numberOfLigas = res.headers.get("x-total-count")
      this.ligas = res.body;
    }, error => {})
  }

}
