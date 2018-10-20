import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';


const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  info,
  type,
  onChange,
  disabled,
  error
}) =>  {
  return (
    <div className="form-group">
      <input
        type={type}
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

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;