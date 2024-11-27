import React from "react";
import "./Gandalf.css";

const Gandalf = () => {
  return (
    <div className="gandalf-wrapper relative">
      <div className="gandalf relative w-[400px] h-[400px] mx-auto mt-[1rem] animate-floating">
        <div className="fireball"></div>
        <div className="skirt"></div>
        <div className="sleeves"></div>
        <div className="shoulders">
          <div className="hand left"></div>
          <div className="hand right"></div>
        </div>
        <div className="head">
          <div className="hair"></div>
          <div className="beard"></div>
        </div>
      </div>
      <div className="message max-w-[700px] mx-auto mt-[5rem] text-center">
        <h1 className="text-[2.5rem] text-white">403 - You Shall Not Pass</h1>
        <p className="text-white text-[1.3rem]">
          Uh oh, Gandalf is blocking the way!
          <br />
          Maybe you have a typo in the URL? Or you meant to go to a different
          location? Like... Hobbiton?
        </p>
      </div>
    </div>
  );
};

export default Gandalf;
