import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-excluir',
  templateUrl: './botao-excluir.component.html',
  styleUrls: ['./botao-excluir.component.css']
})
export class BotaoExcluirComponent implements OnInit {

  id!: number;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router  
  ) {}

  ngOnInit() {

  }

  delete() {
    //Obtem id
    this.storeService.getBotaoExcluir().subscribe({
      next: (res: number) => this.id = res
    })

    //Deleta dado do servidor
    this.apiService.deleteAnswers(this.id).subscribe({
      next: (res: any) => {
        this.router.navigate(["/answer"]),
        window.location.reload()
      }
    });
  }
}
