"use strict";

class User {
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  // get token() {
  //   return localStorage.getItem('token');
  // }
  // set token(t) {
  //   localStorage.setItem('token', t);
  // }

  // logout(t) {
  //   localStorage.removeItem("token",t);
  //   location.reload();
  // }

  // async login(email, password) {
  //   fetch("Link API",{
  //     method: "POST",
  //     body: JSON.stringify({email,password})
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data)=>{
  //       this.service.userID = data.handle;
  //       this.token = data.token;
  //       if(data.token){
  //         this.data = data.token;
  //         document.getElementById('loginForm').style.display = "none";
  //       }else{
  //         console.log("wrong password");
  //       }
  //       console.log(this.token);
  //     });
  // }
}

export default User;