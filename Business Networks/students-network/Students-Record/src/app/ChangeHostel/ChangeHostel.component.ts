import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChangeHostelService } from './ChangeHostel.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Viewer',
	templateUrl: './ChangeHostel.component.html',
	styleUrls: ['./ChangeHostel.component.css'],
  providers: [ChangeHostelService]
})
export class ChangeHostelComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private transaction;
  private currentId;
	private errorMessage;

  
          roomNo = new FormControl("", Validators.required);
      
          hostel = new FormControl("", Validators.required);
        

  
      
          relatedStudentRollNo = new FormControl("", Validators.required);

         constructor(private serviceTransaction: ChangeHostelService, fb: FormBuilder) {
             this.myForm = fb.group({
        
    
        
          roomNo:this.roomNo,
        
    
        
          hostel:this.hostel,
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
      $class: "com.ac.iitm.ChangeHostel",
      
        
        

          "roomNo":this.roomNo.value,
        
      
        
          "hostel":this.hostel.value,
      
        
          "relatedStudentRollNo":this.relatedStudentRollNo.value,


          "transactionId":"",


          "timestamp": new Date().toISOString()
        
        
      
    };

    this.myForm.setValue({
      
        
         

          "roomNo":null,
        
      
        
          "hostel":null,
        
      
        
          "relatedStudentRollNo":null,
        
        
      
    });

    return this.serviceTransaction.addTransaction(this.transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
          "roomNo":null,
        
      
        
          "hostel":null,
        
      
        
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
      $class: "com.ac.iitm.ChangeHostel",
      
        
          
            "roomNo":this.roomNo.value,
          
        
    
        
          
            "hostel":this.hostel.value,

            "relatedStudentRollNo":this.relatedStudentRollNo.value
          
          
        
    
    };

    return this.serviceTransaction.updateTransaction(form.get("roomNo").value,this.transaction)
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
        
          
            "roomNo":null,
          
        
          
            "hostel":null,
        
          
            "relatedStudentRollNo":null,
          
        
          
        
      };
      
        if(result.roomNo){
          
            formObject.roomNo = result.roomNo;
          
        }else{
          formObject.roomNo = null;
        }
      
        if(result.hostel){
          
            formObject.hostel = result.hostel;
          
        }else{
          formObject.hostel = null;
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
      
        
          "roomNo":null,
        
      
        
          "hostel":null,
        
      
        
          "relatedStudentRollNo":null, 
        
      
      });
  }

}
