import { Colaborador } from "./Colaborador";


   export interface workshop
    {
    id: number;
    nome: string;
    dataRealizacao: string;
    descricao: string;
    presencas?: 
    {
    colaborador: Colaborador;
    registro: string;
    }[];
    }
