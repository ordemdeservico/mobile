import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderService } from '../models/os.model';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  private readonly API = environment.API;

  constructor(
    private http: HttpClient
  ) { }

  getOrderServices(id: number): Observable<{error: string, result: OrderService[]}>{
    return this.http.get<{error: string, result: OrderService[]}>(`${this.API}/ordem-servico/tecnico/${id}`);
  }
}
