import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { LandOwner } from '../com.ac.iitm';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LandOwnerService {

	
		private NAMESPACE: string = 'LandOwner';
	



    constructor(private dataService: DataService<LandOwner>) {
    };

    public getAll(): Observable<LandOwner[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getParticipant(id: any): Observable<LandOwner> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<LandOwner> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<LandOwner> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<LandOwner> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
