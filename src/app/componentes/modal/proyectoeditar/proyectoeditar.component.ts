import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProyectoService} from "../../../shared/servicios/proyecto.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImagenesService} from "../../../shared/servicios/imagenes.service";
import {getDownloadURL} from "firebase/storage";

@Component({
  selector: 'app-proyectoeditar',
  templateUrl: './proyectoeditar.component.html',
  styleUrls: ['./proyectoeditar.component.css']
})
export class ProyectoeditarComponent implements OnInit {
  @Input() id:number;
  @Output() cerrarVentana= new EventEmitter<boolean>();

  formulario= new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    puesto: new FormControl('',[Validators.required]),
    linkProyecto: new FormControl(''),
    fechaInicio: new FormControl('',[Validators.required]),
    fechaFin: new FormControl(''),
    urlImagen: new FormControl(''),
    descripcion: new FormControl(''),
  })
  title="Agregar Proyecto";
  constructor(private servicioProyecto:ProyectoService,private imageneservicio:ImagenesService) { }
  progreso:boolean=false;
  progresoTerminado:boolean=false;
  porcentaje:number=0;
  urlImagen:string="";
  urlImagenNueva:string="";
  ngOnInit(): void {
    if (this.id!=-1){
      this.title="Editar Proyecto";
      this.servicioProyecto.GetProyectoId(this.id).subscribe(data=>{
        let fechaFin:string;
        if (data.fechaFin=="Actualidad"){
          fechaFin="";
        }else {
          fechaFin=data.fechaFin;
        }
        this.urlImagen=data.urlImagen;
        this.formulario.setValue({
          nombre:data.nombre as string,
          puesto:data.puesto as string,
          linkProyecto:data.linkProyecto as string,
          fechaInicio:data.fechaInicio as string,
          fechaFin:fechaFin as string,
          urlImagen:data.urlImagen as string,
          descripcion:data.descripcion as string,
        });
      });
    }
  }
  cerrar(){
    if (this.urlImagenNueva!=""){
      this.imageneservicio.eliminarImagen(this.urlImagenNueva);
    }
    this.cerrarVentana.emit(false);
  }
  eleminar(id:number){
    this.servicioProyecto.EliminarProyecto(id).subscribe(data=>{
      alert("Proyecto eliminado");
      this.cerrarVentana.emit(false);
      window.location.reload();
    });
  }
  Guardar(){
    let fechafin:string;
    if(this.formulario.value.fechaFin==""){
      fechafin="Actualidad";
    }else{
      fechafin=this.formulario.value.fechaFin as string;
    }
    if (this.urlImagenNueva!=""){
      this.urlImagen=this.urlImagenNueva;
    }
    if (this.id==-1){
     let proyecto={
        nombre:this.formulario.value.nombre,
        puesto:this.formulario.value.puesto,
        linkProyecto:this.formulario.value.linkProyecto,
        fechaInicio:this.formulario.value.fechaInicio,
        fechaFin:fechafin,
        urlImagen:this.urlImagen,
        descripcion:this.formulario.value.descripcion,
      }
      this.servicioProyecto.GurdarProyecto(proyecto).subscribe(data=>{
        alert("Proyecto guardado");
        this.cerrarVentana.emit(false);
        window.location.reload();
      });
    }else {
      let proyecto={
        id:this.id,
        nombre:this.formulario.value.nombre,
        puesto:this.formulario.value.puesto,
        linkProyecto:this.formulario.value.linkProyecto,
        fechaInicio:this.formulario.value.fechaInicio,
        fechaFin:fechafin,
        urlImagen:this.urlImagen,
        descripcion:this.formulario.value.descripcion,
      }
      this.servicioProyecto.GetProyectoId(this.id).subscribe(data=>{
        if (this.urlImagen!=data.urlImagen){
          this.imageneservicio.eliminarImagen(data.urlImagen);
        }
      });
      this.servicioProyecto.GurdarProyecto(proyecto).subscribe(data=>{
        alert("Proyecto guardado");
        this.cerrarVentana.emit(false);
        window.location.reload();
      });
    }
  }
  processFile(event:any) {
    this.progreso=true;
    this.progresoTerminado=false;
    let filea:File=event.files[0];
    let uploadTask=this.imageneservicio.subirImagen(filea,"/imagenes/proyecto/");
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
