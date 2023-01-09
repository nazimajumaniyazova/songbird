import Module1 from "./Module1.js";
export  default class Module2{
  constructor(){
    this.lang = 'en'
    this.func = new Module1()
    console.log(this.func)
  }
  fff(){

  }
}