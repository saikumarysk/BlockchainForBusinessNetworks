import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LandOwnerService } from './LandOwner.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Land',
	templateUrl: './LandOwner.component.html',
	styleUrls: ['./LandOwner.component.css'],
  providers: [LandOwnerService]
})
export class LandOwnerComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;
        
  
      
          ownerId = new FormControl("", Validators.required);
          name = new FormControl("", Validators.required);
        
  


  constructor(private serviceLand:LandOwnerService, fb: FormBuilder) {
    this.myForm = fb.group({
        
    
        
          ownerId:this.ownerId,
          name: this.name
        
    
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
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
    this.participant = {
      $class: "com.ac.iitm.LandOwner",
        
      
        
          "ownerId":this.ownerId.value,
          "name": this.name.value
        
      
    };

    this.myForm.setValue({
      
        
          
          "ownerId":null,
          "name":null
        
      
    });

    return this.serviceLand.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
        
          "ownerId":null,
          "name":null
        
      
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
    this.participant = {
      $class: "com.ac.iitm.LandOwner",
          
        
    
        
          
            "ownerId":this.ownerId.value,
            "name": this.name.value
          
        
    
    };

    return this.serviceLand.updateParticipant(form.get("ownerId").value,this.participant)
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

    return this.serviceLand.deleteParticipant(this.currentId)
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

    return this.serviceLand.getParticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
           
        
          
            "ownerId":null,
            "name":null
          
        
      };



      
        /*if(result.landId){
          
            formObject.landId = result.landId;
          
        }else{
          formObject.landId = null;
        }
      
        if(result.country){
          
            formObject.country = result.country;
          
        }else{
          formObject.country = null;
        }*/
      
        if(result.ownerId){
          
            formObject.ownerId = result.ownerId;
          
        }else{
          formObject.ownerId = null;
        }
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
      
        
          
          "ownerId":null,
          "name":null
        
      
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
        var newParticipant = 
        {
          $class: "com.ac.iitm.LandOwner",
          "ownerId":cells[0],
          "name": cells[1]
        }
        newService.addParticipant(newParticipant).toPromise();
        objArray.push(newParticipant);
      }
    }
  }

}
