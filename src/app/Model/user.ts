export interface IAPIResponse {
    message: string;
    result: boolean;
    data: any;
}

export interface IProject {
    submissionId: number;
    studentName: string;
    contactNo: string;
    emailId: string;
    status: string;
    projectTitle: string;
    startDate: string;
    endDate: string;
    department: string;
    course: string;
    technologies: string;
    isGroupProject: boolean;
    groupMembers: string;
    isSynopsisSubmitted: boolean;
    dateOfSubmission: string;
    projectDescription: string;
    gitHubUrl: string;
    userId: number;
}

export class LoginModel {
    userName: string;
    password: string;

    constructor() {
        this.userName = '';
        this.password = '';
    }
}

export class UserModel {
    userId: number;
    userName: string;
    fullName: string;
    role: string;
    emailId: string;
    createdDate: Date;
    password: string;
    projectName: string;
    refreshToken: string;
    refreshTokeExpiryTime: string;

    constructor() {
        this.userId = 0;
        this.userName = '';
        this.fullName = '';
        this.emailId = '';
        this.createdDate = new Date();
        this.password = '';
        this.role = '';
        this.projectName = 'College Project';
        this.refreshToken = '';
        this.refreshTokeExpiryTime = '';
    }
  
}

export class ProjectModel {
    submissionId: number;
    studentName: string;
    contactNo: string;
    emailId: string;
    status: string;
    projectTitle: string;
    startDate: string;
    endDate: string;
    department: string;
    course: string;
    technologies: string;
    isGroupProject: boolean;
    groupMembers: string;
    isSynopsisSubmitted: boolean;
    dateOfSubmission: string;
    projectDescription: string;
    gitHubUrl: string;
    userId: number;

    constructor() {
        this.submissionId = 0;
        this.contactNo = '';
        this.studentName = '';
        this.emailId = '';
        this.status = '';
        this.projectTitle = '';
        this.startDate = '';
        this.endDate = '';
        this.department = '';
        this.course = '';
        this.technologies = '';
        this.isGroupProject = false;
        this.groupMembers = '';
        this.isSynopsisSubmitted = false;
        this.dateOfSubmission = '';
        this.projectDescription = '';
        this.gitHubUrl = '';
        this.userId = 0;
    }
  
}