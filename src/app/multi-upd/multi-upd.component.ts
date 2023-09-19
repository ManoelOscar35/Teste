import { Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Answers } from '../models/answers';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-upd',
  templateUrl: './multi-upd.component.html',
  styleUrls: ['./multi-upd.component.css']
})
export class MultiUpdComponent implements OnInit, OnDestroy {

  answersInput: string[] = [];
  answers!: string[];
  answersFront: string = "";
  topics!: string[];
  selected: boolean = false;
  selectedTopics: boolean = false;
  answers2: Answers[] = [];
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) 
  {}

  ngOnInit() {
    this.getAnswers()
    
  }

  getAnswers() {
    this.apiService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Answers[]) => {
        this.answers2 = res;
        for(let i = 0; i < this.answers2.length; i++) {
          this.answersInput.push(this.answers2[i].answer) 
        }
      }
    })
  }

  juntarAnswers(): string {
    return this.answersInput.join(' ');
  }
  
  updateAnswers() {
    this.answers = this.answersFront.split(' ')
    for(let i = 0; i < this.answers2.length; i++) {
      this.apiService.editAnswers({id: this.answers2[i].id, answer: this.answers[i], selected: this.selected}).subscribe();
    }
    window.location.reload();
    this.closeComponent();
    
  }

  updateTopics() {
    this.topics = this.answersFront.split(' ')
    for(let i = 0; i < this.answers2.length; i++) {
      this.apiService.editTopics({id: this.answers2[i].id, topic: this.topics[i], selectedTopics: this.selectedTopics}).subscribe();
    }
    window.location.reload();
    this.closeComponent();
    
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
