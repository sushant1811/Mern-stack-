const validator=require('validator');

const validate=(data)=>{
    const mandatoryField=["firstName","password","emailId"];

    const IsAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!IsAllowed)
    {
        throw new Error("Field missing");
    }
    if(!validator.isEmail(data.emailId))
    {
        throw new Error("Invalid Email");
    }
    if(!validator.isStrongPassword(data.password))
    {
        throw new Error("Weak Password");
    }
}

module.exports=validate;