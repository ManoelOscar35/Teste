import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { TypeQuestion } from '../models/typeQuestion';
import { Subject, takeUntil } from 'rxjs';
import { Answers } from '../models/answers';
import { Topics } from '../models/topics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  singleChoice: string = "RU";
  singleChoiceGrid: string = "";
  gridBool: boolean = false;
  ruBool: boolean = true;
  answers!: Answers[];
  answer1: string = "";
  answer2: string = "";
  index: any;
  question: string = "";
  answersLayout!: string;
  data!: TypeQuestion[];
  questionInput: boolean = false;
  routerOutlet: boolean = false;

  topics!: Topics[];
  topic1!: string;
  topic2!: string;
  topic3!: string;
  indexTopicBool: boolean = false;
  selectBoxBool: boolean = false;

  corDeFundoQuestion: string = '#f5f5ef';
  corDeFundoAnswer: string = '#f5f5ef';
  corDeFundoTopics: string = '#f5f5ef';
  colorAnswer1: string = '';
  colorAnswer2: string = '';
  unsubscribe$: Subject<any> = new Subject<any>();

  selectBox: string = "selectBox";
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

    this.getTopics();

    //Obtendo dado do BehaviorSubject
    this.storeService.getAnswersLayout().subscribe({
      next: (res: string) => {
        this.answersLayout = res
        if(this.answersLayout == this.selectBox) {
          this.selectBoxBool = true
          this.gridBool = false
        }
        
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

  setGrid() {
    this.singleChoiceGrid = "Grid";
    this.gridBool = true;
    this.ruBool = false;
  }

  //Obtendo os dados do servidor
  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answers = res;
        this.colorAnswer1 = 'black';
        this.colorAnswer2 = 'black';
        this.index = res[0]?.id
        this.answer1 = res[0]?.answer
        this.answer2 = res[1]?.answer
      }
    })
  }

   //Obtendo os dados do servidor
   getTopics() {
    this.apiService.getTopics()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Topics[]) => {
        this.topics = res;
        this.topic1 = this.topics[0]?.topic;
        this.topic2 = this.topics[1]?.topic; 
        this.topic3 = this.topics[2]?.topic;
        this.indexTopicBool = this.topics[0]?.id;
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
    this.corDeFundoTopics = '#f5f5ef';
    this.questionInput = true;
    this.routerOutlet = false;


  }

  changeColorMethodAnswer() {
    this.corDeFundoAnswer = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.corDeFundoTopics = '#f5f5ef';
    this.routerOutlet = true;
    this.questionInput = false;
  }

  changeColorMethodTopics() {
    this.corDeFundoTopics = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.corDeFundoAnswer = '#f5f5ef';
    this.routerOutlet = true;
    this.questionInput = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
