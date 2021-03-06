import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Liga } from 'src/app/shared/models/liga';

@Component({
  selector: 'app-lista-ligas',
  templateUrl: './lista-ligas.component.html',
  styleUrls: ['./lista-ligas.component.scss']
})
export class ListaLigasComponent implements OnInit {

  ligas: Liga[];
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

  removeSizeImg(url: string){
    return url.substring(0, url.indexOf('?'))
  }

  changePage(index){
    this.ligasService.obtenerLigas(index).subscribe((res: any) => {
      this.ligas = res.body;
    }, error => {})
  }

  showConfirm(liga:Liga): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Estas seguro que quieres eliminar este item?',
      nzContent: 'Eliminaras la Liga: ' + liga['Logo de la Liga'],
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
