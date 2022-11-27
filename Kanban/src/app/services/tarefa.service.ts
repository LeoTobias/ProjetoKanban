import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Tarefa } from '../model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>("http://localhost:3000/tarefa");
  }

  inserir(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>("http://localhost:3000/tarefa", tarefa);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<Tarefa>(`http://localhost:3000/tarefa/${id}`);
  }

  atualizar(tarefa: Tarefa): Observable<Tarefa> {
    if (!tarefa.id) return EMPTY;
    return this.http.put<Tarefa>(`http://localhost:3000/tarefa/${tarefa.id}`, tarefa);
  }
}
