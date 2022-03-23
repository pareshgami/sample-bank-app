import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularIbanModule } from 'angular-iban';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularIbanModule,
    ReactiveFormsModule,
  ],
  exports: [
    AngularIbanModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
