import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExperienciaService} from "../../../shared/servicios/experiencia.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExperienciaModel} from "../../../shared/modelo/experiencia.model";
import {getDownloadURL} from "firebase/storage";
import {ImagenesService} from "../../../shared/servicios/imagenes.service";

@Component({
  selector: 'app-experienciaeditar',
  templateUrl: './experienciaeditar.component.html',
  styleUrls: ['./experienciaeditar.component.css']
})
export class ExperienciaeditarComponent implements OnInit {
  @Input() id:number=-1;
  @Output() cerrarventana= new EventEmitter<boolean>();
  formexperiencia= new FormGroup({
    puesto: new FormControl('',[Validators.required]),
    nombreEmpresa: new FormControl('',[Validators.required]),
    fechaInicio: new FormControl('',[Validators.required]),
    fechaFin: new FormControl(''),
    lugar: new FormControl('',[Validators.required]),
    tipoJornada: new FormControl('',[Validators.required]),
    urlImagen: new FormControl(''),
    descripcion: new FormControl('')
  });
  titulo:string="Agregar Experiencia";
  experiencia:ExperienciaModel;
  progreso:boolean=true;
  progresoTerminado:boolean=false;
  porcentaje:number=0;
  urlImagen:string="";
  urlImagenNueva:string="";
  constructor(private experienciaservicio:ExperienciaService, private imagenservicio:ImagenesService) { }
  ngOnInit(): void {
    if (this.id!=-1){
      this.titulo="Editar Experiencia";
      this.experienciaservicio.getExperiencia(this.id).subscribe(data=>{
        let tipojornada="";
        this.experiencia=data;
        if (this.experiencia.tipoJornada=="Jornada Completa"){
          tipojornada="0";
        }else {
          tipojornada="1";
        }
        this.urlImagen=this.experiencia.urlImagen;
        this.formexperiencia.setValue({
          puesto: this.experiencia.puesto as string,
          nombreEmpresa: this.experiencia.nombreEmpresa as string,
          fechaInicio: this.experiencia.fechaInicio as string,
          fechaFin: this.experiencia.fechaFin as string,
          lugar: this.experiencia.lugar as string,
          tipoJornada: tipojornada as string,
          urlImagen: this.experiencia.urlImagen as string,
          descripcion: this.experiencia.descripcion as string
        });
      });
    }

  }

  guardarExperiencia(){
    let tipojornadanueva="";
    let fechafin1:string;
    if(this.formexperiencia.value.fechaFin==""){
      fechafin1="Actualidad";
    }else{
      fechafin1=this.formexperiencia.value.fechaFin as string;
    }
    if((this.formexperiencia.value.tipoJornada as string)=="1"){
      tipojornadanueva="Jornada completa";
    }else{
      tipojornadanueva="Jornada Parcial";
    }
    if (this.urlImagenNueva!=""){
      this.urlImagen=this.urlImagenNueva;
    }
    if (this.id==-1){
      let experiencia1={
        puesto:this.formexperiencia.value.puesto as string,
        nombreEmpresa:this.formexperiencia.value.nombreEmpresa as string,
        fechaInicio:this.formexperiencia.value.fechaInicio as string,
        fechaFin:fechafin1 as string,
        lugar:this.formexperiencia.value.lugar as string,
        tipoJornada:tipojornadanueva as string,
        urlImagen:this.urlImagen as string,
        descripcion:this.formexperiencia.value.descripcion as string
      };
      this.experienciaservicio.guardarExperiencia(experiencia1).subscribe(res=>{
        alert("Experiencia guardada");
        window.location.reload();
      });
    }else{
      let experiencia1={
        id:this.id,
        puesto:this.formexperiencia.value.puesto as string,
        nombreEmpresa:this.formexperiencia.value.nombreEmpresa as string,
        fechaInicio:this.formexperiencia.value.fechaInicio as string,
        fechaFin:fechafin1 as string,
        lugar:this.formexperiencia.value.lugar as string,
        tipoJornada:tipojornadanueva as string,
        urlImagen:this.urlImagen as string,
        descripcion:this.formexperiencia.value.descripcion as string
      };
      this.experienciaservicio.getExperiencia(this.id).subscribe(data=>{
        if (this.urlImagen!=data.urlImagen){
          this.imagenservicio.eliminarImagen(data.urlImagen);
        }
      });
      this.experienciaservicio.actualizarExperiencia(experiencia1).subscribe(res=>{
        alert("Experiencia guardada");
        window.location.reload();
      });
    }

  }
  cerrar(){
    if (this.urlImagenNueva!=""){
      this.imagenservicio.eliminarImagen(this.urlImagenNueva);
    }
    this.cerrarventana.emit(false);

  }
  processFile(event:any) {
    this.progreso=true;
    this.progresoTerminado=false;
    let filea:File=event.files[0];
    let uploadTask=this.imagenservicio.subirImagen(filea,"/imagenes/experiencia/");
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
