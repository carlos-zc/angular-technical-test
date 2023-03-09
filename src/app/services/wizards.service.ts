import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../shared/interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class WizardsService {
  private baseUrl: string = 'https://hp-api.onrender.com/api/characters';

  constructor(private http: HttpClient) {}

  getStaff(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/staff`).pipe(
      map( characters =>
        this.addAgeToCharacters(characters)
      )
    );
  }

  getStudents(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/students`).pipe(
      map(characters =>
        this.addAgeToCharacters(characters)
      )
    );
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/house/${house}`).pipe(
      map(characters =>
        this.addAgeToCharacters(characters)
      )
    );
  }

  // Agrega la edad de los personajes al arreglo
  addAgeToCharacters(people: Character[]): Character[] {
    return people.map((person: Character) => {
      if (person.dateOfBirth) {
        // Convertir la fecha de nacimiento en un objeto Date
        const birthDate = new Date(
          Number(person.dateOfBirth.split('-')[2]), // año
          Number(person.dateOfBirth.split('-')[1]) - 1, // mes (restamos 1 ya que los meses en Date empiezan en 0)
          Number(person.dateOfBirth.split('-')[0]) // día
        );
  
        // Obtener la fecha actual
        const currentDate = new Date();
  
        // Calcular la diferencia de tiempo en milisegundos entre las dos fechas
        const difference = currentDate.getTime() - birthDate.getTime();
  
        // Convertir la diferencia de tiempo a años
        const age = Math.floor(difference / 1000 / 60 / 60 / 24 / 365.25);
  
        person.age = age;
      }
      return person;
    })
  }
}
