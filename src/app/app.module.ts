import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TopbarComponent } from './componentes/topbar/topbar.component';
import { PortadaComponent } from './componentes/portada/portada.component';
import { AcercadeComponent } from './componentes/acercade/acercade.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HardandsoftskillComponent } from './componentes/hardandsoftskill/hardandsoftskill.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { PortfolioverComponent } from './componentes/portfoliover/portfoliover.component';
import { PortfolioeditarComponent } from './componentes/portfolioeditar/portfolioeditar.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './componentes/modal/login/login.component';
import {Router, RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {GuardGuard} from "./shared/servicios/guard.guard";
import { AcercadeeditarComponent } from './componentes/modal/acercadeeditar/acercadeeditar.component';
import { ExperienciaeditarComponent } from './componentes/modal/experienciaeditar/experienciaeditar.component';
import { EducacioneditarComponent } from './componentes/modal/educacioneditar/educacioneditar.component';
import { ProyectoeditarComponent } from './componentes/modal/proyectoeditar/proyectoeditar.component';
import { RedessocialeseditarComponent } from './componentes/modal/redessocialeseditar/redessocialeseditar.component';
import { CompetenciasEditarComponent } from './componentes/modal/competencias-editar/competencias-editar.component';
import { CompetenciasAgregarComponent } from './componentes/modal/competencias-agregar/competencias-agregar.component';
import { CompetenciaseliminarComponent } from './componentes/modal/competenciaseliminar/competenciaseliminar.component';
import { PersonaEditarComponent } from './componentes/modal/persona-editar/persona-editar.component';
import { RedessocialesagregarComponent } from './componentes/modal/redessocialesagregar/redessocialesagregar.component';
import { RedessocialeseliminarComponent } from './componentes/modal/redessocialeseliminar/redessocialeseliminar.component';
import { PersonaeliminarComponent } from './componentes/modal/personaeliminar/personaeliminar.component';


export const routes: Routes = [
  { path: '', component: PortfolioverComponent},
  { path: 'editar', component: PortfolioeditarComponent ,canActivate: [GuardGuard]},
  {path:  '**', component:  PortfolioverComponent, pathMatch:  'full'}
  ]
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    PortadaComponent,
    AcercadeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HardandsoftskillComponent,
    ProyectoComponent,
    PortfolioverComponent,
    PortfolioeditarComponent,
    LoginComponent,
    AcercadeeditarComponent,
    ExperienciaeditarComponent,
    EducacioneditarComponent,
    ProyectoeditarComponent,
    RedessocialeseditarComponent,
    CompetenciasEditarComponent,
    CompetenciasAgregarComponent,
    CompetenciaseliminarComponent,
    PersonaEditarComponent,
    RedessocialesagregarComponent,
    RedessocialeseliminarComponent,
    PersonaeliminarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
