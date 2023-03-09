import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { WizardsService } from 'src/app/services/wizards.service';
import { Character } from 'src/app/shared/interfaces/character.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  students: Character[] = [];

  constructor(private wizardsService: WizardsService) {}

  ngOnInit(): void {
    this.wizardsService.getStudents().pipe(
      tap(console.log)
    ).subscribe(students => {
      this.students = students;
    })
  }
}
