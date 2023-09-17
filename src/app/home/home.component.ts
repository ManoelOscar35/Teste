import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { TypeQuestion } from '../models/typeQuestion';
import { Subject, takeUntil } from 'rxjs';
import { Answers } from '../models/answers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  singleChoice: string = "RU";
  answer1: string = "";
  answer2: string = "";
  index: any;
  question: string = "";
  answersLayout!: string;
  data!: TypeQuestion[];
  questionInput: boolean = false;
  routerOutlet: boolean = false;
  corDeFundoQuestion: string = '#f5f5ef';
  corDeFundoAnswer: string = '#f5f5ef';
  colorAnswer1: string = '';
  colorAnswer2: string = '';
  unsubscribe$: Subject<any> = new Subject<any>();

  radio: string = "radio";
  selecionar: string = "selecionar";
  caixa: string = "caixa";
  links: string = "links";
  normal: string = "normal";
  
  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getTypeQuestion();
    
    this.getAnswers();

    //Obtendo dado do BehaviorSubject
    this.storeService.getAnswersLayout().subscribe({
      next: (res: string) => {
        this.answersLayout = res
      }
    });

    this.storeService.getColorAnswers().subscribe({
      next: (res: string) => {
        if(res === this.answer1) {
          this.colorAnswer1 = 'red';
          this.colorAnswer2 = 'black';
        } 
        if(res === this.answer2) {
          this.colorAnswer2 = 'red';
          this.colorAnswer1 = 'black';
        }
      }
    }); 
    
    
  }

  //Obtendo os dados do servidor
  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.colorAnswer1 = 'black';
        this.colorAnswer2 = 'black';
        this.answer1 = res[0]?.answer
        this.index = res[0]?.id
        this.answer2 = res[1]?.answer
      }
    })
  }

  //Método para enviar o tipo de questão  pro servidor
  postTypeQuestion() {
    this.apiService.postTypeQuestion({typeQuestion: this.singleChoice}).subscribe({
      next: (res: TypeQuestion) =>  { 
        window.location.reload()
      }
    })
  }

  getTypeQuestion() {
    //Obtendo os dados do servidor
    this.apiService.getTypeQuestion().subscribe({
      next: (res: TypeQuestion[]) => {
        this.data = res
      }
    })
  }

  changeColorMethodQuestion() {
    this.corDeFundoQuestion = 'gray';
    this.corDeFundoAnswer = '#f5f5ef';
    this.questionInput = true;
    this.routerOutlet = false;


  }

  changeColorMethodAnswer() {
    this.corDeFundoAnswer = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.routerOutlet = true;
    this.questionInput = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next([]);
  }

}
