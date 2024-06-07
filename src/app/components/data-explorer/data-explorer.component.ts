import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OceanData } from '../../interfaces/ocean-data';
import { DataExplorerService } from '../../services/data-explorer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-explorer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './data-explorer.component.html',
  styleUrl: './data-explorer.component.css'
})
export class DataExplorerComponent implements OnInit{
  @Output() filtersChanged = new EventEmitter<FormGroup>();
  oceanDatas:OceanData[] = [];
  species:String[] = [];
  conservationStatus:String[] = [];
  filtersForm:FormGroup;

  constructor(private dataExplorerService:DataExplorerService, private formBuilder: FormBuilder) {
    this.filtersForm = this.formBuilder.group({
      regiao: [''],
      temperaturaAgua: [''],
      pH: [''],
      niveisPoluicao: [''],
      especie: [''],
      conservationStatus: [''],
    });
  }

  listar():void {
    // this.dataExplorerService.listar().subscribe((listOceanData) => (this.oceanDatas = listOceanData));

    this.dataExplorerService.listar().subscribe(oceanos => {
      this.oceanDatas = oceanos;
      this.species = [...new Set(oceanos.flatMap(oceano => oceano.especies.map(specie => specie.nome)))];
      this.conservationStatus = [...new Set(oceanos.flatMap(oceano => oceano.especies.map(especie => especie.status)))];
    });
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filtersForm.value);
  }

  ngOnInit():void {
    this.listar();
    // this.aplicarFiltro();
  }

}
