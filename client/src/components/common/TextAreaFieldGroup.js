import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  info,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", { // first arguments are default classes. second class gets applied if condition is true
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback"> {error} </div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};



export default TextAreaFieldGroup;