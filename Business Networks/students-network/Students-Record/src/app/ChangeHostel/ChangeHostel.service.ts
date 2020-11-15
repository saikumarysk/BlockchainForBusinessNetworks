import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ChangeHostel } from '../com.ac.iitm';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ChangeHostelService {

	
		private NAMESPACE: string = 'ChangeHostel';
	



    constructor(private dataService: DataService<ChangeHostel>) {
    };

    public getAll(): Observable<ChangeHostel[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<ChangeHostel> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<ChangeHostel> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<ChangeHostel> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<ChangeHostel> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
