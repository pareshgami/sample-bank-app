import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularIbanModule } from 'angular-iban';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularIbanModule
  ],
  exports: [
    AngularIbanModule
  ]
})
export class SharedModule { }
