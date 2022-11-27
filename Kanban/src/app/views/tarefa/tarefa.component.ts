import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  mostrarTarefas: Tarefa[] = [];
  tarefa?: Tarefa;
  inserir = false;

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.tarefaService.listar().subscribe(tarefas => {
      this.mostrarTarefas = tarefas;
    })
  }

  criar() {
    this.tarefa = new Tarefa();
    this.inserir = false;
  }

  remover(id?: number) {
    if (!id) return;

    this.tarefaService.remover(id).subscribe(() => {
      this.listar();
    })
  }

  selecionar(tarefa: Tarefa) {
    this.tarefa = tarefa;
    this.inserir = true;
  }

  cancelar() {
    this.tarefa = undefined;
  }

  salvar() {
    if (!this.tarefa) return;

    if (!this.inserir) {
      this.tarefaService.inserir(this.tarefa).subscribe(tarefa => {
        this.listar();
        this.cancelar();
      })
    } else {
      this.tarefaService.atualizar(this.tarefa).subscribe(tarefa => {
        this.listar();
        this.cancelar();
      })
    }
  }
}
