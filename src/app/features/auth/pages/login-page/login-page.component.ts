import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {login, LoginService} from "../../../../core/auth/services/login-service/login.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  protected loginForm!: FormGroup;
  private _token = signal<string | null>(localStorage.getItem('token'));


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {

    this.buildForm();

  }

  public buildForm(){
    this.loginForm = this.formBuilder.group<login>({
      email: undefined,
      password: undefined,
    });
  }


  login($event: any){
    $event.preventDefault();
    this.loginService.login(this.loginForm.value).subscribe({
      next: (result) => {
        this._token.set(result.token);
        localStorage.setItem('token', result.token);
        localStorage.setItem('rol', result.rol);
        localStorage.setItem('name', result.name)
        localStorage.setItem('id', result.id)

        this.router.navigateByUrl('/dashboard');
      }, error: (errorResponse) => {
        window.alert('Ha habido un error iniciando sesión. Intentelo de nuevo');
        console.log(errorResponse);
      }
    });
  }

}
