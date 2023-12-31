import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { TypeQuestion } from '../models/typeQuestion';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Answers } from '../models/answers';
import { Topics } from '../models/topics';
import { Router } from '@angular/router';
import { TypeQuestion2 } from '../models/typeQuestion2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  index2: any;
  singleChoice: string = '';
  singleChoiceGrid: string = "";
  gridBool: boolean = false;
  gridBool2: boolean = false;
  barraBool: boolean = true;
  ruBool: boolean = false;
  ruBool2: boolean = false;
  ruBool3: boolean = false;
  answers!: Answers[];
  answer1: string = "";
  answer2: string = "";

  answerTypeQuestion1: string = "";
  answerTypeQuestion2: string = "";
  topicTypeQuestion1: any;
  topicTypeQuestion2: any;
  index: any;
  question: any;
  answersLayout!: string;
  data!: TypeQuestion[];
  data2!: TypeQuestion2[];
  questionInput: boolean = false;
  routerAnswerBool: boolean = false;
  myQuestion: any;
  answersTypeQuestion: any[] = [];
  dados1$!: Observable<any>;
  dados2$!: Observable<any>;

  topics!: Topics[];
  topic1!: string;
  topic2!: string;
  topic3!: string;
  indexTopicBool: boolean = false;
  topicBool: boolean = false;
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
    private storeService: StoreService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.getTypeQuestion();
    
    this.getTypeQuestion2();

    this.getAnswers();

    this.getTopics();



    this.storeService.getRuBool()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: any) =>  {
        this.ruBool = res
       }
      
    });

    this.storeService.getRuBool3()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: any) =>  {
        this.ruBool3 = res
       }
      
    });

    this.storeService.getRouterAnswer()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: boolean) => this.routerAnswerBool = res
    });

    //Obtendo dado do BehaviorSubject
    this.storeService.getAnswersLayout()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: string) => {
        this.answersLayout = res
        if(this.answersLayout == this.selectBox) {
          this.selectBoxBool = true
        }

      }
    });

    if(this.answersLayout == 'radio') {
      this.ruBool = true;
      this.ruBool3 = false;
    } 

    if(this.answersLayout == 'radio' && this.ruBool3 == true) {
      this.ruBool = false;
      this.ruBool3 = true;
      
    } 

    this.storeService.getColorAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: string) => {
        if(res === this.answer1) {
          this.colorAnswer1 = 'red';
          this.colorAnswer2 = 'black';
        } 
        if(res === this.answer2) {
          this.colorAnswer2 = 'red';
          this.colorAnswer1 = 'black';
        }

        if(res === this.answerTypeQuestion1) {
          this.colorAnswer1 = 'red';
          this.colorAnswer2 = 'black';
        }

        if(res === this.answerTypeQuestion2) {
          this.colorAnswer2 = 'red';
          this.colorAnswer1 = 'black';
        }
      }
    }); 
    
    const valorArmazenado = localStorage.getItem('question');

    if (valorArmazenado) {
      this.myQuestion = valorArmazenado;
      this.storeService.setMyQuestion(this.myQuestion);
      this.storeService.setMyQuestion2(valorArmazenado);
      
    }

     console.log(this.gridBool)
  }


  setGrid() {
    this.barraBool = false;
    this.gridBool = true;
    this.topicBool = true;
   
    this.singleChoiceGrid = 'Grid';
    this.myQuestion = "";
    localStorage.removeItem('question')
    this.storeService.setRuBool(false);
    this.gridBool2 = false;
    this.storeService.setAnswersBool(false)
    
    this.apiService.postTypeQuestion2({typeQuestion: {typeQuestion:  this.singleChoiceGrid, question: "", answers: [], topics: []}}).subscribe({
      next: (res: TypeQuestion2) => {
        this.getTypeQuestion2();  
        
      }
    })

    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).subscribe();
      
    });

    this.getAnswers();
    
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
        this.storeService.getRuBool().subscribe({
          next: (res: boolean) => this.ruBool = res
        })
        if(this.answers.length === 2) {
          this.barraBool = false
        }
        if(this.answers.length > 2) {
          this.ruBool = false;
          this.barraBool = false
          this.topicBool = true;
          this.ruBool3 = false;
        }

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
        this.gridBool = true;
      }
    })
  }

  typeQuestion() {
    this.barraBool = false;
    this.topicBool = false;
    this.singleChoice = 'RU';
    this.myQuestion = ""
    localStorage.removeItem('question')
    this.gridBool = false;
    this.gridBool2 = false;
    this.storeService.setRuBool(true);
    console.log(this.ruBool)
    this.apiService.postTypeQuestion({typeQuestion: {typeQuestion:  this.singleChoice}}).subscribe({
      next: (res: TypeQuestion) => {
        this.getTypeQuestion();
        
      }
    });
    
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).subscribe();
    });

    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).subscribe();
    });

    
  }

  

  setQuestion(d: TypeQuestion) {
    this.onModelChange();
    this.myQuestion = d.typeQuestion.question;
    console.log(this.myQuestion)
    localStorage.setItem('question', this.myQuestion);
    this.ruBool = false
    this.barraBool = false;
    this.ruBool3 = true;
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).subscribe()
    });
    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).subscribe()
    });
    this.answerTypeQuestion1 = d.typeQuestion.answers[0]?.answer;
    this.answerTypeQuestion2 = d.typeQuestion.answers[1]?.answer;
    
    console.log(this.answerTypeQuestion1)
    this.gridBool = false;
    this.gridBool2 = false;
    this.topicBool = false;
    this.storeService.setAnswersBool(true);
    this.getTypeQuestion();
  }

  setQuestion2(d: TypeQuestion2) {
    this.topicBool = true;
    this.onModelChange();
    this.myQuestion = d.typeQuestion.question;
    console.log(this.myQuestion)
    localStorage.setItem('question', this.myQuestion);
    this.storeService.setAnswersBool(true);
    this.storeService.setRuBool(false);
    this.storeService.setTopicsBool(true);
    this.answers.forEach((el: any) => {
      this.apiService.deleteAnswers(el.id).subscribe()
    });
    this.ruBool = false;
    this.gridBool2 = true;
    this.topicBool = true;
    this.gridBool = false;
    this.barraBool = false;
    this.topics.forEach((el: any) => {
      this.apiService.deleteTopics(el.id).subscribe()
    });
    
    
    this.topicTypeQuestion1 = d.typeQuestion.answers[0]?.answer;
    this.topicTypeQuestion2 = d.typeQuestion.answers[1]?.answer;
    console.log(this.answerTypeQuestion1)
    this.ruBool3 = false;
    
    
  }

  getTypeQuestion() {
    //Obtendo os dados do servidor
    this.apiService.getTypeQuestion()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion[]) => {
        this.colorAnswer1 = 'black';
        this.colorAnswer2 = 'black';
        this.data = res;
        

      }
    })
  }

  getTypeQuestion2() {
    //Obtendo os dados do servidor
    this.apiService.getTypeQuestion2()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: TypeQuestion2[]) => {
        this.data2 = res;

      }
    })
  }

  onModelChange() {
    localStorage.setItem('question', this.myQuestion);
    
  }

  changeColorMethodQuestion() {
    this.corDeFundoQuestion = 'gray';
    this.corDeFundoAnswer = '#f5f5ef';
    this.corDeFundoTopics = '#f5f5ef';
    this.questionInput = true;

  }

  changeColorMethodAnswer() {
    this.corDeFundoAnswer = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.corDeFundoTopics = '#f5f5ef';
    this.questionInput = false;
    
  }

  changeColorMethodTopics() {
    this.corDeFundoTopics = 'gray';
    this.corDeFundoQuestion = '#f5f5ef';
    this.corDeFundoAnswer = '#f5f5ef';
    this.singleChoiceGrid = "Grid";
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
