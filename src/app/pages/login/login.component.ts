import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { IAPIResponse, LoginModel } from '../../Model/user';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  masterService: MasterService = inject(MasterService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  @ViewChild('loginPassword') loginPassword!: ElementRef;

  isShowIconVisible: boolean = false;
  isLoginLoading: boolean = false;

  loginObj: LoginModel = new LoginModel();

  login() {
    this.isLoginLoading = true;
    this.masterService.login(this.loginObj).subscribe({
      next: (res: IAPIResponse) => {
        if (res.result) {
          this.isLoginLoading = false;
          this.router.navigateByUrl('/projects');
          try {
            localStorage.setItem('collegeProject', JSON.stringify(res.data));
          } catch (err) {
          }
          this.masterService.onLogin$.next(true);
        }
      },
      error: (err: IAPIResponse)=>{
        this.toastr.error("Something went wrong. Please try again!");
        this.isLoginLoading = false;
      }
    })
  }

  showPassword() {
    if (this.loginPassword.nativeElement.type == "password") {
      this.loginPassword.nativeElement.type = "text";
      this.isShowIconVisible = true;
    } else {
      this.loginPassword.nativeElement.type = "password";
      this.isShowIconVisible = false;
    }
  }

}
