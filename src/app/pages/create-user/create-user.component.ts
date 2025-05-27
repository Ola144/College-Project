import { Component, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAPIResponse, UserModel } from '../../Model/user';
import { ToastrService } from 'ngx-toastr';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);

  userObj: UserModel = new UserModel();

  isCreateUserLoading: boolean = false;

  addUser(){
    this.isCreateUserLoading = true;
    this.masterService.addUser(this.userObj).subscribe({
      next: (res: IAPIResponse) => {
        if (res.result) {
          this.toastr.success(res.message);
          this.isCreateUserLoading = false;
        }
      },
      error: (err: IAPIResponse) => {
          this.toastr.error(err.message);
          this.isCreateUserLoading = false;
      }
    });
  }
  
}
