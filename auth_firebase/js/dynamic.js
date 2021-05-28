// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(e){
    e.preventDefault();
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("pass").value;
    // var hash = CryptoJS.MD5(userPassword);
    // userPassword.value=hash;
    var hashObj = new jsSHA("SHA-1", "TEXT", {numRounds: 1});
    hashObj.update(userPassword);
    var hash = hashObj.getHash("HEX");
    userPassword = hash;
    console.log(userPassword);
    console.log(hash);

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
                      window.location.replace("index.html");
                  }, 1)
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
    var hashObj = new jsSHA("SHA-1", "TEXT", {numRounds: 1});
    hashObj.update(userSIPassword);
    var hash = hashObj.getHash("HEX");
    userSIPassword = hash;

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
              }, 1)
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
          }, 1)
    }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
});

}

// xxxxxxxxxx Sign Out xxxxxxxxxx
function signOut(e){
    e.preventDefault();

        firebase.auth().signOut().then(function() {
          localStorage.removeItem("uid");
          //localStorage.setItem("uid", uid);
          alert("Signed Out Succesfully");
          setTimeout(function(){
              window.location.replace("index.html");
            }, 1);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}
