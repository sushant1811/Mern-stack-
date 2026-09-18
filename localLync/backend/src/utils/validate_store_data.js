

const validate_store_data=(data)=>{
    const mandatoryField=["store_name","location"];

    const IsAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k));
    if(!IsAllowed)
    {
        throw new Error("Some Filds are missing");
    }
}

module.exports=validate_store_data;