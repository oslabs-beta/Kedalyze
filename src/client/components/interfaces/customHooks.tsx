import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// useForm functional component
export const useForm = (callback: any, initialState = {}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // handleSubmit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/dashboard');
    await callback();
  };

  // return values
  return {
    onChange,
    handleSubmit,
    values,
  };
};
