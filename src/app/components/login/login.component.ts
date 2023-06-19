
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    foto:'',
    correo: '',
    contrasena: '',
    pais: 2
  };
  loginUsuario ?: Usuario[];
  submitted = false;
  currentUsuario: Usuario = {};
  currentIndex = -1;

  constructor(private usuarioService: UsuarioService, private router:Router) { }

  login(): void {
    this.currentUsuario = {};
    this.currentIndex = -1;
  
    this.usuarioService.findByCorreo(this.usuario.correo)
      .subscribe({
        next: (data) => {
          this.loginUsuario = data;
          for(let i=0; i<this.loginUsuario.length; i++){
              if(this.usuario.correo==this.loginUsuario[i].correo &&this.usuario.contrasena==this.loginUsuario[i].contrasena){
                localStorage.setItem('perfil', this.loginUsuario[i].id);
                this.router.navigate(['/inicio/']);
                this.submitted=false;
              }
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
      this.submitted=true;
  }
}

