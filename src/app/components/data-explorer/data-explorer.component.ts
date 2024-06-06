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

  constructor(private dataExplorerService:DataExplorerService) {  }

  listar():void {
    this.dataExplorerService.listar().subscribe((listOceanData) => (this.oceanDatas = listOceanData));
  }

  ngOnInit():void {
    this.listar();
  }

}
