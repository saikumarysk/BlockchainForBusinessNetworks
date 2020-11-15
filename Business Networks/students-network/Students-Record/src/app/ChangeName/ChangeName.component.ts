import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChangeNameService } from './ChangeName.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Viewer',
	templateUrl: './ChangeName.component.html',
	styleUrls: ['./ChangeName.component.css'],
  providers: [ChangeNameService]
})
export class ChangeNameComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private transaction;
  private currentId;
	private errorMessage;

  
      
          name = new FormControl("", Validators.required);
        
  
      
          relatedStudentRollNo = new FormControl("", Validators.required);
        
  
        
  


  constructor(private serviceTransaction: ChangeNameService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          name:this.name,
        
    
        
          relatedStudentRollNo:this.relatedStudentRollNo,
        
    
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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

  addTransaction(form: any): Promise<any> {
    this.transaction = {
      $class: "com.ac.iitm.ChangeName",
      
        
          "name":this.name.value,
        
      
        
          "relatedStudentRollNo":this.relatedStudentRollNo.value,


          "transactionId":"",


          "timestamp": new Date().toISOString()
        
      
        
      
    };

    this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "relatedStudentRollNo":null,
        
      
        
      
    });

    return this.serviceTransaction.addTransaction(this.transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "name":null,
        
      
        
          "relatedStudentRollNo":null,
        
        
      
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


   updateTransaction(form: any): Promise<any> {
    this.transaction = {
      $class: "com.ac.iitm.ChangeName",
      
        
          
        
 
        
          
            "name":this.name.value,
          
            "relatedStudentRollNo":this.relatedStudentRollNo.value
    
          
        
    
    };

    return this.serviceTransaction.updateTransaction(form.get("name").value,this.transaction)
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


  deleteTransaction(): Promise<any> {

    return this.serviceTransaction.deleteTransaction(this.currentId)
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

    return this.serviceTransaction.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "name":null,
          
        
          
            "relatedStudentRollNo":null,
          
        
          
          
        
      };



      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
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
      
        
          "name":null,
        
      
        
          "relatedStudentRollNo":null,
        
      
        
        
      
      });
  }

}
