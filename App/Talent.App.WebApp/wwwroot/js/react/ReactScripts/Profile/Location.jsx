import React from 'react'
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { default as Nationalities } from '../../../../util/jsonFiles/nationalities.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, Input, Select, Label } from 'semantic-ui-react';
import { countryOptions } from '../Employer/common.js';
//import { countries } from '../../../../ util / jsonFiles / countries.json';



export class Address extends React.Component {
    constructor(props) {
        super(props);

      
        this.state = {
            mode: 'view',
            address: {
                number: "",
                street: "",
                suburb: "",
                postCode: "",
                city: "",
                country: ""
            },
            //newContact: addressDetails

        }






        this.handleChange = this.handleChange.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
        //this.numberChange = this.numberChange.bind(this);
    }

    componentDidMount() {

    }
    //saveContact() {
    //    const data = Object.assign({}, this.state.data)
    //    this.props.controlfunc(this.props.componentId, data)
    //    this.closeEdit()
    //}

    openEdit() {

        const data = Object.assign({}, this.props.addressData)


        this.setState({
            mode: 'edit',
            address: data
        })
    }
    closeEdit() {
        this.setState({
            mode: 'view'
        })
    }
    saveContact() {

        const data = Object.assign({}, this.state.address)
        this.props.updateProfileData({ address: data });
        this.props.saveProfileData({ address: data })
        this.closeEdit()
    }
    //numberChange(event) {
    //    const data = Object.assign({}, this.state.newContact)
    //    data[event.target.name] = event.target.value
    //    this.setState({
    //        newContact: data
    //    })
    //}


    handleChange(event) {
        var data = Object.assign({}, this.state.address)
        data[event.target.name] = event.target.value;
        this.setState({
            address: data
        })



       // this.props.updateProfileData({ address: data });
      //  this.props.saveProfileData({ address: data });

        //update props here
        //this.props.handleChange(updateData);
    }

    

    
    render() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.address.country;
        const selectedCity = this.state.address.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br /></span>
        
        }
        if (this.state.mode === 'view') {
            let number = this.props.addressData ? this.props.addressData.number : ""
            let street = this.props.addressData ? this.props.addressData.street : ""
            let suburb = this.props.addressData ? this.props.addressData.suburb : ""
            let postcode = this.props.addressData ? this.props.addressData.postCode : ""
            let city = this.props.addressData ? this.props.addressData.city : ""
            let country = this.props.addressData ? this.props.addressData.country : ""


            return (
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <React.Fragment>
                            <p>Address:{number},{street},{suburb},{postcode}</p>
                            <p>City: {city}</p>
                            <p>Country: {country}</p>
                        </React.Fragment>
                        <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ui sixteen wide column">

                  
                     <Form>
                        <Form.Group>

                            <Form.Input label='Number' name="number" placeholder='Number' width={5} onChange={this.handleChange}  value={this.state.address.number} />

                            <Form.Input label='Street' name="street" placeholder='Street' width={8} onChange={this.handleChange} value={this.state.address.street} />

                            <Form.Input label='Suburb' name="suburb" placeholder='Suburb' width={5} onChange={this.handleChange} value={this.state.address.suburb} />

                           
                             
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <div className="field">
                                <label>Country</label>
                            <select className="ui right labeled dropdown"
                              
                                placeholder=""
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country" width={4}>

                        <option value="">Select a country</option>
                        {countriesOptions}
                                </select>
                            </div>

                            <div className="field"> <label> City</label>
                            <select
                                className="ui right labeled dropdown"
                                placeholder="City"
                                value={selectedCity}
                                onChange={this.handleChange}
                                name="city" width={8}>
                                <option value="0"> Select a town or city</option>
                                {popCities}
                                </select>
                            </div>
                            

                            <Form.Input label='PostCode' name="postCode" placeholder="Postcode" widths={4} onChange={this.handleChange} value={this.state.address.postcode} />

                            
                        </Form.Group>
                    </Form>

                     <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                           
                  
                </div>
                   
              

            )
        }
    }
}





                 



export class Nationality extends React.Component {
    constructor(props) {
        super(props);

      
        this.state = {
           
            nationalityData: {
                nationality: {}
            }
        
           
         
            
       
        }
    
       
     
        this.handleChange = this.handleChange.bind(this);
        
    }

   

handleChange(event) {
    var data = Object.assign({}, this.state.nationalityData);
    data[event.target.name] = event.target.value
    console.log(data )
    this.setState({
        nationalityData: data
    }, this.saveProfileData)
}
    componentWillReceiveProps(nextProps) {
        //this is called to before render method
        console.log(nextProps.nationalityData + "nationality")
        this.setState({
            nationalityData: {
                nationality: nextProps.nationalityData
            }
        })
    }
    saveProfileData() {
        console.log("dhii")
        console.log(this.state.nationalityData)
        const data = Object.assign({}, this.state.nationalityData)
        this.props.saveProfileData(data)
}
    render() {
        let countriesOptions = [];

        const selectedCountry = this.state.nationalityData.nationality;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
       

        return (
            <div className="ui six wide column">
               
               
            <select 
                   
                value={selectedCountry}
                onChange={this.handleChange}
                    name="nationality" >
                  
                <option value="0">Select Your Nationality</option>
                {countriesOptions}
                </select>
             
                   
            </div> 
            )
    }

    
}