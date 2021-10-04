import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './acceso/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './usuarios/usuario.service';
import { RegistroService } from './registro/registro.service';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { RegistrosComponent } from './registro/registros.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'usuarios', component:UsuariosComponent},
  {path:'usuarios/page/:page', component:UsuariosComponent},
  {path:'registros', component:RegistrosComponent},
  {path:'registros/page/:page', component:RegistrosComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    PaginatorComponent,
    RegistrosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UsuarioService,RegistroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
