import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Student } from '../com.ac.iitm';
import 'rxjs/Rx';

@Injectable()
export class StudentService
{
	private NAMESPACE: string = 'Student';

	constructor(private dataService: DataService<Student>)
	{
	};

	public getAll(): Observable<Student[]>
	{
		return this.dataService.getAll(this.NAMESPACE);
	}

	public getAsset(id: any): Observable<Student>
	{
		return this.dataService.getSingle(this.NAMESPACE, id);
	}

	public addAsset(itemToAdd: any): Observable<Student>
	{
		return this.dataService.add(this.NAMESPACE, itemToAdd);
	}

	public updateAsset(id: any, itemToUpdate: any): Observable<Student>
	{
		return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
	}

	public deleteAsset(id: any): Observable<Student>
	{
		return this.dataService.delete(this.NAMESPACE, id);
	}
}
