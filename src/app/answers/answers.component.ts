import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnswersComponent } from '../add-answers/add-answers.component';
import { MultiUpdComponent } from '../multi-upd/multi-upd.component';
import { EditanswersComponent } from '../editanswers/editanswers.component';
import { Answers } from '../models/answers';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnDestroy {

  answers!: Answers[];
  unsubscribe$: Subject<any> = new Subject<any>();


  @ViewChild('answersLayout') answersLayoutAtribute!: ElementRef;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private dialog: MatDialog
  )
  {}

  ngOnInit() {
    this.getAnswers();
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
    this.storeService.setAnswers(answer.answer); // Enviar a resposta pro componente Edit
    this.storeService.setBotaoExcluir(answer.id); //Envia id para o BehaviorSubject
  }

  trackByFn(index: number, answer: any): number {
    return answer.id;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}

 

 



 

