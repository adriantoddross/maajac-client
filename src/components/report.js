import React, { Component } from 'react';
import Input from './input';
// import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

class reportForm extends Component {
  render() {
    // const { handleSubmit } = this.props;

    return(
      <div>
        <Field
          component={Input}
          id="incident-type"
          label="Incident Type"
          name="type"
        />
        <form id="incident-report">
          <label
            htmlFor="incident-type">Incident Type
          </label>
          <select
            id="incident-type"
            name="type"
            required="required">
            <option value=""></option>
            <option value="crime">Crime</option>
            <option value="accident">Traffic Accident</option>
            <option value="other">Other</option>
          </select>
          <label
            htmlFor="incident-date">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="incident-date"/>
          <label
            htmlFor="incident-time">
            Time
          </label>
          <input
            type="time"
            name="time"
            id="incident-time"/>
          <label htmlFor="incident-desc">Description of Incident</label>
          <textarea
            name="description"
            id="incident-desc"
            cols="30"
            rows="10">
          </textarea>
          <label htmlFor="incident-susp">Description of Suspect</label>
          <textarea
            name="suspect"
            id="incident-desc"
            cols="30"
            rows="10">
          </textarea>
          <button
            type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

reportForm = reduxForm({
  form: "report"
})(reportForm);

export default reportForm;