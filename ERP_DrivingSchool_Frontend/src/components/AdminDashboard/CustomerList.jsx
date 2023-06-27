import React from 'react';
import MDSpinner from 'react-md-spinner';

const CustomerList = ({ customers, customerIsLoading, selectedCustomer, selectCustomer }) => {
    console.log(customers)
    if (customerIsLoading) {
      return (
        <div className='col-xl-12 my-auto text-center'>
          <MDSpinner size='72'/>
        </div>
      );
    } else {
      return (
        <ul className="list-group list-group-flush w-100">
          {customers.map((customer) => (
            <li
              key={customer.uid}
              className={`list-group-item ${customer.uid === selectedCustomer ? 'active' : ''}`}
              onClick={() => selectCustomer(customer.uid)}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      );
    }
  };
  
  export default CustomerList;
  