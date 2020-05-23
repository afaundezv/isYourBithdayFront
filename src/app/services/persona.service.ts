import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"
import { Persona } from "../models/Persona";


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private endpoint = 'http://localhost:8080/api/v0/birthday?';

  constructor(private http: HttpClient) { }

  personaAgrega(persona: Persona): Observable<object> {

    return this.http.get(
      this.endpoint +
      "name=" + persona.name +
      "&lastName=" + persona.lastName +
      "&motherLastName=" + persona.motherLastName +
      "&birthday=" + persona.fechaNacimiento);
  }


}
