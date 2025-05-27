import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectModel, IAPIResponse, LoginModel, UserModel, IProject } from '../Model/user';
import { BehaviorSubject, fromEvent, map, merge, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http: HttpClient = inject(HttpClient);

  apiUrl: string = '/api/CollegeProject/';

  onLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onGetUserProject$: Subject<any> = new Subject<boolean>();
  isOnline$ = merge(
    fromEvent(window, 'online').pipe(map(() => true)),
    fromEvent(window, 'offline').pipe(map(() => false)),
    new Observable((sub: Observer<boolean>) => {
      sub.next(navigator.onLine);
      sub.complete();
    })
  )

  constructor() { }

  isLoggedIn() {
    try {
      return !!localStorage.getItem('collegeProject');
    } catch (err) {
      return;
    }
  }

  login(obj: LoginModel): Observable<IAPIResponse> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Origin': '*',
        'Content-Type': 'application/json',
        authorization: 'Basic bW9iaWxlYXBpdXNlcjpwYXNzd29yZDEh'
      })
    }

    return this.http.post<IAPIResponse>(`${this.apiUrl}login`, obj, options);
  }

  addUser(obj: UserModel): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${this.apiUrl}AddNewUser`, obj);
  }

  getAllUsers(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${this.apiUrl}GetAllUsers`);
  }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiUrl}getAllProjects`);
  }

  getProjectByStatus(status: string): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${this.apiUrl}getProjectByStatus?status=${status}`);
  }

  getProjectByUserId(id: number): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiUrl}getProjectByUser?userid=${id}`);
  }

  getProjectById(id: number): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${this.apiUrl}${id}`);
  }

  updateProject(id: number, obj: ProjectModel): Observable<IAPIResponse> {
    return this.http.put<IAPIResponse>(`${this.apiUrl}${id}`, obj);
  }

  deleteProjectById(id: number): Observable<IAPIResponse> {
    return this.http.delete<IAPIResponse>(`${this.apiUrl}${id}`);
  }

  submitProject(obj: any): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${this.apiUrl}SubmitProject`, obj);
  }

}
