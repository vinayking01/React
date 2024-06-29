import React from 'react';

export function AlertComponent(props) {
  const { msg, type } = props.alertdata;

  return (
    <div className={`alert alert-${type} alert-dismissible`} role="alert">
      <div>{msg}</div>
      <button type="button" className="btn-close" onClick={props.closeAlert}></button>
    </div>
  );
}

