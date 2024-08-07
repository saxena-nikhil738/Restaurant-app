import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-content">
      {/* <Collection /> */}
      <div className="hello-profile">
        <span>Hello,</span>
        <div className="hello">from Profile page</div>
      </div>
      <div className="navigate">
        <p>Please navigate to</p>
        <span>
          <a href="/manage-restaurants">manage restaurants</a>
        </span>
        <p>to manage</p>
        <p className="desktop">For better experience use Desktop mode</p>
      </div>
    </div>
  );
};

export default Profile;
