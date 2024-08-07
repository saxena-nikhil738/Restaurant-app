import React from "react";
import Collection from "./Collections/Collection";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-content">
      {/* <Collection /> */}
      <div className="hello-home">
        <span>Hello,</span>
        <div className="hello">from home page</div>
      </div>
      <div className="navigate">
        <p>Please navigate to</p>
        <span>
          <a href="/manage-restaurants">manage restaurants</a>
        </span>
        <p>to manage</p>
      </div>
    </div>
  );
};

export default Home;
