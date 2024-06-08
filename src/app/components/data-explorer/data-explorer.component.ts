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
  filtersForm:FormGroup = new FormGroup([]);
  listaDados:any[] = [];
  contador:number = -1;

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


  ngOnInit():void {
    this.listar();
    // this.aplicarFiltro();
  }

  obterDados() {
    const titulo = (<HTMLInputElement>document.getElementById('1')).value;
    const corpo = (<HTMLSelectElement>document.getElementById('2')).value;
    console.log({ titulo, corpo });
    this.listaDados.push(titulo);
    this.contador += 1;
    console.log(this.listaDados)

  }

}
