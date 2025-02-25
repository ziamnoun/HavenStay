// import { signIn } from 'next-auth/react';
// import React from 'react';
// import { FaGoogle } from 'react-icons/fa';

// const SocialSignin = () => {
// const handleSocialLongin = async (provider)=>{
//     const res= await signIn(provider)

// }


//     return (
//         <div>
//           <button onClick={() => handleSocialLongin('google')} className="w-full flex items-center justify-center bg-gradient-to-r from-[#f1d350] to-[#DB4437] text-white p-3 rounded-md font-semibold transition-all">
//                        <FaGoogle className="mr-2 text-lg" />
//                        Log in with Google
//                      </button>   
//         </div>
//     );
// }

// export default SocialSignin;
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const SocialSignin = () => {
  const [notification, setNotification] = useState('');

  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider);

  
    if (res?.ok) {
      setNotification('Login Failed!');
      setTimeout(() => setNotification(''), 3000); 
    } else {
      setNotification('Login Successful');
      setTimeout(() => setNotification(''), 9000); 
    }
  };

  return (
    <div>
      <button
        onClick={() => handleSocialLogin('google')}
        className="w-full flex items-center justify-center bg-gradient-to-r from-[#f1d350] to-[#DB4437] text-white p-3 rounded-md font-semibold transition-all"
      >
        <FaGoogle className="mr-2 text-lg" />
        Log in with Google
      </button>

      {notification && (
        <div className="mt-3 text-center text-white bg-green-500 p-2 rounded">
          {notification}
        </div>
      )}
    </div>
  );
};

export default SocialSignin;
