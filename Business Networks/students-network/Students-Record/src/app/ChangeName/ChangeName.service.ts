import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ChangeName } from '../com.ac.iitm';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ChangeNameService {

	
		private NAMESPACE: string = 'ChangeName';
	



    constructor(private dataService: DataService<ChangeName>) {
    };

    public getAll(): Observable<ChangeName[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<ChangeName> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<ChangeName> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<ChangeName> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<ChangeName> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
