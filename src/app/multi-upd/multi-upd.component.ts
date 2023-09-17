import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Answers } from '../models/answers';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-multi-upd',
  templateUrl: './multi-upd.component.html',
  styleUrls: ['./multi-upd.component.css']
})
export class MultiUpdComponent implements OnInit, AfterViewInit, OnDestroy {

  answersInput: string = '';
  answers!: string[];
  id1: any;
  id2: any;
  answer1!: any;
  answer2!: any;
  unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('input') inputAtribute!: ElementRef;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog) 
  {}

  ngOnInit() {
    this.getAnswers()
    
  }

  ngAfterViewInit() {
    this.inputAtribute.nativeElement.value = this.answersInput;
  }

  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answersInput = res[0].answer+' '+res[1].answer
        this.id1 = res[0].id
        this.id2 = res[1].id
      }
    })
  }
  
  updateAnswers() {
    this.answers = this.answersInput.split(' ');
    for(let i = 0; i < this.answers.length; i++) {
      this.answer1 = this.answers[0];
      this.answer2 = this.answers[1];
    }
    this.apiService.editAnswers({id: this.id1, answer: this.answer1}).subscribe({
      next: (res: Answers) => {
        window.location.reload()
      } 
    });
    
    this.apiService.editAnswers({id: this.id2, answer:this.answer2}).subscribe({
      next: (res: Answers) => {
        window.location.reload()
      } 
    });

    this.closeComponent();
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

  ngOnDestroy() {
    this.unsubscribe$.next([]);
  }

}
