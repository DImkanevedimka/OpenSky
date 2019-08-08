import React, { Component } from "react";
import "./index.css";
import { isEmpty } from 'lodash'
import { Input } from '../../blocks/Input'
 
class Login extends Component {
  state = {
    values: {
      login: "",
      password: ""
    },
    errors: {},
    touched: {}
  };

  validate = (value, name) => {
    const { values, errors: oldErrors } = this.state;
    const errors = { ...oldErrors };
    switch (name) {
      case "login":
        if (value.trim().length === 0) {
          errors[name] = `Required`;
          return {
            values: { ...values, [name]: value },
            errors
          };
        } else {
          delete errors[name];
          return {
            values: { ...values, [name]: value },
            errors
          };
        }
      case "password":
        if (value.trim().length === 0) {
          errors[name] = `Required`;
          return {
            values: { ...values, [name]: value },
            errors
          };
        } else {
          delete errors[name];
          return {
            values: { ...values, [name]: value },
            errors
          };
        }
      default:
        break;
    }
  };

  onChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.validate(value, name) });
  };

  onBlur = e => {
    const { touched } = this.state;
    this.setState({ touched: { ...touched, [e.target.name]: true } });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { values } = this.state;
    const { navigation, onLogin } = this.props;
    let touched = {};
    let errors = {};
    for (let key in values) {
      const validationResult = this.validate(values[key], key);
      touched[key] = true;
      errors = { ...errors, ...validationResult.errors };
    }
    if (isEmpty(errors)) {
      if (values.login === 'demo' && values.password === 'demo') {
        localStorage.setItem('logedIn', true)
        onLogin()
      } else {
        alert('Incorect login or password')
      }
    } else {
      this.setState({
        touched,
        errors
      });
    }
  };

  render() {
    const { values, errors, touched } = this.state;
    return (
      <div className="container form-container">
        <form className="login-form" onSubmit={this.onSubmit}>
          <Input 
            label='Login'
            name='login'
            error={touched.login && errors.login}
            value={values.login}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          <Input
            type="password"
            label='Password'
            name='password'
            error={touched.password && errors.password}
            value={values.password}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          {/* <div className="input-container">
            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="login-form__input"
              value={values.password}
              onBlur={this.onBlur}
              onChange={this.onChange}
            />
            <span className="login-form__error" />
          </div> */}
          <button type="submit" className="login-form__submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
