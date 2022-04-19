import React from 'react'
import {Form,Field} from "formik";
import axios from "axios";
import {useEffect,useState} from "react";
function RegistrationForm({errors,touched}) {
// console.log(errors);

// const formik = useFormik({
//   initialValues:{
//     country:"",
//     state:"",
//     city:"",
//   }
// })

  const [data,setData]=useState([]);
  const [state,setState]=useState([]);
  const [city,setCity]=useState([]);

  useEffect(()=>{
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
    .then(res=> setData(res.data))
    .catch(err=>console.log(err))
  },[])

  //removing duplicate country names
let country = [...new Set(data.map(item=> item.country))];
country.sort();

const handleCountryChange=(e)=>{
  setState("Select State");
  setCity("Select City");

  //As you select country from select box, in below line we filter that country from all data so that we can get subcountry(state), name(city) out of it.
  let Singlecountry = data.filter(item=> item.country === e.target.value);

  //now this singleCountry which is getting the name of subcountry(state) multiple times. So to remove duplicates set is used.
  let states = [...new Set(Singlecountry.map(item=> item.subcountry))];

  //after removing the duplicate subcountry names(state names). we have saved the data in state state using setState.
  setState(states);
  console.log(`Selected Country -> ${e.target.value}`)
}

const handleStateChange=(e)=>{
  //here when user selects particular subcountry(state name), we have checked again with original data to get all subcounty that match that name. to get the data of particular city.
  let singleCity = data.filter(item=> item.subcountry === e.target.value);
  setCity(singleCity);
 console.log(`Selected State -> ${e.target.value}`)
}

const handleCityChange=(e)=>{
  console.log(`Selected City -> ${e.target.value}`)
}

// var x= document.getElementById("state").value;
// var y= document.getElementById("city").value;
// var z=document.getElementById("country").value;
// console.log(x,y,z)
  
  return (
    <Form>
        <div className='form-group'>
        <label className='col-form-label'>
            Name
        </label>
        <Field name="username" className={touched.username ? `form-control ${errors.username ? "invalid" : "valid" }` : `form-control`}   placeholder="Enter the name"/>
        {touched.username && errors.username && <small className='text-danger'>{errors.username}</small>}
        </div>

        <div className='form-group'>
        <label className='col-form-label'>
            Email
        </label>
        <Field name="email" className={touched.email ? `form-control ${errors.email ? "invalid" : "valid" }` : `form-control`}   placeholder="Enter the email"/>
        {touched.email && errors.email &&  <small className='text-danger'>{errors.email}</small>}
        </div>

        <div className='form-group'>
        <label className='col-form-label'>
            Phone
        </label>
        <Field name="phone" className={touched.phone ? `form-control ${errors.phone ? "invalid" : "valid" }` : `form-control`}   placeholder="Enter the phone"/>
        {touched.phone && errors.phone &&  <small className='text-danger'>{errors.phone}</small>}
        </div>


          {/*Country Selection */}
          <div className='form-group'>
    <label htmlFor="country" className='col-form-label'>Country: </label>
    
        <select id="country"  name="country" className= "form-select" onChange={(e)=>handleCountryChange(e)}>
        
    <option>Select Country</option>
      {country?.map((item,index)=> (
        <option key={index} value={item}>{item}</option>
        
        ))}
    </select>

    
    </div>

    {/*State Selection */}
    <div className='form-group'>
    <label htmlFor='state' className='col-form-label'>State: </label>
    
        <select id="state"  name="state"  className="form-select"  onChange={(e)=>handleStateChange(e)} >
        
    <option>Select State</option>
      {state !=='Select State' &&  state?.map((item,index)=>
       <option key={index} value={item}>{item}</option>
      )}
    </select>
    
    </div>

    {/*City Selection */}
    <div className='form-group'>
    <label htmlFor="city" className='col-form-label'>City: </label>
    
    <select id="city"  name="city" className= "form-select" onChange={(e)=>handleCityChange(e)}>
    
      <option>Select City</option>
      {city !=='Select City' && city?.map((item,index)=>
       <option key={index} value={item?.name}>{item?.name}</option>
      )}
    </select>
    
    </div>

    <div className='form-group'>
        <label className='col-form-label'>
            Message
        </label>
        <Field as='textarea' name="message" className={touched.message ? `form-control ${errors.message ? "invalid" : "valid" }` : `form-control`}   placeholder="Enter the message"/>
        {touched.message && errors.message &&  <small className='text-danger'>{errors.message}</small>}
        </div>
        <button type="Submit" className='btn btn-primary my-3'>Submit</button>
    </Form>
  )
}

export default RegistrationForm