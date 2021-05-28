// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(e){
    e.preventDefault();
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("pass").value;

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            alert("Registered Succesfully!");
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }

            return db.collection('userProfile')
            .doc(success.user.uid).set( {
                userId: uid,
                userEmail: userEmail,
                userPassword: userPassword,
                isProfileSubmitted: false,
                userDOB: "22/01/2021",
                Place: "Delhi",
            })
            .then(() => {
              setTimeout(function(){
                      window.location.replace("homescreen.html");
                  }, 10)
            })
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
//xxxxxxxxxx Check email or password exist in firebase authentication xxxxxxxxxx
function signIn(e){
    e.preventDefault();
    var userSIEmail = document.getElementById("emailSi").value;
    var userSIPassword = document.getElementById("passSi").value;

        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
          var user = firebase.auth().currentUser;
          var uid;
          if (user != null) {
              uid = user.uid;
          }

          // Store
          localStorage.setItem("uid", uid);

          // var isProfile = await db.collection("userProfile").doc(uid).get();
          // console.log(isProfile);

          getMyProfile(uid);

          async function getMyProfile(uid) { /* Remove arrow function */
            db.collection("userProfile").where("userId", "==", uid).get().then((snapshot) => {

            snapshot.docs.forEach(doc => {
            let items = doc.data();
            var isProfile = items.isProfileSubmitted;
            if (!isProfile) {
              setTimeout(function(){
                      window.location.replace("saveprofile.html");
              }, 10)
            } else {
              window.location.replace("profile.html");
            }
      });
    });
  }
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

// xxxxxxxxxx Save Profile Form xxxxxxxxxx
function saveProfile(e){
    e.preventDefault();
    var userDOB = document.getElementById("DOB").value;
    var userPlace = document.getElementById("place").value;

    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }

    db.collection('userProfile')
    .doc(uid).update( {
        userDOB: userDOB,
        Place: userPlace,
        isProfileSubmitted: true,
    })
    .then(() => {
      setTimeout(function(){
              window.location.replace("profile.html");
          }, 10)
    }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
});

}

  // $(window).load(function () {
  //     // Animate loader off screen
  //   $(".se-pre-con").fadeOut("slow");
  //    });
// function hideSpinner() {
//     $(".se-pre-con").fadeOut("slow");
//   }

// xxxxxxxxxx Sign Out xxxxxxxxxx
function signOut(e){
    e.preventDefault();

        firebase.auth().signOut().then(function() {
          localStorage.removeItem("uid");
          //localStorage.setItem("uid", uid);
          alert("Signed Out Succesfully");
          setTimeout(function(){
              window.location.replace("homescreen.html");
            }, 10);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}
