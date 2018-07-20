const buttonLogout = document.querySelector(".buttonLogout");



buttonLogout.addEventListener('click' , ()=> {
    firebase.auth().signOut().then(function() {
     window.location="login.html"
      })
      .catch(function(error) {
       
      });
    })
    