
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {catchError} from 'rxjs';
import {GenericHttpService} from '../../../services/generic-http.service';

@Component({
  selector: 'app-async-await',
  templateUrl: './async-await.component.html',
  styleUrls: ['./async-await.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AsyncAwaitComponent {
  data: Array<any> = [];
  constructor (private genericHttpService: GenericHttpService) { }

  // //Sample API
  // //https://6cfead595cd14d0d981c7a3848130180.api.mockbin.io/
  // private baseUrl = 'https://6cfead595cd14d0d981c7a3848130180.api.mockbin.io/';
  // ngOnInit (): void {

  //   this.genericHttpService.getDummyData2(this.baseUrl).subscribe({
  //     next: (response: any) => {
  //       this.data = response.data;
  //     },
  //     error: (err: any) => {
  //       console.log(err);

  //     },
  //     complete: () => {
  //       console.log("completed");
  //     },
  //   });
  // }


  private baseUrl = 'https://6cfead595cd14d0d981c7a3848130180.api.mockbin.io/';
  async ngOnInit (): Promise<void> {
    try {
      const response = await this.genericHttpService.getDummyData2(this.baseUrl).pipe(
        catchError(error => {
          console.error('Error:', error);
          throw error;
        })
      ).toPromise();
      this.data = response.data;
      console.log("completed");
      console.log(this.data);

    } catch (error) {
      console.error(error);
    }
  }

}
