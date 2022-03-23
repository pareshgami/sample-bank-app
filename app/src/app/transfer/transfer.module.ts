import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core/modules/shared/shared.module';
import { TransferPage } from './transfer.page';
import { TransferPageRoutingModule } from './transfer-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { transferReducer } from './store/transfer.reducers';
import { TransferEffects } from './store/transfer.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPageRoutingModule,
    SharedModule,
    StoreModule.forFeature('transfers', transferReducer),
    EffectsModule.forFeature([TransferEffects])
  ],
  declarations: [TransferPage]
})
export class HomePageModule {}
