import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OceanData } from '../interfaces/ocean-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExplorerService {
  private dataExplorerUrl = "https://fiap-3sis-gs-20241.azurewebsites.net/"


  constructor(private http: HttpClient) {

  }

  listar(regiao: string, especie: string, statusConservacao: string,
    temperaturaMin: string, temperaturaMax: string, phMin: string,
    phMax: string, nivelPoluicao: string): Observable<OceanData[]> {
    const url = `${this.dataExplorerUrl}OceanData?${regiao}${especie}${statusConservacao}${temperaturaMin}${temperaturaMax}${phMin}${phMax}${nivelPoluicao}pagina=1&qtde=20`
    console.log(url)
    return this.http.get<OceanData[]>(url) as Observable<OceanData[]>;
  }



}
