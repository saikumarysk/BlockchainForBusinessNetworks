'use strict';

/**
 * Transaction for changing name of student
 * @param {com.ac.iitm.ChangeName} changeName
 * @transaction
 */
function onChangeName(changeName)
{
    var assetRegistry;
    var id = changeName.relatedStudentRollNo;
    return getAssetRegistry('com.ac.iitm.Student').then(function(ar)
    {
        assetRegistry = ar;
        return assetRegistry.get(id);
    }).then(function(asset)
    {
        asset.name = changeName.name;
        return assetRegistry.update(asset);
    });
}

/**
 * Transaction for changing gender of student
 * @param {com.ac.iitm.ChangeGender} changeGender
 * @transaction
 */
function onChangeGender(changeGender)
{
    var assetRegistry;
    var id = changeGender.relatedStudentRollNo;
    return getAssetRegistry('com.ac.iitm.Student').then(function(ar)
    {
        assetRegistry = ar;
        return assetRegistry.get(id);
    }).then(function(asset)
    {
        asset.gender = changeGender.gender;
        return assetRegistry.update(asset);
    });
}

/**
 * Transaction for changing hostel of student
 * @param {com.ac.iitm.ChangeHostel} changeHostel
 * @transaction
 */
function onChangeHostel(changeHostel)
{
    var assetRegistry;
    var id = changeHostel.relatedStudentRollNo;
    return getAssetRegistry('com.ac.iitm.Student').then(function(ar)
    {
        assetRegistry = ar;
        return assetRegistry.get(id);
    }).then(function(asset)
    {
        asset.hostel = changeHostel.hostel;
        asset.roomNo = changeHostel.roomNo;
        return assetRegistry.update(asset);
    });
}