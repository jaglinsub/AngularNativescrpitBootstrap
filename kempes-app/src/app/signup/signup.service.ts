import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class PersonTypes {
  id: number;
  personType: string;
}
export const PERSONTYPES: PersonTypes[] = [
  {
    "id": 1,
    personType: "Student"
  },
  {
    "id": 2,
    personType: "Councillors"
  },
  {
    "id": 3,
    personType: "Parent"
  }
];

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }

  getPersonTypes(): Observable<PersonTypes[]> {
    return of(PERSONTYPES);
  }
}

