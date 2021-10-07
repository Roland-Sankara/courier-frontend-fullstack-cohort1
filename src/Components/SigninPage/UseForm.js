import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      console.log('Working..',errors,isSubmitting)
      if (Object.keys(errors).length === 0 && isSubmitting) {
        let apiUrl = 'https://courier-backend-fullstack1.herokuapp.com/api/v1/users/login';

        let data = {
          username:values.username,
          password:values.password
        }

        fetch(apiUrl,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        .then((res)=>{
          if(!res.ok){
            throw new Error('Failed to Login - Password or Username incorrect')
          }
          return res.json();
        })
        .then((data)=>{
          console.log(data)
          // Add the token received to local-storage
          localStorage.setItem('token',data.token)
          // Add the User Id received to localstorage
          localStorage.setItem('userID',data.user);
          // redirects to orders page
          callback();
        })
        .catch((err)=>{
          console.log(err)
        })
        
      }
    },
    // [errors]
  );

  return { handleChange, handleSubmit, values, errors, isSubmitting };
};

export default useForm;