import { Component, OnInit } from '@angular/core';
import { Persona } from "../models/Persona";
import { PersonaResponse } from "../models/PersonaResponse"
import { PersonaService } from "../services/persona.service";
import { NgxSpinnerService } from "ngx-spinner";
import { from } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-agrega-persona',
  templateUrl: './agrega-persona.component.html',
  styleUrls: ['./agrega-persona.component.css']
})
export class AgregaPersonaComponent implements OnInit {

  persona: Persona = new Persona;
  personaResponse: PersonaResponse;
  exito: boolean = false;
  siMensaje: boolean = false;
  formatDate: string;


  constructor(private personaService: PersonaService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
  }

  enviar() {

    this.guardarPersona()
  }


  limpia() {
    this.exito = false;
    this.siMensaje = false;
    this.persona.name = null;
    this.persona.lastName = null;
    this.persona.motherLastName = null;
    this.persona.fechaNacimiento = null;
  }

  guardarPersona() {

    console.log(this.persona)
    this.spinnerService.show();

    this.personaService.personaAgrega(this.persona)
      .subscribe(
        (data: any) => {
          this.exito = true;
          this.personaResponse = data;
          this.formatDate = new Date(data.birthday)
            .toLocaleDateString()
            .split("/")
            .map(function (value, index) {
              if (index == 2) {
                return value.substr(2)
              }
              else {
                return value + "/"
              }
            })
            .toString()
            .replace(/(,)/g, "")
          if (this.personaResponse.poem !== null) {
            this.siMensaje = true;
          }


          console.log(data)
          this.spinnerService.hide();
        }
      )

  }

}
