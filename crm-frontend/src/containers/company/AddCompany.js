import React from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {AddNewCompany} from "../../actions/CompanyActions";

export function addCompany(e){
    console.log('hlkhlh lkh')
    e.preventDefault();
    AddNewCompany({
        name: 'Test',
        country: 'Tunisia',
        adress: 'kljslkj kljsdlkj lkj',
        zipcode: 2000
    });
};
const AddCompany = () => {
    const dispatch = useDispatch();
    React.useEffect(()=>{
        AddNewCompany()
    },[])

    return (
        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="name">Company Name</label>
                <InputText id="name"
                           type="text"/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="country">Country</label>
                <InputText id="country" type="text"/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="address">Address</label>
                <InputTextarea id="address" type="text" rows="4"/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="zip">Zip</label>
                <InputText id="zip" type="text"/>
            </div>
            <div className="p-field p-col-12 p-md-12">
                <Button label="Save" onClick={addCompany.bind(this)}/>
            </div>
        </div>
    )
}
export default AddCompany;