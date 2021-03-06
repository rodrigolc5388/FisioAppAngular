import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';

import { User } from '../models/user.model';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['login.component.css']
})
export class RegisterComponent implements OnInit {

  isProfessional: boolean = false;
  form: FormGroup;

  constructor(
    public _userService: UserService,
    public _router: Router
  ) {}

  // Generic function
  areEquals(field1: string, field2: string) {
    return (group: FormGroup) => {
      const password = group.controls[field1].value;
      const passwordToConfirm = group.controls[field2].value;

      if (password === passwordToConfirm) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup(
      {
        // tslint:disable-next-line:max-line-length
        /* Primer valor por defecto, se puede dejar tanto null como '', segundo valor validaciones, puedes mandar una o un array de validaciones
       [Validators.required, ]
      */
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
        conditions: new FormControl(),
        isProfessional: new FormControl(null, Validators.required)
      }, { validators: this.areEquals('password', 'confirmPassword' )});
    // Autogenerator forms
    this.form.setValue({
      name: 'Test ',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
      conditions: true,
      isProfessional: this.isProfessional
    });
  }

  registerUser() {

    if (this.form.invalid) {
      return;
    }

    if ( !this.form.value.conditions ) {
      swal('Importante', 'Debe de aceptar las condiciones de uso para continuar', 'warning');
      return;
    }

    // console.log('El formulario es: ');
    // console.log(this.form.value);
    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password,
      '',
      this.form.value.isProfessional
    );

    // console.log(`El formulario es: ${this.form.valid}`);
    // console.log(this.form.value);

    this._userService.createNewUser( user )
        .subscribe( response => {
          console.log('Respuesta al crear user en register component');
          // console.log( response );
          console.log( user );
          swal('Registro OK', `El usuario ${user.name} ha sido creado satisfactoriamente`, 'success');
          this._router.navigate(['/login']);
        });
  }
}
