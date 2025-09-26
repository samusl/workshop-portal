import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Colaborador {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
  private apiUrl = '/api/colaboradores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl);
  }

  create(body: Partial<Colaborador>): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, body);
  }
}
