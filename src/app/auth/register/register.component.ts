
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formregister!: FormGroup;
  public mensajeError: string = '';
  public registroExitoso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.formregister = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  RegistrarUsuario(): void {

    this.mensajeError = '';

    if (this.formregister.invalid) {
      this.mensajeError = 'Completa correctamente todos los campos.';
      return;
    }

    const data = this.formregister.value;

    if (data.password !== data.confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    const correo = data.email.trim().toLowerCase();

    const usuarioExiste = usuarios.some(
      usuario => usuario.email === correo
    );

    if (usuarioExiste) {
      this.mensajeError = 'Este correo ya está registrado.';
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: data.nombre.trim(),
      email: correo,
      password: data.password
    };

    // Guardar el usuario
    usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Crear la sesión automáticamente
    sessionStorage.setItem('sesion', 'activa');
    sessionStorage.setItem('usuario', nuevoUsuario.nombre);
    sessionStorage.setItem('email', nuevoUsuario.email);

    this.registroExitoso = true;

    // Enviar al Dashboard
    this.router.navigateByUrl('/dashboard');
  }
}
