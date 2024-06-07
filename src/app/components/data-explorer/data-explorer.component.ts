import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OceanData } from '../../interfaces/ocean-data';
import { DataExplorerService } from '../../services/data-explorer.service';

@Component({
  selector: 'app-data-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-explorer.component.html',
  styleUrl: './data-explorer.component.css'
})
export class DataExplorerComponent {
  oceanDatas:OceanData[] = [];
  filtro:string = '';

  constructor(private dataExplorerService:DataExplorerService) {  }

  listar():void {
    this.dataExplorerService.listar().subscribe((listOceanData) => (this.oceanDatas = listOceanData));
  }

  aplicarFiltro() {
    if (!this.filtro) {
      // Se o filtro estiver vazio, mostre todos os itens
      return this.oceanDatas;
    }

    // Filtra os itens com base no nome
    return this.oceanDatas.filter(ocean =>
      ocean.regiao.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  ngOnInit():void {
    this.listar();
  }

}
