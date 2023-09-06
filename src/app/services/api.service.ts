import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnswerModel } from '../models/answer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionModel } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // método para enviar dados ao servidor
  postQuestion(question: any): Observable<QuestionModel> {
    return this.http.post<any>(`${environment.BASE_URL}/questions`, question)
  }

  // método para obter dados do servidor
  getQuestion(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${environment.BASE_URL}/questions`)
  }

  // método para editar dado do servidor
  editQuestion(res: QuestionModel): Observable<QuestionModel> {
    return this.http.put<QuestionModel>(`${environment.BASE_URL}/questions/${res.id}`, res)
  }

  // método para excluir pergunta do servidor
  deleteQuestion(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/questions/${id}`)
  }

  // método para enviar dados ao servidor
  postAnswers(res: AnswerModel): Observable<AnswerModel> {
    return this.http.post<AnswerModel>(`${environment.BASE_URL}/answers`, res)
  }

  // método para obter dados do servidor
  getAnswers(): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(`${environment.BASE_URL}/answers`)
  }

  // método para editar dado do servidor
  editAnswers(res: AnswerModel): Observable<AnswerModel> {
    return this.http.put<AnswerModel>(`${environment.BASE_URL}/answers/${res.id}`, res)
  }

  // método para excluir dado do servidor
  deleteAnswers(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/answers/${id}`)
  }
}
