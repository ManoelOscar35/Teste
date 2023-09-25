import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnswersComponent } from '../add-answers/add-answers.component';
import { MultiUpdComponent } from '../multi-upd/multi-upd.component';
import { EditanswersComponent } from '../editanswers/editanswers.component';
import { Answers } from '../models/answers';
import { Subject, map, takeUntil } from 'rxjs';
import { TypeQuestion } from '../models/typeQuestion';
import { TypeQuestion2 } from '../models/typeQuestion2';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnDestroy {

  answers!: Answers[];
  unsubscribe$: Subject<any> = new Subject<any>();
  answersBool!: boolean;
  answersBool2: boolean = true;
  topicsBool: boolean = false;
  typeQuestion2: TypeQuestion2[] = [];
  typeQuestion: TypeQuestion[] = [];
  myQuestion!: string;

  @ViewChild('answersLayout') answersLayoutAtribute!: ElementRef;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private dialog: MatDialog
  )
  {}

  ngOnInit() {
    this.getAnswers();

    this.apiService.getTypeQuestion2().subscribe({
      next: (res: TypeQuestion2[]) => this.typeQuestion2 = res
    });

    this.storeService.getMyQuestion().subscribe({
      next: (res: string) => {
        console.log(res),
        this.myQuestion = res
      } 
    });

    this.storeService.getAnswersBool().subscribe({
      next: (res: boolean) => {
        this.answersBool2 = false;
        this.answersBool  = res;
        this.topicsBool = false
      } 
    }); 

    this.storeService.getTopicsBool().subscribe({
      next: (res: boolean) => {
        this.topicsBool = res;
      } 
    });

    this.apiService.getTypeQuestion().subscribe({
      next: (res: TypeQuestion[]) => {
        this.typeQuestion = res,
        console.log(this.typeQuestion)
      }
    })
  
  }

  layoutMethod() {
    //Enviando dado pro BehaviorSubject
    this.storeService.setAnswersLayout(this.answersLayoutAtribute.nativeElement.value)
  }

  //Obter as respostas do servidor
  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answers = res;
        this.answersBool2 = true;
        this.answersBool = false
        const objetosReordenados = this.answers.map((obj, index) => {
          obj.id = index + 1;
          return obj;
        });
        this.answers = objetosReordenados
      }
    });
  }

  openDialog() {
    this.dialog.open(AddAnswersComponent, {
      width: '1000px',
      autoFocus: false,
      height: '600px',
      data: {
        
      }
    })

    
  }

  openDialogMultiUpd() {
    this.dialog.open(MultiUpdComponent, {
      width: '1000px',
      autoFocus: false,
      height: '600px',
      data: {
        
      }
    })

    
  }

  openDialogEdit() {
    this.dialog.open(EditanswersComponent, {
      width: '1000px',
      autoFocus: false,
      height: '600px',
      data: {

      }
    })
  }

  selectAnswer(answer: any) {
    answer.selected = !answer.selected;
    console.log(answer)
    this.storeService.setAnswers(answer.answer); // Enviar a resposta pro componente Edit
    this.storeService.setBotaoExcluir(answer.id); //Envia id para o BehaviorSubject
    this.storeService.setRuBool2(false)
  }

  trackByFn(index: number, answer: any): number {
    return answer.id;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}

 

 



 

