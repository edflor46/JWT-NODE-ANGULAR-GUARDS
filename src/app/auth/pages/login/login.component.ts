import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  miFormulario: FormGroup = this._fb.group({
    email: ['Test1@Test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.validarToken().subscribe(console.log);

    // console.log(this.miFormulario.value);

    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password).subscribe((ok) => {
      console.log(ok);
      if (ok === true) {
        Swal.fire('Good job!', 'You clicked the button!', 'success');

        this.router.navigateByUrl('/dashboard');
      } else {
        //MEnsaje de error
        Swal.fire('Error', ok, 'error');
      }
    });
  }
}
