import React, {useState} from 'react';
import Header from '../Header';
import FindPartner from '../FindPartner';


// const FindPartnerPage = () => {
//   let redirect = useNavigate()
//   const token = useSelector((state) => state.auth.token);

//   return(
//     <>
//       {token ?
//         <div>
//           <Header/>
//           <FindPartner/>
//         </div>
//       :
//         redirect('/')
//       }
// =======
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const FindPartnerPage = () => {
  const token = useSelector(state => state.auth.token)
  let redirect = useNavigate()
  return (
    <>
      {!token &&(redirect('/'))}
      <div>
        <Header/>
        <FindPartner/>
      </div>
    </>
  );
};

export default FindPartnerPage;