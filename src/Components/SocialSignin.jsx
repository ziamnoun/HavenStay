
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const SocialSignin = () => {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setLoading(true); 

    const res = await signIn(provider, {
      callbackUrl: '/', 
    });

   
    if (res?.error) {
      console.error('Sign-in failed');
    }

    setLoading(false); 
  };

  return (
    <div>
      <button
        onClick={() => handleSocialLogin('google')}
        className="w-full flex items-center justify-center bg-gradient-to-r from-[#f1d350] to-[#DB4437] text-white p-3 rounded-md font-semibold transition-all"
        disabled={loading} 
      >
        {loading ? (
          <span>
          
<span className="loading loading-spinner loading-lg"></span>
          </span> 
        ) : (
          <>
            <FaGoogle className="mr-2 text-lg" />
            Log in with Google
          </>
        )}
      </button>
    </div>
  );
};

export default SocialSignin;
