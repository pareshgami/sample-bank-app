import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddEditTransferComponent } from './core/components/add-edit-transfer/add-edit-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './core/components/date-picker/date-picker.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TransferResolver } from './transfer/transfer.resolver';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, AddEditTransferComponent, DatePickerComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TransferResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
