import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditanswersComponent } from '../editanswers/editanswers.component';
import { MultiUpdComponent } from '../multi-upd/multi-upd.component';
import { AddAnswersComponent } from '../add-answers/add-answers.component';
import { Subject, takeUntil } from 'rxjs';
import { Topics } from '../models/topics';
import { ApiService } from '../services/api.service';
import { StoreService } from '../shared/storeservice.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent {

  topics!: Topics[];
  unsubscribe$: Subject<any> = new Subject<any>();


  @ViewChild('topicsLayout') topicsLayoutAtribute!: ElementRef;

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
    this.storeService.setAnswersLayout(this.topicsLayoutAtribute.nativeElement.value)
  }

  //Obter as respostas do servidor
  getAnswers() {
    this.apiService.getTopics()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: Topics[]) => {
        this.topics = res;
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

  selectTopic(topic: any) {
    topic.selectedTopics = !topic.selectedTopics;
    this.storeService.setBotaoExcluir(topic.id)
  }

  trackByFn(index: number, topic: any): number {
    return topic.id;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

}
