
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formlogin!: FormGroup;
  public mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  // Inicializar el formulario
  formInit(): void {
    this.formlogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Iniciar sesión
  IniciarSesion(): void {

    this.mensajeError = '';

    if (this.formlogin.invalid) {
      this.mensajeError = 'Por favor, ingresa un correo válido y una contraseña.';
      return;
    }

    const data = this.formlogin.value;
    const correo = data.email.trim().toLowerCase();

    // Primera opción: usuario de prueba
    const correoCorrecto = 'juan@gmail.com';
    const contrasenaCorrecta = '123456';

    if (
      correo === correoCorrecto &&
      data.password === contrasenaCorrecta
    ) {
      sessionStorage.setItem('sesion', 'activa');
      sessionStorage.setItem('usuario', 'Juan');
      sessionStorage.setItem('email', correo);

      this.router.navigate(['/dashboard']);
      return;
    }

    // Segunda opción: usuarios registrados
    const usuarios = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    const usuarioEncontrado = usuarios.find(
      (usuario: any) =>
        usuario.email === correo &&
        usuario.password === data.password
    );

    if (usuarioEncontrado) {
      sessionStorage.setItem('sesion', 'activa');
      sessionStorage.setItem('usuario', usuarioEncontrado.nombre);
      sessionStorage.setItem('email', usuarioEncontrado.email);

      this.router.navigate(['/dashboard']);

    } else {
      this.mensajeError = 'Correo o contraseña incorrectos. Intenta nuevamente.';
    }
  }

}
