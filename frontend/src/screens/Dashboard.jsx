import React from 'react'
import "../style/Dashboard.css"
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import {Chart as ChartJS} from "chart.js/auto";
import {Line,Bar} from "react-chartjs-2";
import dummyData from "../chartData/dummyData.json"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Dashboard = () => {
   



     const { userInfo} = useSelector((state) => state.auth);
     const [profilePicture, setProfilePicture] = useState('');

     useEffect(() => {
        const storedProfilePicture = localStorage.getItem('profilePicture');
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      }, []);


    //  const handleProfilePictureChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         const base64String = reader.result;
    //         setProfilePicture(base64String);
    //         setProfilePicturePreview(base64String);
    //         localStorage.setItem('profilePicture', base64String);
    //       };
    //       reader.readAsDataURL(file);
    //     } else {
    //       toast.error('Please upload a valid image file');
    //     }
    //   };


  return (
    <div>
          <div className="dashboard">
            <div id="left">
            <div className="menubar"></div>
            </div>
            <div id="mid">
            <div className="mid-top-content">
                    <div className="top-btn">
                        <h2>View Analytics</h2>
                    </div>
                </div>
                <div className="mid-content">
                    <div className="data">
                        <div className="graph">
                            <Line 
                               data={{
                                labels: dummyData.map((data) => data.label),
                                datasets: [
                                  {
                                    label: "Revenue",
                                    data: dummyData.map((data) => data.revenue),
                                    backgroundColor: "#064FF0",
                                    borderColor: "#064FF0",
                                  },
                                  {
                                    label: "",
                                    data: dummyData.map((data) => data.cost),
                                    backgroundColor: "#FF3030",
                                    borderColor: "#FF3030",
                                  },
                                ],
                              }}
                              options={{
                                elements: {
                                  line: {
                                    tension: 0.1,
                                  },
                                },
                                plugins: {
                                  title: {
                                    text: "Monthly Revenue & Cost",
                                  },
                                },
                              }}
                            />
                        </div>
                            <div className="buttons">
                                <div className="butleft"></div>
                                <div className="butright"></div>
                            </div>
                        </div>
                </div>
            </div>
            <div id="right">
                <div className="profile">
                    <div className="profile-pic">
                    {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profile-picture"
                  style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
                    </div>
                    <div className="profile-info">
                        <p><span><i class="fa-solid fa-user"></i></span>{userInfo.name}</p>
                        <p><span><i class="fa-solid fa-envelope"></i></span>{userInfo.email}</p>
                        <p><span><i class="fa-solid fa-phone"></i></span>{userInfo.mobile}</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
