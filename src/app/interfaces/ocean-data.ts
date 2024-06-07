import { ProjetosConservacao } from './projetos-conservacao';
import { Especies } from "./especies";

export interface OceanData {
  regiao:String,
  temperaturaAgua:Number,
  pH:Number,
  nivelPoluicao:Number,
  especies:Especies[],
  projetosConservacao:ProjetosConservacao[];
}
