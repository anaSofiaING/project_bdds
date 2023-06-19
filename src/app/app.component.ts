import { Component } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idUsuario : any;
  currentUsuario :Usuario={}
  constructor(private UsuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('perfil');
    this.getUsuario(this.idUsuario);
  }
  getUsuario(id: string): void {
    this.UsuarioService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUsuario = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
