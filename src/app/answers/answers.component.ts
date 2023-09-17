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

  answer1!: string;
  answer2!: string;
  index1!: any;
  index2!: any;
  getAnswersBoolean: boolean = false;
  answer1Bool!: boolean;
  answer2Bool!: boolean;
  unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('answers1') answers1Atribute!: ElementRef;
  @ViewChild('answers2') answers2Atribute!: ElementRef;

  @ViewChild('typeAnswers') typeAnswersAtribute!: ElementRef;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private dialog: MatDialog
  )
  {}

  ngOnInit() {
    this.getAnswers();
    
    this.answer1Bool = true;
    this.answer2Bool = true;
  }

  typeAnswersMethod() {
    //Enviando dado pro BehaviorSubject
    this.storeService.setTypeAnswers(this.typeAnswersAtribute.nativeElement.value)
  }

  //Obter as respostas do servidor
  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answer1 = res[0]?.answer
        this.index1 = res[0]?.id
        this.answer2 = res[1]?.answer
        this.index2 = res[1]?.id
        
        this.getAnswersBoolean = true;
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

  answers1Method() {
    this.answers2Atribute.nativeElement.style.backgroundColor = '#fff';
    this.answers1Atribute.nativeElement.style.backgroundColor = '#99c2ff';
    this.storeService.setAnswers(this.answer1); // Enviar a resposta pro componente Edit
    
    this.storeService.setBotaoExcluir(this.index1); //Envia id para o BehaviorSubject
  }

  answers2Method() {
    this.answers1Atribute.nativeElement.style.backgroundColor = '#fff';
    this.answers2Atribute.nativeElement.style.backgroundColor = '#99c2ff';
    this.storeService.setAnswers(this.answer2); // Envia a resposta pro componente Edit

    this.storeService.setBotaoExcluir(this.index2); //Envia id para o BehaviorSubject
  }

  //deletar o dado do servidor
  delete(id: any) {
    this.apiService.deleteAnswers(id).subscribe({
      next: (res: any) =>  {
        if(id == 1) {
          this.answer1Bool = false;
          this.answers1Atribute.nativeElement.style.backgroundColor = '#fff';
        }

        if(id == 2) {
          this.answer2Bool = false;
          this.answers2Atribute.nativeElement.style.backgroundColor = '#fff';
        }

        window.location.reload();
      }
    });

  }

  ngOnDestroy() {
    this.unsubscribe$.next([]);
  }

}

 

 



 

