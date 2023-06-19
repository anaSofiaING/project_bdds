import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})

export class AddUsuarioComponent {

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    foto:'',
    correo: '',
    contrasena: '',
    pais: 2
  };
  submitted = false;

  constructor(private usuarioService: UsuarioService) { }

  saveUsuario(): void {
    const data = {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      foto: this.usuario.foto,
      correo: this.usuario.correo,
      contrasena: this.usuario.contrasena,
      pais: this.usuario.pais
    };

    this.usuarioService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });

     
      this.newUsuario(); 
  }

  newUsuario(): void {
    this.submitted = false;
    this.usuario = {
      nombre: '',
      apellido: '',
      foto:'',
      correo: '',
      contrasena: '',
      pais: 2
    };
  }

}


