import React from 'react';
import './form.css';

function Form({title, className}){
  return(
    <section className={className}>
      <i className={className} />
        <h1 className={className}>{title}</h1>
    </section>
  )
}
export default Form;