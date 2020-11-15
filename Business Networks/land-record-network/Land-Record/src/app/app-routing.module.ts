import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { LandComponent } from './Land/Land.component';
import { LandOwnerComponent } from './LandOwner/LandOwner.component';
import { LandTransactionComponent } from './LandTransaction/LandTransaction.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Land', component: LandComponent},
		{ path: 'LandOwner', component: LandOwnerComponent},
		{ path: 'LandTransaction', component: LandTransactionComponent},		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
