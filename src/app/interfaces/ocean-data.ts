import { ProjetosConservacao } from './projetos-conservacao';
import { Especies } from "./especies";

export interface OceanData {
  regiao:String,
  temperaturaAgua:Number,
  nivelPoluicao:Number,
  especies:Especies[],
  ProjetosConservacao:ProjetosConservacao[];
}
