import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StaffService } from './Staff.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Viewer',
	templateUrl: './Staff.component.html',
	styleUrls: ['./Staff.component.css'],
  providers: [StaffService]
})
export class StaffComponent implements OnInit {

  myForm: FormGroup;

  private allStaff;
  private staff;
  private currentId;
	private errorMessage;

  
      
          staffId = new FormControl("", Validators.required);
        
  
      
          name = new FormControl("", Validators.required);
        
  
      
        
  


  constructor(private serviceStaff:StaffService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          staffId:this.staffId,
        
    
        
          name:this.name,
        
    
        
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceStaff.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(staff => {
        tempList.push(staff);
      });
      this.allStaff = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.staff = {
      $class: "com.ac.iitm.Staff",
      
        
          "staffId":this.staffId.value,
        
      
        
          "name":this.name.value,
        
      
        
          
        
      
    };

    this.myForm.setValue({
      
        
          "staffId":null,
        
      
        
          "name":null,
        
      
        
      
    });

    return this.serviceStaff.addParticipant(this.staff)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "staffId":null,
        
      
        
          "name":null,
        
      
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.staff = {
      $class: "com.ac.iitm.Staff",
      
        
          
        
 
        
          
            "name":this.name.value,
          
        
          
        
    
    };

    return this.serviceStaff.updateParticipant(form.get("staffId").value,this.staff)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceStaff.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceStaff.getParticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "staffId":null,
          
        
          
            "name":null,
          
        
          
          
        
      };



      
        if(result.staffId){
          
            formObject.staffId = result.staffId;
          
        }else{
          formObject.staffId = null;
        }
      
        
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "staffId":null,
        
      
        
          "name":null,
        
      
      
      });
  }

}
