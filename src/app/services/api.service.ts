import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeQuestion } from '../models/typeQuestion';
import { Answers } from '../models/answers';
import { Topics } from '../models/topics';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) { }

  // método para enviar dados ao servidor
  postTypeQuestion(typeQuestion: TypeQuestion): Observable<TypeQuestion> {
    return this.http.post<TypeQuestion>(`${environment.BASE_URL}/typeQuestion`, typeQuestion)
  }

  //método para obter dados do servidor
  getTypeQuestion(): Observable<TypeQuestion[]> {
    return this.http.get<TypeQuestion[]>(`${environment.BASE_URL}/typeQuestion`)
  }

  // método para enviar dados ao servidor
  postAnswers(answers: Answers): Observable<Answers> {
    return this.http.post<Answers>(`${environment.BASE_URL}/answers`, answers)
  }

  // método para atualizar dados ao servidor
  editAnswers(answers: Answers): Observable<Answers> {
    return this.http.put<Answers>(`${environment.BASE_URL}/answers/${answers.id}`, answers)
  }

  // método para obter dados do servidor
  getAnswers(): Observable<Answers[]> {
    return this.http.get<Answers[]>(`${environment.BASE_URL}/answers`)
  }

  
  // método para excluir dado do servidor
  deleteAnswers(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/answers/${id}`)
  }

  // método para enviar dados ao servidor
  postTopics(topic: Topics): Observable<Topics> {
    return this.http.post<Topics>(`${environment.BASE_URL}/topics`, topic)
  }

  // método para atualizar dados ao servidor
  editTopics(topics: Topics): Observable<Topics> {
    return this.http.put<Topics>(`${environment.BASE_URL}/topics/${topics.id}`, topics)
  }

  // método para obter dados do servidor
  getTopics(): Observable<Topics[]> {
    return this.http.get<Topics[]>(`${environment.BASE_URL}/topics`)
  }

  
  // método para excluir dado do servidor
  deleteTopics(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/topics/${id}`)
  }
}
