import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../shared/storeservice.service';

@Component({
  selector: 'app-editanswers',
  templateUrl: './editanswers.component.html',
  styleUrls: ['./editanswers.component.css']
})
export class EditanswersComponent implements OnInit, AfterViewInit {

  answer: string = "";
  corAnswer: string = 'black';

  @ViewChild('input') inputAtribute!: ElementRef;

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.storeService.getAnswers().subscribe({
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

  closeComponent() {
    this.dialog.ngOnDestroy()
  }

  
}
