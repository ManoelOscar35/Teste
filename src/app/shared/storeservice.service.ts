import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private typeAnswers: BehaviorSubject<string> = new BehaviorSubject<string>("radio");
  private answers: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private answersColor: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private botaoExcluir: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private routerAnswer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ruBool: Subject<boolean> = new Subject<boolean>();
  private topicsBool2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private ruBool3: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private answersBool: Subject<boolean> = new Subject<boolean>();
  private topicsBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private typeQuestionBool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private question: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private myQuestion: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private myQuestion2: BehaviorSubject<string> = new BehaviorSubject<string>("");

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

  setAnswersLayout(value: string) {
    this.typeAnswers.next(value);
  }

  getAnswersLayout() {
    return this.typeAnswers.asObservable();
  }

  setBotaoExcluir(value: number) {
    this.botaoExcluir.next(value);
  }

  getBotaoExcluir() {
    return this.botaoExcluir.asObservable();
  }

  setRouterAnswer(value: boolean) {
    return this.routerAnswer.next(value);
  }

  getRouterAnswer() {
    return this.routerAnswer.asObservable();
  }

  setRuBool(value: boolean) {
    this.ruBool.next(value)
  }

  getRuBool() {
    return this.ruBool.asObservable();
  }

  setTopicsBool2(value: boolean) {
    this.topicsBool2.next(value)
  }

  getTopicsBool2() {
    return this.topicsBool2.asObservable();
  }

  setRuBool3(value: boolean) {
    this.ruBool3.next(value)
  }

  getRuBool3() {
    return this.ruBool3.asObservable();
  }

  setQuestion(value: string) {
    this.question.next(value);
  }

  getQuestion() {
    return this.question.asObservable();
  }

  setAnswersBool(value: boolean) {
    this.answersBool.next(value);
  }

  getAnswersBool() {
    return this.answersBool.asObservable();
  }

  setTopicsBool(value: boolean) {
    this.topicsBool.next(value);
  }

  getTopicsBool() {
    return this.topicsBool.asObservable();
  }

  setMyQuestion(value: string) {
    this.myQuestion.next(value);
  }

  getMyQuestion() {
    return this.myQuestion.asObservable();
  }

  setMyQuestion2(value: string) {
    this.myQuestion2.next(value);
  }

  getMyQuestion2() {
    return this.myQuestion2.asObservable();
  }

  setTypeQuestionBool(value: boolean) {
    this.typeQuestionBool.next(value);
  }

  getTypeQuestionBool() {
    return this.typeQuestionBool.asObservable();
  }
}
