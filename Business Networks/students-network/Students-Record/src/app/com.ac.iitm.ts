import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';

export class Student extends Asset
{
	rollNo: string;
	name: string;
	roomNo: number;
	hostel: string;
	gender: string;
}
export class Viewer extends Participant
{
	rollNo: string;
}
export class Staff extends Participant
{
	staffId: string;
}
export class ChangeRollNo extends Transaction
{
	rollNo: string;
	relatedStudent: Student;
}
export class ChangeName extends Transaction
{
	name: string;
	relatedStudent: Student;
}
export class ChangeHostel extends Transaction
{
	hostel: string;
	roomNo: number;
	relatedStudent: Student;
}
export class ChangeGender extends Transaction
{
	gender: string;
	relatedStudent: Student;
}