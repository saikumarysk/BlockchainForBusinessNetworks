'use strict';

/**
 * Transaction for a land transaction involving a buyer and a seller.
 * @param {com.ac.iitm.LandTransaction} landTransaction
 * @transaction
 */
function onLandTransaction(landTransaction)
{
    var landRegistry;
    var id = landTransaction.idOfLand;
    return getAssetRegistry('com.ac.iitm.Land').then(function(ar)
    {
        landRegistry = ar;
        return landRegistry.get(id);
    }).then(function(land) 
    {
        land.ownerId = landTransaction.newOwnerId;
        landRegistry.update(land);
    });
}