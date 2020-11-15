import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Viewer } from '../com.ac.iitm';
import 'rxjs/Rx';

@Injectable()
export class ViewerService
{
	private NAMESPACE: string = 'Viewer';

	constructor(private dataService: DataService<Viewer>)
	{
	};

	public getAll(): Observable<Viewer[]>
	{
		return this.dataService.getAll(this.NAMESPACE);
	}

	public getParticipant(id: any): Observable<Viewer>
	{
		return this.dataService.getSingle(this.NAMESPACE, id);
	}

	public addParticipant(itemToAdd: any): Observable<Viewer>
	{
		return this.dataService.add(this.NAMESPACE, itemToAdd);
	}

	public updateParticipant(id: any, itemToUpdate: any): Observable<Viewer>
	{
		return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
	}

	public deleteParticipant(id: any): Observable<Viewer>
	{
		return this.dataService.delete(this.NAMESPACE, id);
	}

}
