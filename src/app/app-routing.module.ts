import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { AddAnswersComponent } from './add-answers/add-answers.component';

const routes: Routes = [
  {path: "question", component: QuestionComponent},
  {path: "answer", component: AnswersComponent},
  {path: "add-answers", component: AddAnswersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
