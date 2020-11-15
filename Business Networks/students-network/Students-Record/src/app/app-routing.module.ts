import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './Student/Student.component';
import { ViewerComponent } from './Viewer/Viewer.component';
import { StaffComponent } from './Staff/Staff.component';
import { ChangeNameComponent } from './ChangeName/ChangeName.component';
import { ChangeGenderComponent } from './ChangeGender/ChangeGender.component';
import { ChangeHostelComponent } from './ChangeHostel/ChangeHostel.component';

const routes: Routes =
[
	{path: '', component: HomeComponent},
	{ path: 'Student', component: StudentComponent},
	{ path: 'Viewer', component: ViewerComponent},
	{ path: 'Staff', component: StaffComponent},
	{ path: 'ChangeName', component: ChangeNameComponent},
	{ path: 'ChangeGender', component: ChangeGenderComponent},
	{ path: 'ChangeHostel', component: ChangeHostelComponent},
	{path: '**', redirectTo:''}

];

@NgModule
({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})

export class AppRoutingModule { }