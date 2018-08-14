import { IonicPageModule } from 'ionic-angular';
import { DesempenhoPage } from './desempenho';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DesempenhoPage,
  ],
  imports: [
    IonicPageModule.forChild(DesempenhoPage),
  ],
})
export class DesempenhoPageModule {}
