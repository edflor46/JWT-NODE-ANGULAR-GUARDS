import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario:FormGroup = this._fb.group({
    name:  ['Test 4', [Validators.required]],
    email:  ['test4@test.com', [Validators.required, Validators.email]],
    password:  ['123456', [Validators.required, Validators.minLength(6)]]
  })
  constructor(private _fb:FormBuilder, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  registro(){
    console.log(this.miFormulario.value);

    const {name, email, password } = this.miFormulario.value;

    this.authService.registro(name, email, password).subscribe((ok) => {
      console.log(ok);
      if (ok === true) {
        Swal.fire('Good job!', 'You clicked the button!', 'success');

        this.router.navigateByUrl('/dashboard');
      } else {
        //MEnsaje de error
        Swal.fire('Error', ok, 'error');
      }
    });
    // this.router.navigateByUrl('/dashboard')
  }

}
