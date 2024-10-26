
  // Imported functions from the SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
  // TODO: SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  //  web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC1QUtajg0OE0M8z46lgdsqhJkQrl0xtyY",
    authDomain: "back-packers-home.firebaseapp.com",
    projectId: "back-packers-home",
    storageBucket: "back-packers-home.appspot.com",
    messagingSenderId: "234822648304",
    appId: "1:234822648304:web:fb482cf3a707ea8274dd35",
    measurementId: "G-8FTN71Y4LC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  let userInfo;

onAuthStateChanged(getAuth(app), (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    userInfo = user;
    console.log(user);
    if (user?.email) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout").style.display = "inline-block";
        document.getElementById("welcome").textContent = user?.email;
        showPackages();
        showMypackages();
    }
    // ...
  } else if (!user?.email){
    // User is signed out
    // ...
    document.getElementById("login-btn").style.display = "inline-block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("welcome").textContent = "";
    showPackages();
  }
});

let navbar = document.querySelector('.navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

let themeBtn = document.querySelector('#theme-btn');

themeBtn.onclick = () =>{
    themeBtn.classList.toggle('fa-sun');

    if(themeBtn.classList.contains('fa-sun')){
        document.body.classList.add('active');
    }else{
        document.body.classList.remove('active');
    }

};

var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

let auth = getAuth(app);

formElem.onsubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData(formElem);
    const formData = new FormData(formElem);
    const email = formData?.get("email");
    const password = formData?.get("password");
    const isRegister = formData?.get("isRegister");
    const sentData = { email, password };

    if (isRegister) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential?.user;
            console.log(user);
            if (user) {
                window.location.reload();
            }
        })
        .catch((error) => {
            const errorCode = error?.code;
            const errorMessage = error?.message;
            console.log(errorCode);

        });
    } else if (!isRegister) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential?.user;
          console.log(user);
          if (user) {
            window.location.reload();
        }

        })
        .catch((error) => {
          const errorCode = error?.code;
          const errorMessage = error?.message;
          console.log(errorCode);
        });
    }
    console.log(sentData)
};

document.getElementById("logout").onclick = () => {
    if(getAuth(app)?.currentUser?.email) {
        signOut(auth)
        .then(() => { 

            window.location = "/";
         })
        .catch(error => {
    
        });
    } else {

    }
};

const getPackagesUrl = "https://api-backpackershome.herokuapp.com/packages";
const packages = document.getElementById("get-packages");

const showMypackages = () => {
    const getMyPackagesUrl = `https://api-backpackershome.herokuapp.com/booking/${getAuth(app)?.currentUser?.email}`;
    const myPackages = document.getElementById("my-packages");

    fetch(getMyPackagesUrl)
    .then(res => res.json())
    .then(data => {
        data?.forEach((pack, i) => {
            // console.log(getAuth(app)?.currentUser?.email)
                // console.log(pack?._id, getAuth(app)?.currentUser?.email)
                        const newDiv = document.createElement("div");
                        myPackages?.appendChild(newDiv);
                        newDiv.innerHTML = 
                            `
                                <div class="box" data-aos="fade-up">
                                    <div class="image">
                                        <img src=${pack?.imgURL} alt="">
                                        <h3> <i class="fas fa-map-marker-alt"></i> ${pack?.location} </h3>
                                    </div>
                                    <div class="content">
                                        <div class="price"> ${pack?.price} BDT </div>
                                        <p>${pack?.details}</p>
                                        <button id=${pack?._id} class="btn book"> book now</button>
                                    </div>
                                </div>
                            `
        });
    });
};

const showPackages = () => {
    fetch(getPackagesUrl)
    .then(res => res.json())
    .then(data => {
        data?.forEach((pack, i) => {
            // console.log(getAuth(app)?.currentUser?.email)
                // console.log(pack?._id, getAuth(app)?.currentUser?.email)
                        const newDiv = document.createElement("div");
                        packages?.appendChild(newDiv);
                        newDiv.innerHTML = 
                            `
                                <div class="box" data-aos="fade-up">
                                    <div class="image">
                                        <img src=${pack?.imgURL} alt="">
                                        <h3> <i class="fas fa-map-marker-alt"></i> ${pack?.location} </h3>
                                    </div>
                                    <div class="content">
                                        <div class="price"> ${pack?.price} BDT </div>
                                        <p>${pack?.details}</p>
                                        <button id=${pack?._id} class="btn book"> book now</button>
                                    </div>
                                </div>
                            `
        });
        Array.from(document.querySelectorAll(".book")).forEach(b => b.onclick = (e) => {
            if (!getAuth(app)?.currentUser?.email) {
                loginForm.classList.toggle('active');
                navbar.classList.remove('active');
            } else if (getAuth(app)?.currentUser?.email) {
                fetch(`https://api-backpackershome.herokuapp.com/pack/${e.target.id}/${getAuth(app)?.currentUser?.email}`)
                .then(res => res.json())
                .then(data => {
                        const sentData = {
                            email: getAuth(app)?.currentUser?.email,
                            location: data?.location,
                            imgURL: data?.imgURL,
                            price: data?.price
                        }
                        console.log(sentData);
                        fetch(`https://api-backpackershome.herokuapp.com/book`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(sentData)
                        })
                        .then(res => res.json())
                        .then(data => { window.alert("Booked!") });  
                    
                    })
            }
        });
        console.log(packages);
    });
}