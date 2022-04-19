
import './App.css';
import {Formik} from "formik";
import RegistrationForm from './components/RegistrationForm';
import * as Yup from "yup";


function App() {

  

const ErrorSchema = Yup.object().shape({

  
  username:Yup.string().required("Name is required").min(5,"Too Short").max(20,"Too Long"),
  email:Yup.string().email('Must be a valid email').required('Email is required'),

  phone:Yup.string().matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, 'Phone number is not valid').required("Required"),
  message: Yup.string()
  .min(5, "Too Short!")
  .max(100, "Too Long!")
  .required("Required")
  
})

  return (
    
    <div className='container pt-5'>
      <div className="row justify-content-sm-center pt-5">
        <div className='col-sm-6 shadow round pb-3'>
          <h1 className='text-center pt-3 text-secondary'>Registration Form</h1>
       <Formik onSubmit={(values) =>
        {console.log(values);
        }} initialValues={{
          username:"",
          email:"",
          phone:"",
          message:""
          
          }} 
        // Validation is added using attribute ValidationSchema and value of the attribute is ErrorSchema
        validationSchema ={ErrorSchema}
        component={RegistrationForm}/>
      
    
       </div>
    </div>
    </div>
  );
}

export default App;
