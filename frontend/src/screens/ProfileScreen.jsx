import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import "../style/Profile.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [mobile, setMobile] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();

  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const defaultProfilePicture = "https://static.vecteezy.com/system/resources/previews/022/123/337/original/user-icon-profile-icon-account-icon-login-sign-line-vector.jpg"; // Add the path to your default profile picture

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setHeight(userInfo.height);
    setWeight(userInfo.weight);
    setMobile(userInfo.mobile);
    setGender(userInfo.gender);
    setDob(userInfo.dob);

    const storedProfilePicture = localStorage.getItem("profilePicture");
    if (storedProfilePicture) {
      setProfilePicturePreview(storedProfilePicture);
    } else if (userInfo.profilePicture) {
      setProfilePicturePreview(userInfo.profilePicture);
    }

  //   const storedProfilePicture = localStorage.getItem("profilePicture");
  // if (storedProfilePicture) {
  //   setProfilePicture(storedProfilePicture);
  //   setProfilePicturePreview(storedProfilePicture);
  // } else if (userInfo.profilePicture) {
  //   setProfilePicture(userInfo.profilePicture);
  //   setProfilePicturePreview(userInfo.profilePicture);
  // } else {
  //   setProfilePicture(defaultProfilePicture);
  //   setProfilePicturePreview(defaultProfilePicture);
  // }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          height,
          weight,
          mobile,
          gender,
          dob,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePicture(base64String);
        setProfilePicturePreview(base64String);
        localStorage.setItem("profilePicture", base64String);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       setProfilePicture(base64String);
  //       setProfilePicturePreview(base64String);
  //       localStorage.setItem("profilePicture", base64String);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     toast.error("Please upload a valid image file");
  //   }
  // };

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       setProfilePicture(base64String);
  //       setProfilePicturePreview(base64String);
  //       localStorage.setItem("profilePicture", base64String);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     toast.error("Please upload a valid image file");
  //   }
  // };

  const resetProfilePicture = () => {
    setProfilePicture(defaultProfilePicture);
    setProfilePicturePreview(defaultProfilePicture);
    localStorage.setItem("profilePicture", defaultProfilePicture);
  };

  // const resetProfilePicture = () => {
  //   setProfilePicture(defaultProfilePicture);
  //   setProfilePicturePreview(defaultProfilePicture);
  //   localStorage.setItem("profilePicture", defaultProfilePicture);
  // };

  const handleBack = () =>{
    navigate("/")
  }

  return (
    <>
      <div class="container light-style flex-grow-1 container-p-y text-start">
        <h4 class="font-weight-bold py-3 mb-4">Account settings</h4>
        <div class="card overflow-hidden text-start">
          <div class="row no-gutters row-bordered row-border-light">
            <div class="col-md-3 pt-0">
              <div class="list-group list-group-flush account-settings-links">
                <a
                  class="list-group-item list-group-item-action active text-start"
                  data-toggle="list"
                  href="#account-general"
                >
                  General
                </a>
                <a
                  class="list-group-item list-group-item-action text-start"
                  data-toggle="list"
                  href="#account-change-password"
                >
                  Change password
                </a>
                <a
                  class="list-group-item list-group-item-action text-start"
                  data-toggle="list"
                  href="#account-info"
                >
                  Info
                </a>
              </div>
            </div>
            <div class="col-md-9">
              <div class="tab-content">
                <div class="tab-pane fade active show" id="account-general">
                  <div class="card-body media align-items-center text-start">
                    {profilePicturePreview && (
                      <div className="profile-picture-preview">
                        <img
                          src={profilePicturePreview}
                          alt="Profile Preview"
                          className="profile-picture"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    <div class="media-body ml-4">
                      <label class="btn btn-outline-primary text-start">
                        Upload new photo
                        <input
                          type="file"
                          class="account-settings-fileinput"
                          onChange={handleProfilePictureChange}
                        />
                      </label>{" "}
                      &nbsp;
                      <button
                        type="button"
                        class="btn btn-default md-btn-flat"
                        onClick={resetProfilePicture}
                      >
                        Reset to Default
                      </button>
                    </div>
                  </div>
                  <hr class="border-light m-0" />
  
                  <div class="card-body text-start">
                    <div class="form-group text-start">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile</label>
                      <input
                        type="number"
                        id="mobile"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="account-change-password">
                  <div class="card-body pb-2 text-start">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="account-info">
                  <div class="card-body pb-2 text-start">
                    <div className="form-group">
                      <label htmlFor="height">Height</label>
                      <input
                        type="number"
                        id="height"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weight">Weight</label>
                      <input
                        type="number"
                        id="weight"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <input
                        type="text"
                        id="gender"
                        placeholder="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right mt-3">
        <button type="submit" class="btn btn-primary" onClick={submitHandler}>
          Save changes
        </button>
        &nbsp;
        <button type="button" class="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default ProfileScreen;