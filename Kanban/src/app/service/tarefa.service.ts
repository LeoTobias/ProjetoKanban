import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { TarefasModule } from '../tarefas/tarefas.module';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  ngOnit():void{

  }

  cadatrar(tarefa: TarefasModule): Observable<TarefasModule>{
    return this.http.post<TarefasModule>('http://localhost:3000/tarefas', tarefa);
  }

  mostrar(): Observable<TarefasModule[]>{
    return this.http.get<TarefasModule[]>("http://localhost:3000/tarefas");
  }

  remover(id: number): Observable<any> {
    return this.http.delete<TarefasModule>(`http://localhost:3000/tarefas/${id}`);
  }

  atualizar(tarefa: TarefasModule): Observable<TarefasModule> {
    if(!tarefa.id) return EMPTY;
    return this.http.put<TarefasModule>(`http://localhost:3000/tarefas/${tarefa.id}`, tarefa);
  }
  
}
