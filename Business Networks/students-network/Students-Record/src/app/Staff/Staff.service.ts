import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Staff } from '../com.ac.iitm';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class StaffService {

	
		private NAMESPACE: string = 'Staff';
	



    constructor(private dataService: DataService<Staff>) {
    };

    public getAll(): Observable<Staff[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getParticipant(id: any): Observable<Staff> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Staff> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Staff> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Staff> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
