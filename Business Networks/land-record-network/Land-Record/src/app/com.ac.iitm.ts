import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.ac.iitm{
   export class LandOwner extends Participant {
      ownerId: string;
      name: string;
   }
   export class Land extends Asset {
      landId: string;
      country: string;
      ownerId: string;
   }
   export class LandTransaction extends Transaction {
      idOfLand: string;
      newOwnerId: string;
   }
// }
