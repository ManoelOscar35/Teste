import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent implements OnInit {

  selected: boolean = false;
  input: string = '';
  answers: string[] = [];

  selectedTopics: boolean = false;
  topics: string[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) 
  {}

  ngOnInit() {
    
  }
  
  createAnswers() {
    this.answers = this.input.split(' ');
    for(let i = 0; i < this.answers.length; i++) {
      this.apiService.postAnswers({answer: this.answers[i], selected: this.selected}).subscribe();
    }
    
    this.router.navigate(["/answer"]),
    window.location.reload()
    this.closeComponent();
  }

  createTopics() {
    this.topics = this.input.split(' ');
    for(let i = 0; i < this.topics.length; i++) {
      this.apiService.postTopics({topic: this.topics[i], selectedTopics: this.selectedTopics}).subscribe();
    }
    this.router.navigate(["/topics"]),
    window.location.reload()
    this.closeComponent();
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

}
