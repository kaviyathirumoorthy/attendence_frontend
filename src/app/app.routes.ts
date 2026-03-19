import { Routes } from '@angular/router';
import { TrainingDataUploadComponent } from './components/training-data-upload/training-data-upload.component';

export const routes: Routes = [
  {
    path: '',
    component: TrainingDataUploadComponent
  },
  {
    path: 'upload',
    component: TrainingDataUploadComponent
  }
];
