import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef  } from 'ngx-bootstrap/modal';
import { PersonasService } from '../services/personas.service';
import { IPersonas } from './personas';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  modalRef?: BsModalRef;

  public tituloModal ='';
  public textoBoton = '';
  public nombre = new FormControl('',Validators.required);
  public idea =new FormControl('',Validators.required);
  public documento = new FormControl('',Validators.required);
  public mostrarError = false;
  public personaSeleccionada = <IPersonas>{};
  public personas=[] as any;


  constructor(private service:PersonasService,private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>,persona?:IPersonas) {//aqui especificamos que la variable personas pede estar o no a la hora de recibir los datos
    if (persona) {//si persona es enviado
      this.tituloModal = 'Editar Persona';
      this.textoBoton = 'Actualizar';
      this.personaSeleccionada = persona;
      this.nombre.setValue(persona.nombre);
      this.idea.setValue(persona.idea);
      this.documento.setValue(persona.documento);
    }else{
      this.tituloModal = 'Agregar Persona';
      this.textoBoton = 'Agregar';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.obtenerListaPersonas();
  }
  obtenerListaPersonas(){
    this.service.listaPersonas()
    .subscribe(respuesta => this.personas = respuesta);
  }

  actualizarPersona(){
    if (!this.nombre.value || !this.idea.value || !this.documento.value) {
      this.mostrarError = true;
      return;
    }

    this.personaSeleccionada.nombre = this.nombre.value;
    this.personaSeleccionada.idea = this.idea.value;
    this.personaSeleccionada.documento = this.documento.value;
    //se obtuvieron los datos de cada campo.

    if (this.textoBoton == 'Actualizar') {
      this.service.editarPersona(this.personaSeleccionada)
      .subscribe(respuesta=>{
        this.obtenerListaPersonas();
        this.reset();
        this.mostrarError = false;
        this.modalRef?.hide();
      });
    }else{
      this.service.agregarPersona(this.personaSeleccionada)
      .subscribe(respuesta=>{
        this.obtenerListaPersonas();
        this.reset();
        this.mostrarError = false;
        this.modalRef?.hide();
      });
    }
  }


  eliminarPersona(persona:IPersonas){
    this.service.eliminarPersona(persona)
    .subscribe(respuesta => this.obtenerListaPersonas());
  }

  reset(){
    this.nombre.reset();
    this.idea.reset();
    this.documento.reset();
  }
}
