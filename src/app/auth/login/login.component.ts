import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  //fotmGroup es un tipao de angular
// para quitar el error en "public formlogin:" le agregamos ! o ? 
  public formlogin!: FormGroup;

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    // console.log("Estoy en el login"); metodoo propoio que me permite iniciarlizar cuando este en el componente

    this.formInit()
  }

  //Metodo para iniciar el Form
  formInit(){
    this.formlogin = this.fb.group({
      email: [""],
      password: [""]
    })
    
  }

  
  IniciarSesion(){
    const data = this.formlogin.value
    console.log(data);
    
  } 
}