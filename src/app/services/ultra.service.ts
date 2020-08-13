import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/ultra';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  message: string,
  user_id: string,
  token: string
}

export interface Pass {
  latitude: number,
  longitude: number,
  elevation_m: number,
  aos_utc: Date,
  los_utc: Date
}

export interface Request {
  pass: Pass,
  is_approved: boolean,
  is_sent: boolean
}

export interface Telemetry {
  id: number,
  received_at: Date,
  invalid_count: number,
  sensor_used: number,
  vector_body_1: number,
  vector_body_2: number,
  vector_body_3: number,
  vector_valid: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UltraService {
  constructor(private http: HttpClient, private cookie_service: CookieService){}

  get_cached_username(): string {
    return this.cookie_service.get('username');
  }

  get_cached_token(): string {
    return this.cookie_service.get('token');
  }

  get_telemetry(): Observable<Array<Telemetry>> {
    const uri = `${environment.ultra_url}/telemetry`;
    return this.http.get<Array<Telemetry>>(uri, {observe: 'body'});
  }

  get_user(token: string): Observable<User> {
    const uri = `${environment.ultra_url}/user`;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<User>(uri, {'headers': headers, observe: 'body'});
  }

  post_user(username: string): void {
    const uri = `${environment.ultra_url}/user`;
    const request = this.http.post<User> (uri, {user_id: username, observe: 'body'});
    request.subscribe((data) => {
      this.cookie_service.set('token', data.token);
      this.cookie_service.set('username', data.user_id);
    });
  }

  get_all_requests(token: string): Observable<Array<Request>> {
    const uri = `${environment.ultra_url}/request`;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<Array<Request>>(uri, {'headers': headers, observe: 'body'});
  }

  post_request(token: string, requested_pass: Pass): Observable<any> {
    const uri = `${environment.ultra_url}/request`;
    const headers = new HttpHeaders().set('token', token);
    return this.http.post(uri, {latitude: requested_pass.latitude,
                                longitude: requested_pass.longitude,
                                elevation_m: requested_pass.elevation_m,
                                aos_utc: requested_pass.aos_utc,
                                los_utc: requested_pass.los_utc,
                                observe: 'body'},
                                {headers});
  }

  get_passes(latitude: number, longitude: number): Observable<Array<Pass>> {
    const uri = `${environment.ultra_url}/passes`;
    const parameters = new HttpParams()
                       .append('latitude', latitude.toString())
                       .append('longitude', longitude.toString());
    return this.http.get<Array<Pass>>(`${uri}?${parameters}`);
  }
}
