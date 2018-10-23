import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AddExperience extends Component {
  render() {
    return <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or
                current
              </p>
              <small className="d-block pb-3">* = required fields</small>
            </div>
          </div>
        </div>
      </div>;
  }
}


AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps)(AddExperience);