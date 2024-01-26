import * as React from 'react';
import * as reactRouterDom from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import { usePost } from '../apiService';

interface MyFormValues {
  email: string;
  password: string;
  checkbox: boolean;
}

const Signup: React.FC = () => {
  let navigate = reactRouterDom.useNavigate();
  const initialValues: MyFormValues = { email: '', password: '', checkbox: false };
  const [errors,setErrors ]= React.useState('');

  const validate = (values: MyFormValues) => {
    const errors: Partial<MyFormValues> = {};

    // Add your validation logic here
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };
  const { execute: login } =  usePost<any>({
    url: `Account/login`,
    onComplete: () => {
      navigate('/movie');
    },
    onError: function (): void {
      setErrors('Invalid login details');
    }
  });
  return (
    <section className="wrapper">
      <div className="form_wrapper">
        <h1>Sign in</h1>
        <h1 className='error'>{errors}</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            const { checkbox, ...rest } = values;
            login(rest);
            //alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
          //validate={validate}
        >
          <Form>
            <Field id="firstName" type="email" name="email" placeholder="email" />
            <Field id="password" type="password" name="password" placeholder="Password" />
            <label className='label_checkbox'>
              <Field id="checkbox" type="checkbox" name="checkbox" />
              <p>Remember Me</p>
            </label>
            <button className='button' type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Signup;
