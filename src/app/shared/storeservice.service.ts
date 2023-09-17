import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private typeAnswers: BehaviorSubject<string> = new BehaviorSubject<string>("radio");
  private answers: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private answersColor: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private idBotaoExcluir: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setAnswers(value: string) {
    this.answers.next(value);
  }

  getAnswers() {
    return this.answers.asObservable();
  }

  setColorAnswers(value: string) {
    this.answersColor.next(value);
  }

  getColorAnswers() {
    return this.answersColor.asObservable();
  }

  setTypeAnswers(value: string) {
    this.typeAnswers.next(value);
  }

  getTypeAnswers() {
    return this.typeAnswers.asObservable();
  }

  setBotaoExcluir(value: number) {
    this.idBotaoExcluir.next(value);
  }

  getBotaoExcluir() {
    return this.idBotaoExcluir.asObservable();
  }
  
}
