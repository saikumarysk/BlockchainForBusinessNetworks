import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LandTransactionService } from './LandTransaction.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Land',
	templateUrl: './LandTransaction.component.html',
	styleUrls: ['./LandTransaction.component.css'],
  providers: [LandTransactionService]
})
export class LandTransactionComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private transaction;
  private currentId;
	private errorMessage;

  
      
          idOfLand = new FormControl("", Validators.required);
        
  
      
          newOwnerId = new FormControl("", Validators.required);
        
  


  constructor(private serviceLand:LandTransactionService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          idOfLand:this.idOfLand,
        
    
        
          newOwnerId:this.newOwnerId
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLand.getAll()
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
      $class: "com.ac.iitm.LandTransaction",
      
        
          "idOfLand":this.idOfLand.value,
        
      
        
          "newOwnerId":this.newOwnerId.value,

          "transactionId":"",

          "timestamp": new Date().toISOString()
        
      
    };

    this.myForm.setValue({
      
        
          "idOfLand":null,
        
      
        
          "newOwnerId":null
        
      
    });

    return this.serviceLand.addTransaction(this.transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "idOfLand":null,
        
      
        
          "newOwnerId":null 
        
      
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLand.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "idOfLand":null,
          
        
          
            "newOwnerId":null 
          
        
      };



      
        if(result.idOfLand){
          
            formObject.idOfLand = result.idOfLand;
          
        }else{
          formObject.idOfLand = null;
        }
      
        
      
        if(result.newOwnerId){
          
            formObject.newOwnerId = result.newOwnerId;
          
        }else{
          formObject.newOwnerId = null;
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
      
        
          "idOfLand":null,
        
      
        
          "newOwnerId":null 
        
      
      });
  }

  csvFormAdd(): void
  {
    var fileToLoad = (<HTMLInputElement>document.getElementById("csvFile")).files[0];
    var newService = this.serviceLand;
    var objArray = [];
    var fR = new FileReader();
    fR.readAsText(fileToLoad);
    fR.onload = function(e:any)
    {
      var rows = e.target.result.split("\n"); 
      for(var i=0;i<rows.length;i++)
      {
        var cells = rows[i].split(",");
        var newTransaction = 
        {
          $class: "com.ac.iitm.LandTransaction",
          "idOfLand":cells[0],
          "newOwnerId":cells[1],
          "transactionId":"",
          "timestamp":new Date().toISOString()
        }
        newService.addTransaction(newTransaction).toPromise();
        objArray.push(newTransaction);
      }
    }
  }

}
