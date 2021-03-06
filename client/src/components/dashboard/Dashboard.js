import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteProfile} from '../../actions/profileActions';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';


class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onClickDelete(e) {
    e.preventDefault();
    
    this.props.deleteProfile();
  }
 
  render() {
    const {user} = this.props.auth;
    const {loading, profile} = this.props.profile;

    let dashboadContent;
    //If loading is TRUE or there isn't a profile yet, show spinner
    if(profile === null || loading) {
      dashboadContent = <Spinner/>;
    } else {
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0) {
        dashboadContent = 
          <div>
          <p className="lead text-muted">Welcome<Link to={`/profile/${profile.handle}`}> {user.name}</Link> </p>
            <ProfileActions />;
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{marginBottom: '60px'}}/>
            <button className="btn btn-danger" onClick={this.onClickDelete.bind(this)}>Delete My Account</button>
          </div>;
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
  getCurrentProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});


export default connect(mapStateToProps, {getCurrentProfile, deleteProfile})(Dashboard);