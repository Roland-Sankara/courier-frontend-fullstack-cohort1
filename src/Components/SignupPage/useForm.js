import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // check if the api call has returned response
  const [isLoading,setIsLoading] = useState(false);
  // catch errors from the api
  const [resError,setResError] = useState(null);


  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    setResError(null);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    setIsLoading(true);
  };

  useEffect(
    () => {
        if(Object.keys(errors).length === 0 && isSubmitting){
          let URL = 'https://courier-backend-fullstack1.herokuapp.com/api/v1/users/signup';

          let data = {
            username:values.username,
            email:values.email,
            password:values.password
          }

          fetch(URL,{
              method:'POST',
              headers:{
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
          })

          .then((res)=>{
            console.log(res)
            if(!res.ok){
              throw new Error('Wrong Email or Password . . .');
            }
            return res.json();
          })
          .then((data)=>{
              console.log(data);
              // Add the token received to local-storage
              localStorage.setItem('token',data.token)
              // Add the User Id received to localstorage
              localStorage.setItem('userID',data.savedUser._id);
              // redirects to orders page
              callback();
          })
          .catch((err)=>{
              console.log(err);
              setResError(err.message);
              setIsLoading(false);
              setIsSubmitting(false);
          })
        }
    },
    // [userData]
  );

  return { handleChange, handleSubmit, values, errors, isLoading, resError };
};

export default useForm;
