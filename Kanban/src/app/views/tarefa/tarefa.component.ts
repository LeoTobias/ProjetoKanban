import { Component, OnInit } from '@angular/core';
import { TarefaService } from 'src/app/service/tarefa.service';
import { TarefasModule } from 'src/app/tarefas/tarefas.module';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {
  exibirTarefa: TarefasModule[] = [];
  idTarefa?: TarefasModule;
  inserindo = false;

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.mostrar(); //para iniciar toda vez que a pagina carregar
  }

  mostrar() {
    this.tarefaService.mostrar().subscribe(tarefa => {
      this.exibirTarefa = tarefa;
    });
  }

  cadastrar() {
    this.idTarefa = new TarefasModule;
    this.inserindo = false;
  }

  apagar(id?: number){
    if (!id) return;

    const RESPOSTA = confirm('Tem certeza que deseja remover a tarefa selecionada ? Esta ação não pode ser desfeita.');
    RESPOSTA ? this.tarefaService.remover(id).subscribe(() => {
      alert('Cliente excluido com sucesso!');
      this.mostrar(); //atualiza lista
    }) : null;
  }
  
  selecionar(tarefa: TarefasModule) { //ao clicar no item (ao clicar aqui mudar a flag para distinguir se deve chamar inserir ou atualizar) (chama um ou outro e colocar if)
    this.idTarefa = tarefa;
    this.inserindo = true;
  }

  cancelar() { //joga undefined na variavel
    this.idTarefa = undefined;
  }

  salvar() { //chamar o serviço e inserir
    if (!this.idTarefa) return; //cancela o script

    if (!this.inserindo) {
      this.tarefaService.cadatrar(this.idTarefa).subscribe(tarefa => {
        this.mostrar();
        this.cancelar(); //para remover o form
        alert('Tarefa adicionada com sucesso!');
      }); //var
    } else {
      this.tarefaService.atualizar(this.idTarefa).subscribe(tarefa => {
        this.mostrar();
        this.cancelar();
        alert('Tarefa atualizada com sucesso!');
      })
    }

  }

  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
