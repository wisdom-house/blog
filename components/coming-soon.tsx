

import Image from "next/image";

const ComingSoon = () => {
   return (
      <div className="flex items-center justify-center min-h-screen" >
         <div className="text-center" >
            <div className="flex items-center justify-center w-32 aspect-square mx-auto " >
               <div className="relative w-24 h-24" >
                  <Image
                     src="/assets/logo.png"
                     alt="logo"
                     fill
                     className="object-contain"
                  />
               </div>
            </div>
            < h1 className="mt-8 text-3xl font-bold text-gray-800" > Wisdom House Blog </h1>
            < p className="mt-4 text-lg text-gray-600" > Coming Soon </p>
         </div>
      </div>
   );
};

export default ComingSoon;