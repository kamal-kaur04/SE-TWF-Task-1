function userDashboard(){

          uid = localStorage.getItem("uid");
          console.log(uid);

          getMyProfile(uid);

          async function getMyProfile(uid) {
            db.collection("userProfile").where("userId", "==", uid).get().then((snapshot) => {

            snapshot.docs.forEach(doc => {
            let items = doc.data();
            var dob = items.userDOB;
            var place = items.Place;
            $("#valueDOB").append(dob);
            //console.log(dob);
            $("#valuePlace").append(place);
            //console.log(place);
            hideSpinner();
      });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
      }
}

userDashboard();


function hideSpinner() {
    // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");
   }
