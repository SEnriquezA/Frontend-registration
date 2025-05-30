import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted = false;
  message = '';

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get f() {
    return this.registerForm.controls;
  }

onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
  }

  // Extraemos el valor asegurándonos que username y password no sean null
  const formValue = this.registerForm.value;
  const user = {
    username: formValue.username ?? '',
    password: formValue.password ?? ''
  };

  this.authService.register(user).subscribe({
    next: () => this.message = 'Usuario registrado exitosamente',
    error: () => this.message = 'Error al registrar usuario'
  });
}

}
