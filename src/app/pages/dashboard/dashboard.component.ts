
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuario: string = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    // Recuperamos el correo de la sesión
    this.usuario = sessionStorage.getItem('usuario') || 'Estudiante';

  }

  // Método para cerrar sesión
  CerrarSesion(): void {

    sessionStorage.removeItem('sesion');
    sessionStorage.removeItem('usuario');

    // Regresar al Login
    this.router.navigateByUrl('/login');

  }

}
