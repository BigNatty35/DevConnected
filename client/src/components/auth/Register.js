import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios
    .post('/api/users/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data}));
  // axios.get('/api/users/test').then(res => console.log(res.data)).catch(err => err.response.data);
  }
  render() {
    const { errors } = this.state;
    return <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                  className={classnames("form-control form-control-lg", { // first arguments are default classes. second class gets applied if condition is true
                    'is-invalid': errors.name
                  })} 
                    placeholder="Name" 
                    value={this.state.name} 
                    onChange={this.onChange}
                    name="name"
                  />
                    {errors.name && (
                      <div className="invalid-feedback">
                     {errors.name}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                  className={classnames("form-control form-control-lg", { // first arguments are default classes. second class gets applied if condition is true
                    'is-invalid': errors.email
                  })}
                    placeholder="Email Address" 
                    onChange={this.onChange}
                    value={this.state.email} 
                    name="email"
                   />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image,
                    use a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                <input 
                  type="password" 
                  className={classnames("form-control form-control-lg", { // first arguments are default classes. second class gets applied if condition is true
                    'is-invalid': errors.password
                  })}
                  placeholder="Password" 
                  onChange={this.onChange}
                  value={this.state.password} 
                  name="password"
                />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                <input 
                  type="password" 
                  className={classnames("form-control form-control-lg", { // first arguments are default classes. second class gets applied if condition is true
                    'is-invalid': errors.password2
                  })} 
                  placeholder="Confirm Password" 
                  onChange={this.onChange} 
                  value={this.state.password2} 
                  name="password2"
                />
                  {errors.password2 && (
                    <div className="invalid-feedback">
                      {errors.password2}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Register;
