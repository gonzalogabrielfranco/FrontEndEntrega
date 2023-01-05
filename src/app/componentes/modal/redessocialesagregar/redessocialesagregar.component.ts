import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RedessocialesService} from "../../../shared/servicios/redessociales.service";
@Component({
  selector: 'app-redessocialesagregar',
  templateUrl: './redessocialesagregar.component.html',
  styleUrls: ['./redessocialesagregar.component.css']
})
export class RedessocialesagregarComponent implements OnInit {
  @Output() agregar=new EventEmitter<boolean>();
  constructor(private redessocialesservice:RedessocialesService) { }
  redesSociales=["Facebook","Twitter","Instagram","Linkedin","Youtube","Github"];
  formulario=new FormGroup(
    {
      nombre:new FormControl('',[Validators.required]),
      url:new FormControl('',[Validators.required]),
      urlImagen:new FormControl('')
    }
  );
  ngOnInit(): void {
    this.redessocialesservice.getRedesSociales().subscribe((data:any)=>{
      let aux=[];
      let aux2=[];
      for (let i = 0; i < data.length; i++) {
          aux.push(data[i].nombre);
      }
      for (let i = 0; i < this.redesSociales.length; i++) {
        if(!aux.includes(this.redesSociales[i])){
          aux2.push(this.redesSociales[i]);
        }
      }
      this.redesSociales=aux2;
      this.formulario.value.nombre=this.redesSociales[0];
    });
  }

  guardar(){
    switch (this.formulario.value.nombre) {
      case "Facebook":{
        this.formulario.value.urlImagen="/assets/imagenes/redessociales/logo-facebook.png";
        break;
      }
      case "Twitter":{
        this.formulario.value.urlImagen="/assets/imagenes/redessociales/logo-twitter.png";
        break;
      }
      case "Instagram":{
        this.formulario.value.urlImagen="/assets/imagenes/redessociales/logo-instagram.png";
        break;
      }
      case "Linkedin":{
        this.formulario.value.urlImagen="/assets/imagenes/redessociales/logo-linkedin.png";
        break;
      }
      case "Youtube":{
        this.formulario.value.urlImagen="/assets/imagenes/redessociales/logo-youtube.png";
        break;
      }
      case "Github":{
        this.formulario.value.urlImagen="/assets/imagenes/redessociales/logo-github.png";
        break;
      }

    }
    let redsocial={
      "nombre":this.formulario.value.nombre as string,
      "url":this.formulario.value.url as string,
      "urlImagen":this.formulario.value.urlImagen as string
    }
    let url:string=this.formulario.value.url as string;
    if(!url.startsWith("http",0) ){
      redsocial.url="http://"+url;
    }

    this.redessocialesservice.guardarRedesSociales(redsocial).subscribe((data:any)=>{
      alert("Se guardo correctamente");
      window.location.reload();

    });

  }
  cerrar(){
    this.agregar.emit(false);
  }
}
