import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LandService } from './Land.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Land',
	templateUrl: './Land.component.html',
	styleUrls: ['./Land.component.css'],
  providers: [LandService]
})
export class LandComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          landId = new FormControl("", Validators.required);
        
  
      
          country = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  


  constructor(private serviceLand:LandService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          landId:this.landId,
        
    
        
          country:this.country,
        
    
        
          ownerId:this.ownerId
        
    
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
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.ac.iitm.Land",
      
        
          "landId":this.landId.value,
        
      
        
          "country":this.country.value,
        
      
        
          "ownerId":this.ownerId.value
        
      
    };

    this.myForm.setValue({
      
        
          "landId":null,
        
      
        
          "country":null,
        
      
        
          "ownerId":null
        
      
    });

    return this.serviceLand.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "landId":null,
        
      
        
          "country":null,
        
      
        
          "ownerId":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.ac.iitm.Land",
      
        
          
        
    
        
          
            "country":this.country.value,
          
        
    
        
          
            "ownerId":this.ownerId.value
          
        
    
    };

    return this.serviceLand.updateAsset(form.get("landId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceLand.deleteAsset(this.currentId)
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

    return this.serviceLand.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "landId":null,
          
        
          
            "country":null,
          
        
          
            "ownerId":null 
          
        
      };



      
        if(result.landId){
          
            formObject.landId = result.landId;
          
        }else{
          formObject.landId = null;
        }
      
        if(result.country){
          
            formObject.country = result.country;
          
        }else{
          formObject.country = null;
        }
      
        if(result.ownerId){
          
            formObject.ownerId = result.ownerId;
          
        }else{
          formObject.ownerId = null;
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
      
        
          "landId":null,
        
      
        
          "country":null,
        
      
        
          "ownerId":null 
        
      
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
        var newAsset = 
        {
          $class: "com.ac.iitm.Land",
          "landId":cells[0],
          "country": cells[1],
          "ownerId":cells[2]
        }
        newService.addAsset(newAsset).toPromise();
        objArray.push(newAsset);
      }
    }
  }

}