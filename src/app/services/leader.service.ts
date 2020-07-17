import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of , Observable} from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeader(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(LEADERS).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leadership => leadership[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
