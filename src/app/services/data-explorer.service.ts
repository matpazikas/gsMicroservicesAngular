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

  listar(): Observable<OceanData[]> {
    return this.http.get<OceanData[]>(this.dataExplorerUrl) as Observable<OceanData[]>;
    //Retorna a URL dos Pokemons
  }

}