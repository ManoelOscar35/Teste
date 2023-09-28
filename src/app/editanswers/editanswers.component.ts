import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../shared/storeservice.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-editanswers',
  templateUrl: './editanswers.component.html',
  styleUrls: ['./editanswers.component.css']
})
export class EditanswersComponent implements OnInit, AfterViewInit {

  answer: string = "";
  corAnswer: string = 'black';
  unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('input') inputAtribute!: ElementRef;

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.storeService.getAnswers()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe({
      next: (res: string) => { 
        this.answer = res
      }
    });
  }

  ngAfterViewInit() {
    
    this.inputAtribute.nativeElement.style.color = this.corAnswer;
  }

  colorMethod() {
    this.corAnswer = this.corAnswer = "red";
    
  }  

  edit() {
    this.storeService.setColorAnswers(this.answer)
    this.closeComponent();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
  }

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

  
}
