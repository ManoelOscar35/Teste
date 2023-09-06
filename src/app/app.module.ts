import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAnswersComponent } from './add-answers/add-answers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionComponent,
    AnswersComponent,
    AddAnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
