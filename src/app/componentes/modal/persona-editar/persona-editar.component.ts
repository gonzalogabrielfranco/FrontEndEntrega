import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PersonaService} from "../../../shared/servicios/persona.service";
import {ImagenesService} from "../../../shared/servicios/imagenes.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getDownloadURL} from "firebase/storage";
import {personaModel} from "../../../shared/modelo/persona.model";

@Component({
  selector: 'app-persona-editar',
  templateUrl: './persona-editar.component.html',
  styleUrls: ['./persona-editar.component.css']
})
export class PersonaEditarComponent implements OnInit {
  @Output() eventoPersona = new EventEmitter<boolean>();
  formulario= new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    titulo: new FormControl(''),
    lugar: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    urlImagenPortada: new FormControl(''),
    urlImagenPerfil: new FormControl('')
  });
  banProgresoPerfil:boolean=false;
  banProgresoPortada:boolean=false;
  progresoTerminadoPerfil:boolean=false;
  porcentajePerfil:number=0;
  urlImagenPerfil:string="";
  progresoTerminadoPortada:boolean=false;
  porcentajePortada:number=0;
  urlImagenPortada:string=""
  persona:personaModel;
  constructor(private personaservicio:PersonaService,private imageservice:ImagenesService) { }

  ngOnInit(): void {
    this.personaservicio.getPersonas().subscribe((data:personaModel[])=>{
      this.persona=data[0];
      console.log(this.persona);
      this.formulario.setValue(
        {
          nombre: this.persona.nombre as string,
          apellido: this.persona.apellido as string,
          titulo: this.persona.titulo as string,
          lugar: this.persona.residencia as string,
          email: this.persona.email as string,
          urlImagenPortada: this.persona.urlImagenPortada as string,
          urlImagenPerfil: this.persona.urlImagenPerfil as string
        }
      );
    });
  }
  processFilePortada(event:any) {
    this.banProgresoPortada=true;
    this.progresoTerminadoPortada=false;
    let filea:File=event.files[0];
    let uploadTask=this.imageservice.subirImagen(filea,"/imagenes/persona/");
    uploadTask.on('state_changed', (snapshot) => {
      this.porcentajePortada= Math.round((snapshot.bytesTransferred/snapshot.totalBytes*100));
      if (this.porcentajePortada == 100) {
        this.progresoTerminadoPortada=true;
        getDownloadURL(snapshot.ref).then((url) => {
          this.urlImagenPortada=url;
        });
      }
    });
  }
  processFilePerfil(event:any) {
    this.banProgresoPerfil=true;
    this.progresoTerminadoPerfil=false;
    let filea:File=event.files[0];
    let uploadTask=this.imageservice.subirImagen(filea,"/imagenes/persona/");
    uploadTask.on('state_changed', (snapshot) => {
      this.porcentajePerfil= Math.round((snapshot.bytesTransferred/snapshot.totalBytes*100));
      if (this.porcentajePerfil == 100) {
        this.progresoTerminadoPerfil=true;
        getDownloadURL(snapshot.ref).then((url) => {
          this.urlImagenPerfil=url;
        });
      }
    });
  }

  cerrarModal(){
    this.eventoPersona.emit(false);
  }
  guardar(){
    if (this.urlImagenPerfil=="" && this.persona.urlImagenPerfil!=""){
      this.urlImagenPerfil=this.persona.urlImagenPerfil as string;
    }
    if (this.urlImagenPortada==""){
      this.urlImagenPortada=this.persona.urlImagenPortada as string;
    }
    let persona={
      id: this.persona.id as number,
      nombre: this.formulario.value.nombre as string,
      apellido: this.formulario.value.apellido as string,
      email: this.formulario.value.email as string,
      titulo: this.formulario.value.titulo as string,
      fechaNacimiento: this.persona.fechaNacimiento as string,
      residencia: this.formulario.value.lugar as string,
      descripcion: this.persona.descripcion as string,
      urlImagenPerfil: this.urlImagenPerfil,
      urlImagenPortada: this.urlImagenPortada,
    }
    this.personaservicio.actualizarPersona(persona).subscribe((data)=>{
      alert("Informacion guardada");
      window.location.reload();
    });
  }
}
