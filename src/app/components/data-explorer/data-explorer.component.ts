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
  styleUrls: ['./data-explorer.component.css']
})
export class DataExplorerComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<FormGroup>();
  oceanDatas: OceanData[] = [];
  species: String[] = [];
  conservationStatus: String[] = [];
  filterForm: FormGroup;

  constructor(private dataExplorerService: DataExplorerService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      regiao: [''],
      nomeEspecie: [''],
      conserv: [''],
      tempMin: [''],
      tempMax: [''],
      phMin: [''],
      phMax: [''],
      poluicao: ['']
    });
  }

  listar(): void {
    const filters = this.filterForm.value;
    const regiao = filters.regiao;
    const nomeEspecie = filters.nomeEspecie;
    const conserv = filters.conserv;
    const tempMin = filters.tempMin ? `temperaturaMin=${parseFloat(filters.tempMin)}&` : '';
    const tempMax = filters.tempMax ? `temperaturaMax=${parseFloat(filters.tempMax)}&` : '';
    const phMin = filters.phMin ? `phMin=${parseFloat(filters.phMin)}&` : '';
    const phMax = filters.phMax ? `phMax=${parseFloat(filters.phMax)}&` : '';
    const poluicao = filters.poluicao;
    const phMinNumber = filters.phMin;
    const phMaxNumber = filters.phMax;
    const tempMinNumber = filters.tempMin;
    const tempMaxNumber = filters.tempMax;

    if (phMinNumber !== null && phMaxNumber !== null && phMinNumber > phMaxNumber && tempMinNumber !== null && tempMaxNumber !== null && tempMinNumber > tempMaxNumber) {
      alert('A temperatura mínima não pode ser maior que a temperatura máxima.\nO pH mínimo não pode ser maior que o pH máximo.');
      return;
    }
    else if (phMinNumber !== null && phMaxNumber !== null && phMinNumber > phMaxNumber) {
      alert('O pH mínimo não pode ser maior que o pH máximo.');
      return;
    } else if (tempMinNumber !== null && tempMaxNumber !== null && tempMinNumber > tempMaxNumber) {
      alert('A temperatura mínima não pode ser maior que a temperatura máxima.');
      return;
    }

    this.dataExplorerService.listar(
      regiao,
      nomeEspecie,
      conserv,
      tempMin,
      tempMax,
      phMin,
      phMax,
      poluicao
    ).subscribe(oceanos => {
      this.oceanDatas = oceanos;
      this.species = [...new Set(oceanos.flatMap(oceano => oceano.especies.map(specie => specie.nome)))];
      this.conservationStatus = [...new Set(oceanos.flatMap(oceano => oceano.especies.map(especie => especie.status)))];
    });
  }

  ngOnInit(): void {
    this.listar();
  }
}
