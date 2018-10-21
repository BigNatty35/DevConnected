import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';


class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }
 
  render() {
    const {user} = this.props.auth;
    const {loading, profile} = this.props.profile;

    let dashboadContent;

    if(profile === null || loading) {
      dashboadContent = <Spinner/>;
    } else {
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboadContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        //User is logged in but has no profile
        dashboadContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name} </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-mid-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboadContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});


export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);