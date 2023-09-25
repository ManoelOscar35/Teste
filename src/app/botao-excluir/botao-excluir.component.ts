import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';

@Component({
  selector: 'app-botao-excluir',
  templateUrl: './botao-excluir.component.html',
  styleUrls: ['./botao-excluir.component.css']
})
export class BotaoExcluirComponent implements OnInit {

  id!: number;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {

  }

  delete() {
    //Obtem id
    this.storeService.getBotaoExcluir().subscribe({
      next: (res: number) =>  {
        this.id = res
      }
    })

    //Deleta dado do servidor
    this.apiService.deleteAnswers(this.id).subscribe({
      next: (res: any) => {
        this.storeService.setRouterAnswer(true)
        this.storeService.setRuBool3(false)
        window.location.reload()
      }
    });

    //Deleta dado do servidor
    this.apiService.deleteTopics(this.id).subscribe({
      next: (res: any) => {
        this.storeService.setRouterAnswer(true);
        this.storeService.setRuBool3(false);
        window.location.reload();
      }
    });

    // this.apiService.deleteTypeQuestion(this.id).subscribe({
    //   next: (res: any) => window.location.reload()
    // });
  }
}
