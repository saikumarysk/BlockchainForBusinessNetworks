import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ChangeGender } from '../com.ac.iitm';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ChangeGenderService {

	
		private NAMESPACE: string = 'ChangeGender';
	



    constructor(private dataService: DataService<ChangeGender>) {
    };

    public getAll(): Observable<ChangeGender[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<ChangeGender> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<ChangeGender> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<ChangeGender> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<ChangeGender> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
