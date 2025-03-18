import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  token: string='';
  email: string='';

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  constructor() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];

    if (!this.token || !this.email) {
      this.router.navigate(['/login']);
      this.toastr.error('Link inválido');
    }
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')!;
    const confirmPassword = g.get('confirmPassword')!;
    return password.value === confirmPassword.value ? null : {'passwordMismatch': true};
  }

  get password() {
    return this.resetPasswordForm.get('password')!;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword({
        email: this.email,
        token: this.token,
        password: this.password.value
      }).subscribe({
        next: () => {
          this.toastr.success('Contraseña actualizada exitosamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error('Error al restablecer la contraseña');
        }
      });
    }
  }
}
