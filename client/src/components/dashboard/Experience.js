import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions';

class Experience extends Component {

  onClickDelete(e, id) {
    this.props.deleteExperience();
  }
  
  render() {
    const experience = this.props.experience.map(exp => <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">
            {exp.from}
          </Moment> - {exp.to === null ? " Now" : <Moment format="YYYY/MM/DD">
              {exp.to}
            </Moment>}
        </td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.onClickDelete.bind(this, exp._id)}>Delete</button>
        </td>
      </tr>);
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
            <body>
              {experience}
            </body>
          </thead>
        </table>
      </div>
    );
  }
}


Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience);