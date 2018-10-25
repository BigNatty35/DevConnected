import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

  onClickDelete(e, id) {
    this.props.deleteEducation();
  }

  render() {
    const education = this.props.education.map(edu => 
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degreee}</td>
      <td>
        <Moment format="YYYY/MM/DD">
          {edu.from}
        </Moment> - {edu.to === null ? " Now" : <Moment format="YYYY/MM/DD">
          {edu.to}
        </Moment>}
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment>
      </td>
      <td>
        <button className="btn btn-danger" onClick={this.onClickDelete.bind(this, edu._id)}>Delete</button>
      </td>
    </tr>);
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>school</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
            <body>
              {education}
            </body>
          </thead>
        </table>
      </div>
    );
  }
}


Education.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation})(Education);