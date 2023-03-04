import React from 'react';
import Notes from './Notes';

const Userhome = (props) => {
  const {showAlert} = props;

  return (
    <>
      <div className="container">
        <Notes showAlert={showAlert}  />
      </div>
    </>
  )
}

export default Userhome