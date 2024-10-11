'use client';

import React, { useEffect } from 'react'

function UseLocalStorage() {
  

  useEffect(() => {
    console.log('UseLocalStorage');
    localStorage.setItem('name', 'John Doe');
    console.log(localStorage.getItem('name'));
  }, []);

  return (
    <div>UseLocalStorage</div>
  )
}

export default UseLocalStorage