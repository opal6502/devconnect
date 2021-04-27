import React, { Component } from 'react';
import Moment from 'react-moment';

import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className='list-group-item'>
        <h4>{exp.company}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
          {exp.current ? (
            ' Present'
          ) : (
            <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: {exp.title}</strong>
        </p>
        {isEmpty(exp.location) ? (
          ''
        ) : (
          <p>
            <strong>Location: {exp.location}</strong>
          </p>
        )}
        {isEmpty(exp.description) ? (
          ''
        ) : (
          <p>
            <strong>Description: {exp.description}</strong>
          </p>
        )}
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className='list-group-item'>
        <h4>{edu.school}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
          {edu.current ? (
            ' Present'
          ) : (
            <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: {edu.degree}</strong>
        </p>
        <p>
          <strong>Major: {edu.major}</strong>
        </p>
        {isEmpty(edu.location) ? (
          ''
        ) : (
          <p>
            <strong>Location: {edu.location}</strong>
          </p>
        )}
        {isEmpty(edu.description) ? (
          ''
        ) : (
          <p>
            <strong>Description: {edu.description}</strong>
          </p>
        )}
      </li>
    ));

    return (
      <div className='row'>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Experience</h3>
          {expItems.length > 0 ? (
            <ul className='list-group'>{expItems}</ul>
          ) : (
            <p className='text-center'>No experience listed</p>
          )}
        </div>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Education</h3>
          {expItems.length > 0 ? (
            <ul className='list-group'>{eduItems}</ul>
          ) : (
            <p className='text-center'>No education listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
