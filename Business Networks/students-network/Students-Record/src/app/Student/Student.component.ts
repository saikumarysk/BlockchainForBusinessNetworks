import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from './Student.service';
import 'rxjs/add/operator/toPromise';

@Component
({
	selector: 'app-Student',
	templateUrl: './Student.component.html',
	styleUrls: ['./Student.component.css'],
	providers: [StudentService]
})

export class StudentComponent implements OnInit
{

	myForm: FormGroup;
	private allAssets;
	private asset;
	private currentId;
	private errorMessage;

	rollNo = new FormControl("", Validators.required);
	name = new FormControl("", Validators.required);
	roomNo = new FormControl("", Validators.required);
	hostel = new FormControl("", Validators.required);
	gender = new FormControl("", Validators.required);

	constructor(private serviceStudent:StudentService, fb: FormBuilder)
	{
		this.myForm = fb.group
		({
		rollNo:this.rollNo,
		name:this.name,
		roomNo:this.roomNo,
		hostel:this.hostel,
		gender:this.gender
		});
	};

	ngOnInit(): void
	{
		this.loadAll();
	}

	loadAll(): Promise<any>
	{
		let tempList = [];
		return this.serviceStudent.getAll().toPromise().then((result) =>
		{
			this.errorMessage = null;
			result.forEach(asset => {
			tempList.push(asset);
			});
			this.allAssets = tempList;
		}).catch((error) =>
		{
			if(error == 'Server error')
			{
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found')
			{
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else
			{
				this.errorMessage = error;
			}
		});
	}

	changeArrayValue(name: string, value: any): void
	{
		const index = this[name].value.indexOf(value);
		if (index === -1)
		{
			this[name].value.push(value);
		}
		else
		{
			this[name].value.splice(index, 1);
		}
	}

	hasArrayValue(name: string, value: any): boolean
	{
		return this[name].value.indexOf(value) !== -1;
	}

	addAsset(form: any): Promise<any>
	{
		this.asset = 
		{
			$class: "com.ac.iitm.Student",
			"rollNo":this.rollNo.value,
			"name":this.name.value,
			"roomNo":this.roomNo.value,
			"hostel":this.hostel.value,
			"gender":this.gender.value
		};

		this.myForm.setValue
		({
			"rollNo":null,
			"name":null,
			"roomNo":null,
			"hostel":null,
			"gender":null
		});

		return this.serviceStudent.addAsset(this.asset).toPromise().then(() =>
		{
			this.errorMessage = null;
			this.myForm.setValue
			({
				"rollNo":null,
				"name":null,
				"roomNo":null,
				"hostel":null,
				"gender":null 
			});
		})
		.catch((error) =>
		{
			if(error == 'Server error')
			{
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else
			{
				this.errorMessage = error;
			}
		});
	}


	deleteAsset(): Promise<any>
	{
		return this.serviceStudent.deleteAsset(this.currentId).toPromise().then(() =>
		{
			this.errorMessage = null;
		}).catch((error) =>
		{
			if(error == 'Server error')
			{
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found')
			{
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else
			{
				this.errorMessage = error;
			}
		});
	}

	setId(id: any): void
	{
		this.currentId = id;
	}

	getForm(id: any): Promise<any>
	{
		return this.serviceStudent.getAsset(id)	.toPromise().then((result) =>
		{
			this.errorMessage = null;
			let formObject = 
			{
				"rollNo":null,
				"name":null,
				"roomNo":null,
				"hostel":null,
				"gender":null
			};
			if(result.rollNo)
			{
				formObject.rollNo = result.rollNo;
			}
			else
			{
				formObject.rollNo = null;
			}

			if(result.name)
			{
				formObject.name = result.name;
			}
			else
			{
				formObject.name = null;
			}

			if(result.roomNo)
			{
				formObject.roomNo = result.roomNo;
			}
			else
			{
				formObject.roomNo = null;
			}

			if(result.hostel)
			{
				formObject.hostel = result.hostel;
			}
			else
			{
				formObject.hostel = null;
			}

			if(result.gender)
			{
				formObject.gender = result.gender;
			}
			else
			{
				formObject.gender = null;
			}
			this.myForm.setValue(formObject);
		}).catch((error) => 
		{
			if(error == 'Server error')
			{
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found')
			{
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else
			{
				this.errorMessage = error;
			}
		});
	}

	resetForm(): void
	{
		this.myForm.setValue
		({
			"rollNo":null,
			"name":null,
			"roomNo":null,
			"hostel":null,
			"gender":null
		});
	}

	csvFormAdd(): void
	{
		var fileToLoad = (<HTMLInputElement>document.getElementById("csvFile")).files[0];
		var newService = this.serviceStudent;
		var fR = new FileReader();
		var objArray = [];
		fR.readAsText(fileToLoad);
		fR.onload = function(e:any)
		{
			var rows = e.target.result.split("\n");	
			for(var i=0;i<rows.length-1;i++)
			{
				var cells = rows[i].split(",");
				var newAsset = 
				{
					$class: "com.ac.iitm.Student",
					"rollNo":cells[0],
					"name": cells[1],
					"roomNo":parseInt(cells[2]),
					"hostel":cells[3],
					"gender":cells[4]
				}
				console.log(newAsset);
				newService.addAsset(newAsset).toPromise();
				objArray.push(newAsset);
			}
		}
	}

}