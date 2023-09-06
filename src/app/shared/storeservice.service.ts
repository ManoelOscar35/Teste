import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private typeAnswers = new BehaviorSubject<string>("");


  constructor() { }

  setTypeAnswers(value: string) {
    this.typeAnswers.next(value);
  }

  getTypeAnswers() {
    return this.typeAnswers.asObservable();
  }

  
}
