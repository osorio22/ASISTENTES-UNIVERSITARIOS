
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    // Consultamos si existe una sesión activa
    const sesion = sessionStorage.getItem('sesion');

    if (sesion === 'activa') {

      // Si existe la sesión, permite entrar
      return true;

    } else {

      // Si no existe, redirige al Login
      this.router.navigate(['/login']);

      return false;
    }

  }

}
