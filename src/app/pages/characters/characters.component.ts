import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { tap } from 'rxjs';
import { WizardsService } from 'src/app/services/wizards.service';
import { Character } from 'src/app/shared/interfaces/character.interface';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {
  characters: Character[] = [];
  selectedHouse: string = '';
  
  constructor(private wizardsService: WizardsService) {}
  
  onHouseChange(event: MatSelectChange) {
    this.selectedHouse = event.value;
    
    this.wizardsService.getCharactersByHouse(this.selectedHouse).pipe(
      tap(console.log)
    ).subscribe(characters => {
      this.characters = characters;
    })
  }
}
