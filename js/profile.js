function userDashboard(){
          //e.preventDefault();

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
            console.log(dob);
            $("#valuePlace").append(place);
            console.log(place);
      });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
      }
      //hideSpinner();
}

userDashboard();
