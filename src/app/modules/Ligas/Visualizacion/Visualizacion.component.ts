import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/core/services/ligas/ligas.service';

@Component({
  selector: 'app-Visualizacion',
  templateUrl: './Visualizacion.component.html',
  styleUrls: ['./Visualizacion.component.scss']
})
export class VisualizacionComponent implements OnInit {

  ligas: [];
  constructor(
    private ligasService: LigasService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.ligasService.obtenerLigas().subscribe((res: any) => {
      console.log(res)
      this.ligas = res;
    }, error => {})
  }

}
