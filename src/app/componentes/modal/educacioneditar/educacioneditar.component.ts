import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {educacionModel} from "../../../shared/modelo/educacion.model";
import {EducacionService} from "../../../shared/servicios/educacion.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getDownloadURL} from "firebase/storage";
import {ImagenesService} from "../../../shared/servicios/imagenes.service";

@Component({
  selector: 'app-educacioneditar',
  templateUrl: './educacioneditar.component.html',
  styleUrls: ['./educacioneditar.component.css']
})
export class EducacioneditarComponent implements OnInit {
  @Output() cerrarventana= new EventEmitter<boolean>();
  @Input() ideducacion:number;
  educacion:educacionModel;
  urlImagen:string="";
  urlImagenNueva:string="";
  progreso:boolean=true;
  titulo:string="Agregar Educacion";
  progresoTerminado:boolean=false;
  porcentaje:number=0;
  formulario= new FormGroup({
    titulo: new FormControl('',[Validators.required]),
    nombreInstitucion: new FormControl('',[Validators.required]),
    fechaInicio: new FormControl('',[Validators.required]),
    fechaFin: new FormControl(''),
    linkTitulo: new FormControl(''),
    urlImagen: new FormControl('')
  });
  constructor(private educacionservicio:EducacionService, private imagenservie:ImagenesService) { }
  ngOnInit(): void {
    if (this.ideducacion!=-1){
      this.titulo="Editar Educacion";
    this.educacionservicio.getEducacionId(this.ideducacion).subscribe(
      (data:educacionModel)=>{
        this.educacion=data;
        this.urlImagen=this.educacion.urlImagen;
        this.formulario.setValue({
          titulo: this.educacion.titulo,
          nombreInstitucion: this.educacion.nombreInstitucion,
          fechaInicio: this.educacion.fechaInicio,
          fechaFin: this.educacion.fechaFin,
          linkTitulo: this.educacion.linkTitulo,
          urlImagen: this.educacion.urlImagen
        });
      });
  }
  }
  cerrar(){
    if (this.urlImagenNueva!=""){
      this.imagenservie.eliminarImagen(this.urlImagenNueva);
    }
    this.cerrarventana.emit(false);
  }
  guardarEducacion(){

    let fechafin:string;
    if(this.formulario.value.fechaFin==""){
      fechafin="Actualidad";
    }else{
      fechafin=this.formulario.value.fechaFin as string;
    }
    if (this.urlImagenNueva!=""){
      this.urlImagen=this.urlImagenNueva;
    }
    if (this.ideducacion==-1){
      let educacion={
        titulo:this.formulario.value.titulo as string,
        nombreInstitucion:this.formulario.value.nombreInstitucion as string,
        fechaInicio:this.formulario.value.fechaInicio as string,
        linkTitulo:this.formulario.value.linkTitulo as string,
        fechaFin:fechafin as string,
        urlImagen:this.urlImagen as string
      };

      this.educacionservicio.guardarEducacion(educacion).subscribe(res=>{
        alert("Informacion de Educacion guardada");
        window.location.reload();
      });
    }else{
      let educacion={
        id:this.ideducacion as number,
        titulo:this.formulario.value.titulo as string,
        nombreInstitucion:this.formulario.value.nombreInstitucion as string,
        fechaInicio:this.formulario.value.fechaInicio as string,
        fechaFin:fechafin as string,
        linkTitulo: this.formulario.value.linkTitulo as string,
        urlImagen:this.urlImagen as string
      };
      this.educacionservicio.getEducacionId(this.ideducacion).subscribe(
        (data:educacionModel)=>{
          if (data.urlImagen!=this.urlImagen){
            this.imagenservie.eliminarImagen(data.urlImagen);
          }
        });
      this.educacionservicio.actualizarEducacion(educacion).subscribe(res=>{
        alert("Informacion Educacion actualizada");
        window.location.reload();
      });
    }
  }
  processFile(event:any) {
    this.progreso=true;
    this.progresoTerminado=false;
    let filea:File=event.files[0];
    let uploadTask=this.imagenservie.subirImagen(filea,"/imagenes/educacion/");
    uploadTask.on('state_changed', (snapshot) => {
      this.porcentaje= Math.round((snapshot.bytesTransferred/snapshot.totalBytes*100));
      if (this.porcentaje == 100) {
        this.progresoTerminado=true;
        getDownloadURL(snapshot.ref).then((url) => {
          this.urlImagenNueva=url;
        });
      }
    });
  }
}
