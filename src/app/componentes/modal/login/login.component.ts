import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AutenticacionService} from "../../../shared/servicios/autenticacion.service";
import {usuarioModel} from "../../../shared/modelo/usuario.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() salida = new EventEmitter<boolean>();
  formlogin: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    contrasenia: new FormControl('')
  });
  usuarioAutenticado: usuarioModel;

  constructor(private autenticacionservice: AutenticacionService,private ruta:Router) {
  }

  ngOnInit(): void {
  }

  cerrar() {
    this.salida.emit(false);
  }

  login() {
    this.autenticacionservice.autenticar(this.formlogin.value.usuario, this.formlogin.value.contrasenia).subscribe((data: usuarioModel) => {
      this.usuarioAutenticado=data;
      if(this.usuarioAutenticado!=null){
        console.log(this.usuarioAutenticado);
        sessionStorage.setItem("Currentusuario",JSON.stringify(this.usuarioAutenticado));
        this.ruta.navigate(['/editar']);
      }else{
        window.alert("Usuario o contraseña incorrecta");
      }
    });
  }
}
