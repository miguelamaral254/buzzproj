import { Component, OnInit } from '@angular/core';
import quizz_que from "../../../assets/data/quizz_que.json"
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quizz',
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = "";

  questions:any;
  selectedQuestion:any;

  answers:string[] = [];
  selectedAnswers:string = "";

  indexQuestion:number = 0;
  indexMaxQuestion:number = 0;
  finished:boolean = false;

 constructor() {}
 ngOnInit(): void {
  if(quizz_que) {
    this.finished = false;
    this.title = quizz_que.title;

    this.questions = quizz_que.questions;
    this.selectedQuestion = this.questions[this.indexQuestion];

    this.indexQuestion = 0;
    this.indexMaxQuestion = this.questions.length;


  }
 }
 playerChoice(value:string) {
  this.answers.push(value);
  this.nextStep()
 }
  async nextStep() {
  this.indexQuestion+=1;
  if(this.indexMaxQuestion > this.indexQuestion) {
    this.selectedQuestion = this.questions[this.indexQuestion];
  } else {
    const finalAnswer:string = await this.checkResult(this.answers);
    this.finished = true;
    this.selectedAnswers = quizz_que.results[finalAnswer as unknown as keyof typeof quizz_que.results];
  }
 }
 async checkResult(anwsers:string[]) {
  const result = anwsers.reduce((previous, current, i , arr) => {
if(
  arr.filter(item => item === previous).length >
  arr.filter(item => item === current).length
) {
  return previous;

 } else {
  return current;
 }
  });
 return result;
 }
}
