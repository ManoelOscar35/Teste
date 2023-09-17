import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../shared/storeservice.service';
import { Router } from '@angular/router';
import { Answers } from '../models/answers';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent implements OnInit {

  answersInput: string = '';
  answers: string[] = [];
  answersObject1: any;
  answersObject2: any;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) 
  {}

  ngOnInit() {
    
  }
  
  createAnswers() {
    this.answers = this.answersInput.split(' ');
    for(let i = 0; i <= this.answers.length; i++) {
      this.answersObject1 = this.answers[0],
      this.answersObject2 = this.answers[1]
    }
    this.apiService.postAnswers({answer: this.answersObject1}).subscribe(
      {
        next: (res: Answers) => {
          this.router.navigate(["/answer"]),
          window.location.reload()
        } 
      }
    );

    this.apiService.postAnswers({answer: this.answersObject2}).subscribe(
      {
        next: (res: Answers) => {
          this.router.navigate(["/answer"]),
          window.location.reload()
        } 
      }
    );
  
    this.closeComponent();

  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

}
