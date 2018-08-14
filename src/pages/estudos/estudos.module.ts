import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstudosPage } from './estudos';

@NgModule({
  declarations: [
    EstudosPage,
  ],
  imports: [
    IonicPageModule.forChild(EstudosPage),
  ],
})
export class EstudosPageModule {}
