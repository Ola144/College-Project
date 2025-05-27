import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAPIResponse, IProject, ProjectModel } from '../../Model/user';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  projectList: IProject[] = [];

  filteredProject: IProject[] = [];

  projectDetail: IProject | undefined;

  isProjectFormVisible: boolean = false;
  isConfirmDelete: boolean = false;
  isAllProjectBtnVisible: boolean = false;

  isProjejectExist: boolean = false;

  isSubmitProjectLoading: boolean = false;
  isUpdateProjectLoading: boolean = false;
  isDeleteProjectLoading: boolean = false;
  isLoadingProject: boolean = false;

  loggedUser: any;

  projectId: number = 0;
  submissionId: number = 0;


  projectForm: FormGroup = new FormGroup({});

  constructor() {
    try{
      const localData = localStorage.getItem('collegeProject');
      if (localData != null) {
        this.loggedUser = JSON.parse(localData);
      }
    }catch(err){}
  }

  ngOnInit(): void {
   this.getAllProject()

    this.masterService.onGetUserProject$.subscribe({
      next: (res: any) => {
        this.getProjectByUserId();
      }
    })

    this.projectList = this.activeRoute.snapshot.data['projects'];

    this.initializeForm();
  }

  initializeForm(projectData?: ProjectModel) {
    this.projectForm = new FormGroup({
      submissionId: new FormControl(projectData ? projectData.submissionId : 0),
      studentName: new FormControl(projectData ? projectData.studentName : '', [Validators.required]),
      contactNo: new FormControl(projectData ? projectData.contactNo : '', [Validators.required, Validators.min(10)]),
      emailId: new FormControl(projectData ? projectData.emailId : '', [Validators.required, Validators.email]),
      status: new FormControl(projectData ? projectData.status : '', [Validators.required]),
      projectTitle: new FormControl(projectData ? projectData.projectTitle : '', [Validators.required]),
      startDate: new FormControl(projectData ? projectData.startDate : Date, [Validators.required]),
      endDate: new FormControl(projectData ? projectData.endDate : Date, [Validators.required]),
      department: new FormControl(projectData ? projectData.department : '', [Validators.required]),
      course: new FormControl(projectData ? projectData.course : '', [Validators.required]),
      technologies: new FormControl(projectData ? projectData.technologies : '', [Validators.required]),
      isGroupProject: new FormControl(projectData ? projectData.isGroupProject : false),
      groupMembers: new FormControl(projectData ? projectData.groupMembers : ''),
      isSynopsisSubmitted: new FormControl(projectData ? projectData.isSynopsisSubmitted : false),
      dateOfSubmission: new FormControl(projectData ? projectData.dateOfSubmission : Date, [Validators.required]),
      projectDescription: new FormControl(projectData ? projectData.projectDescription : '', [Validators.required]),
      gitHubUrl: new FormControl(projectData ? projectData.gitHubUrl : '', [Validators.required]),
      userId: new FormControl(this.loggedUser.userId),
    })
  }

  projectDetails(data: IProject) {
    this.projectDetail = data;
  }

  getAllProject() {
    this.isLoadingProject = true;
    this.masterService.getAllProjects().subscribe({
      next: (res: any)=>{
        this.projectList = res;
        this.isLoadingProject = false;
        this.isAllProjectBtnVisible = false;
        this.applySearch('all');
      },
      error: (err: any) => {
        this.toastr.error("Something when wrong. Try again!");
        this.isLoadingProject = false;
      }
    })
  }

  getProjectByUserId() {
    this.isLoadingProject = true;
    this.masterService.getProjectByUserId(this.loggedUser.userId).subscribe({
      next: (res: any)=>{
        this.projectList = res;
        this.isLoadingProject = false;
        this.isAllProjectBtnVisible = true;
        this.applySearch('all');
      },
      error: (err: any) => {
        this.toastr.error("Something when wrong. Try again!");
        this.isLoadingProject = false;
      }
    })
  }

  submitProject() {
    this.isSubmitProjectLoading = true;
    const formValue = this.projectForm.value;

    this.masterService.submitProject(formValue).subscribe({
      next: (res: any) => {
        this.toastr.success("Project sumbitted successfully!");
        this.projectForm.reset();
        this.isSubmitProjectLoading = false;
        this.getAllProject();
      },
      error: (err: any) => {
        this.toastr.error("Something went wrong. Please, try again!");
        this.isSubmitProjectLoading = false;
      }
    })
  }

  onEdit(projectData: ProjectModel) {
    this.initializeForm(projectData);
    this.projectId = projectData.submissionId;
  }

  updateProject() {
    this.isUpdateProjectLoading = true;
    const formValue = this.projectForm.value;

    this.masterService.updateProject(this.projectId, formValue).subscribe({
      next: (res: any) => {
        this.toastr.success("Project updated successfully!");
        this.projectForm.reset();
        this.isUpdateProjectLoading = false;
        this.getAllProject();
      },
      error: (err: IAPIResponse) => {
        this.toastr.error("Something went wrong. Please, try again!");
        this.isUpdateProjectLoading = false;
      }
    })
  }

  onDelete(id: number) {
    this.submissionId = id;
    this.isConfirmDelete = true;
    window.scrollTo(0, 0);
  }

  deleteProjectById() {
    this.isDeleteProjectLoading = true;
    this.masterService.deleteProjectById(this.submissionId).subscribe({
      next: (res: any) => {
        this.toastr.success("Project deleted successfully!");
        this.getAllProject();
        this.isDeleteProjectLoading = false;
        this.isConfirmDelete = false;
      },
      error: (err: IAPIResponse) => {
        this.toastr.error("Something went wrong. Please, try again!");
        this.isDeleteProjectLoading = false;
      }
    })
  }

  closeProjectForm() {
    this.projectForm.reset();
  }

  applySearch(value: string) {
    if (value == '' || value == 'all') {
      this.filteredProject = this.projectList;
    } else {
      this.filteredProject = this.projectList.filter(project => project.projectTitle.toLowerCase().includes(value.toLowerCase()) || project.studentName.toLowerCase().includes(value.toLowerCase()));
    }
  }
}
