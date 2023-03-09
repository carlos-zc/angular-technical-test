import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './pages/characters/characters.component';
import { StaffComponent } from './pages/staff/staff.component';
import { StudentsComponent } from './pages/students/students.component';

const routes: Routes = [
  {
    path: 'staff',
    component: StaffComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: '**',
    redirectTo: 'staff'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top' // Configura ScrollPositionRestoration para que ubique el scroll al inicio
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
