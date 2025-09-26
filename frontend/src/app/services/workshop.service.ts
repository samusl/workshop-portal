import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Workshop {
  id: number;
  nome: string;
  dataRealizacao: string;
  descricao: string;
  presencas?: {
    colaborador: { id: number; nome: string };
    registro: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class WorkshopService {
  private apiUrl = '/api/workshops';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.apiUrl);
  }

  getById(id: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.apiUrl}/${id}`);
  }

  create(body: Partial<Workshop>): Observable<Workshop> {
    return this.http.post<Workshop>(this.apiUrl, body);
  }

  // Só funciona se o backend tiver um endpoint GET para participantes
  getParticipantes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/participantes`);
  }

  // Ajustado: PascalCase "ColaboradorId" igual ao backend
  adicionarParticipante(workshopId: number, colaboradorId: number): Observable<any> {
  return this.http.post<any>(
    `${this.apiUrl}/${workshopId}/participantes`,
    { colaboradorId }  // camelCase
  );
}



  // Só funciona se o backend tiver DELETE implementado
  removerParticipante(workshopId: number, colaboradorId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${workshopId}/participantes/${colaboradorId}`
    );
  }
  getParticipacaoColaboradores(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/participacao-colaboradores`);
}

  getParticipacaoWorkshops(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/participacao-workshops`);
}

}
