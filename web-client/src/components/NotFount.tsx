import React from 'react';
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
  return (
    <section className="wrapper">
    <h1 className='empty'>404 This page doesn't exits</h1>
   <button className='button width_costume' onClick={()=>navigate("/")}>Go to Home</button>
</section>
    
  );
};

export default NotFound;
