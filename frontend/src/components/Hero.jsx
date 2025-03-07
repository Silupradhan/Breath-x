// import React, { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import "../style/Hero.css";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";

// function Hero() {
//   const containerRef = useRef(null);
//   const [animationEnabled, setAnimationEnabled] = useState(true);
//   const [sideMenuVisible, setSideMenuVisible] = useState(false);

//   const toggleSideMenu = () => {
//     setSideMenuVisible(!sideMenuVisible);
//   };

//   useEffect(() => {
//     let animationComplete = false;

//     function revealToSpan() {
//       document.querySelectorAll("#loader .reveal").forEach((element) => {
//         const parent = document.createElement("span");
//         const child = document.createElement("span");
//         parent.classList.add("parent");
//         child.classList.add("child");
//         child.innerHTML = element.innerHTML;
//         parent.appendChild(child);
//         element.innerHTML = "";
//         element.appendChild(parent);
//       });
//     }

//     function valueSetters() {
//       gsap.set("#nav a", { y: "100%", opacity: 0 });
//       gsap.set("#home .parent .child", { y: "100%", opacity: 0 });
//       gsap.set("#home .reveal", { y: "20px", opacity: 0 });
//       gsap.set(".boo", { opacity: 0, y: 20 });
//     }

//     function animationHomePage() {
//       if (containerRef.current && animationEnabled && animationComplete) {
//         const tl = gsap.timeline();

//         tl.to(containerRef.current.querySelectorAll("#nav a"), {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           stagger: 0.05,
//           ease: "Expo.easeInOut",
//         });

//         tl.to(containerRef.current.querySelectorAll("#home .parent .child"), {
//           y: 0,
//           duration: 2,
//           stagger: 0.1,
//           ease: "Expo.easeInOut",
//         });

//         tl.to(containerRef.current.querySelectorAll("#home .reveal"), {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           stagger: 0.2,
//           ease: "Expo.easeInOut",
//         });

//         tl.to(containerRef.current.querySelectorAll(".boo"), {
//           opacity: 1,
//           y: 0,
//           duration: 1.5,
//           stagger: 0.2,
//           ease: "Power3.easeOut",
//         });
//       }
//     }

//     revealToSpan();
//     valueSetters();

//     if (containerRef.current) {
//       const tl = gsap.timeline({
//         onComplete: () => {
//           animationComplete = true;
//           animationHomePage();
//         },
//       });

//       tl.from(containerRef.current.querySelectorAll("#loader h1 .child span"), {
//         x: "100",
//         duration: 2,
//         ease: "power3.inOut",
//         stagger: 0.2,
//       });

//       tl.to(containerRef.current.querySelectorAll(".parent .child"), {
//         y: "-100%",
//         duration: 1,
//         delay: 1,
//         ease: "circ.easeInOut",
//       });
//       tl.to(containerRef.current.querySelectorAll("#loader"), {
//         height: 0,
//         duration: 1,
//         ease: "circ.easeInOut",
//       });
//       tl.to(containerRef.current.querySelectorAll("#green"), {
//         height: "100%",
//         top: 0,
//         delay: -1,
//         duration: 1,
//         ease: "circ.easeInOut",
//       });
//       tl.to(containerRef.current.querySelectorAll("#green"), {
//         height: "0%",
//         delay: -0.3,
//         duration: 1,
//         ease: "circ.easeInOut",
//       });
//     }
//   }, [animationEnabled]);

//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div ref={containerRef}>
//       <div id="main">
//         <div id="loader">
//           <div id="topHeading">
//             <h5 className="reveal">Breathe In... Processing..</h5>
//             <h5 className="reveal">&copy; 2025</h5>
//           </div>
//           <h1 className="reveal">
//             <span>Your</span> <span>Breath</span> <span>Your</span>{" "}
//             <span>Health</span>
//           </h1>
//         </div>
//         <div id="green"></div>
//         <div id="home">
//           <div id="nav">
//             <a href="">
//               <img src="src/assets/logon.png" alt="logon" id="logon-img"></img>
//             </a>
//             <a href="">
//               Test
//               <span id="line1" className="line"></span>
//               <span id="line2" className="line"></span>
//             </a>
//             <a href="">
//               Awareness
//               <span id="line1" className="line"></span>
//               <span id="line2" className="line"></span>
//             </a>
//             <a href="#" onClick={toggleSideMenu}>
//               Account
//               <span id="line1" className="line"></span>
//               <span id="line2" className="line"></span>
//             </a>
//           </div>
//           <div className="boo">
//             <h1 className="reveal">Intelligent</h1>
//             <div className="text">
//               <h5 className="reveal">Sensor Connectivity:</h5>
//               <h5 className="reveal">✅ Stable | ⚠️ Weak</h5>
//             </div>
//             <div className="text">
//               <h5 className="reveal">Total Scans Today:</h5>
//               <h5 className="reveal">XX</h5>
//             </div>
//           </div>
//           <div className="boo">
//             <a href="#">
//               <img src="src\assets\down-arrow.040970d7.svg" alt="" />
//             </a>
//             <h2 className="breath">Breath</h2>
//             <h1 className="reveal">Analysis</h1>
//           </div>
//           <div id="side-menu" className={sideMenuVisible ? "visible" : ""}>
//             <div className="menu-content">
//               <a
//                 href="#"
//                 id="close-menu"
//                 onClick={toggleSideMenu}
//                 title="Close Menu"
//               >
//                 <i className="ri-close-circle-line"></i>
//               </a>

//               {userInfo ? (
//                 <>
//                   <Link to="/profile">Profile</Link>
//                   <Link to="/dashboard">Dashboard</Link>
//                   <button onClick={logoutHandler}>Logout</button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login">Login</Link>
//                   <Link to="/register">Register</Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div></div>
//       </div>
//     </div>
//   );
// }

// export default Hero;


import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import "../style/Hero.css"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";



function Hero() {
  const containerRef = useRef(null);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  useEffect(() => {
    let animationComplete = false;

    function revealToSpan() {
      document.querySelectorAll('#loader .reveal').forEach((element) => {
        const parent = document.createElement("span");
        const child = document.createElement("span");
        parent.classList.add("parent");
        child.classList.add("child");
        child.innerHTML = element.innerHTML;
        parent.appendChild(child);
        element.innerHTML = "";
        element.appendChild(parent);
      });
    }

    function valueSetters() {
      // Nav initial state
      gsap.set("#nav a", { y: "-100%", opacity: 0, scale: 0.9 });
      gsap.set("#home .parent .child", { y: "100%", opacity: 0 });
      // Row elements initial state (same for all animated elements)
      gsap.set(".boo h1.reveal", { y: 50, opacity: 0, scale: 0.95 }); // Intelligent & Analysis
      gsap.set(".boo .text h5.reveal", { y: 50, opacity: 0, scale: 0.95 }); // Sensor Connectivity & Total Scans
      gsap.set(".boo a img", { y: 50, opacity: 0, scale: 0.95 }); // Down arrow
    }

    function animationHomePage() {
      if (containerRef.current && animationEnabled && animationComplete) {
        const tl = gsap.timeline({
          onComplete: () => {
            // Fallback to ensure visibility
            gsap.set(".boo h1.reveal, .boo .text h5.reveal, .boo a img", { opacity: 1, y: 0, scale: 1 });
          }
        });

        // Nav animation
        tl.to(containerRef.current.querySelectorAll("#nav a"), {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        });

        // Animate all row elements with the same effect as "Intelligent"
        tl.to(containerRef.current.querySelectorAll(".boo h1.reveal"), {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2, // Stagger for sequential appearance
          ease: "power3.out",
        }, "-=0.8"); // Overlap with nav

        tl.to(containerRef.current.querySelectorAll(".boo .text h5.reveal"), {
          y: 0,
          opacity: 0.6, // Match CSS opacity
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }, "-=0.7");

        tl.to(containerRef.current.querySelectorAll(".boo a img"), {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, "-=0.6");

        // Loader content (if any)
        tl.to(containerRef.current.querySelectorAll("#home .parent .child"), {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "Expo.easeInOut",
        }, "-=1");
      }
    }

    revealToSpan();
    valueSetters();

    if (containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          animationComplete = true;
          animationHomePage();
        }
      });

      tl.from(containerRef.current.querySelectorAll("#loader h1 .child span"), {
        x: '100',
        duration: 1,
        ease: "power3.inOut",
        stagger: 0.2
      });

      tl.to(containerRef.current.querySelectorAll(".parent .child"), {
        y: '-100%',
        duration: 1,
        delay: 1,
        ease: "circ.easeInOut",
      });
      
      tl.to(containerRef.current.querySelectorAll("#loader"), {
        height: 0,
        duration: 1,
        ease: "circ.easeInOut"
      });
      tl.to(containerRef.current.querySelectorAll("#green"), {
        height: "100%",
        top: 0,
        delay: -1,
        duration: 1,
        ease: "circ.easeInOut"
      });
      tl.to(containerRef.current.querySelectorAll("#green"), {
        height: "0%",
        delay: -0.3,
        duration: 1,
        ease: "circ.easeInOut",
      });
    }
  }, [animationEnabled]);

  const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [logoutApiCall] = useLogoutMutation();
  
    const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };

    const handleArrowClick = () => {
      if (userInfo) {
        navigate("/quiz");
      } else {
        navigate("/login");
      }
    };
  

  return (
    <div ref={containerRef}>
      <div id='main'>
        <div id="loader">
          <div id="topHeading">
            <h5 className='reveal'>Breathe In... Processing..</h5>
            <h5 className='reveal'>© 2025</h5>
          </div>
          <h1 className='reveal'><span>Your</span> <span>Breath</span> <span>Your</span> <span>Health</span></h1>
        </div>
        <div id="green"></div>
        <div id="home">
          <div id="nav">
            <a href=""><img src="src/assets/logon.png" alt="logon" id="logon-img"></img></a>
            <Link to="/quiz">Test
              <span id='line1' className='line'></span>
              <span id='line2' className='line'></span>
            </Link>
            <a href="https://en.wikipedia.org/wiki/Diabetes_in_India">Awareness
              <span id='line1' className='line'></span>
              <span id='line2' className='line'></span>
            </a>
            <a href="#" onClick={toggleSideMenu}>
            {userInfo ? (
    <button className="custom-button"><i class="fa-solid fa-user"></i>{userInfo.name}</button>
  ) : (
    "Account"
  )}
              <span id='line1' className='line'></span>
              <span id='line2' className='line'></span>
            </a>
          </div>
          <div className="boo">
            <h1 className='reveal'>Intelligent</h1>
            <div className="text" id='connect'>
              <h5 className='reveal'>Sensor Connectivity:</h5>
              <h5 className='reveal'>✅ Stable | ⚠️ Weak</h5>
            </div>
            <div className="text" id='connect'>
              <h5 className='reveal'>Total Scans Today:</h5>
              <h5 className='reveal'>XX</h5>
            </div>
          </div>
          <div className="boo">
            <div onClick={handleArrowClick}><img src="src/assets/down-arrow.040970d7.svg" alt="" /></div>
            <h2 className="breath">Breath</h2>
            <h1 className='reveal ana' >Analysis</h1>
          </div>
          <div id="side-menu" className={sideMenuVisible ? "visible" : ""}>
             <div className="menu-content">
              <a
                href="#"
                id="close-menu"
                onClick={toggleSideMenu}
                title="Close Menu"
              >
                <i className="ri-close-circle-line"></i>
              </a>

              {userInfo ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <button className='logout-button' onClick={logoutHandler}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;