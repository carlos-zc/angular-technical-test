import { Component, ViewChild } from '@angular/core';
import { tap } from 'rxjs';

import { WizardsService } from 'src/app/services/wizards.service';
import { Character } from "../../shared/interfaces/character.interface";
// Section Staff:
// La respuesta debe ser mostrada en una tabla con las siguientes columnas: name, species, gender, house, age e image.
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  characters: Character[] = [];

  constructor(private wizardsService: WizardsService) {}

  ngOnInit(): void {
    this.wizardsService.getStaff().pipe(
      tap(console.log)
    ).subscribe(characters => {
      this.characters = characters;
    })
  }

}
