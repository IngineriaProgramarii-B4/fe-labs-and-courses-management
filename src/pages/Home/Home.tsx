import React from "react";
import students_img from "../../img/happy_students.png";


function Home() {
  return (
    <div className="flex flex-col text-slate-100 text-center">
      <div className="flex lg:flex-row md:flex-col sm:flex-col min-[300px]:flex-col m-auto items-center justify-center">
        <div className="flex flex-col items-center justify-center m-10">
          <div className="font-bold text-8xl mb-5">uniManager</div>
          <div className="text-3xl">
            Unlock your academic potential with our all-in-one university app.
            Connect, learn, and thrive in one seamless platform!
          </div>
        </div>
        <div>
          <img src={students_img} alt="Students" className="w-3/4 m-auto"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
