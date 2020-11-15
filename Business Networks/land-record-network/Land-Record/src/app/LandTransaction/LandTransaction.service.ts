import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { LandTransaction } from '../com.ac.iitm';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LandTransactionService {

	
		private NAMESPACE: string = 'LandTransaction';
	



    constructor(private dataService: DataService<LandTransaction>) {
    };

    public getAll(): Observable<LandTransaction[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<LandTransaction> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<LandTransaction> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<LandTransaction> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<LandTransaction> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
