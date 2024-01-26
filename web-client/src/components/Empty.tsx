import React from 'react';
import { useNavigate } from "react-router-dom";

const Empty: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="wrapper">
     <h1 className='empty'>Your movie list is empty</h1>
    <button className='button width_costume' onClick={()=>navigate("/create")}>Add a new movie</button>
 </section>
  
  );
};

export default Empty;
