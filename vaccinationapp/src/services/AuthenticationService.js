import axios from "axios";
import endpoint from  "../http-common";


let user = JSON.parse(localStorage.getItem('user'));
class AuthenticationService {
  
  
  postLogin(email,password) {
    return axios.post(endpoint.baseURL+"auth/login/",{
      email: email,
      password: password
    })
  }

  postRegister(email,password) {
    return axios.post(endpoint.baseURL+"auth/register/",{
      email: email,
      password: password
    },{
      headers:{
        Authorization:  `Bearer `+ user.data.access
      }
    })
  }
}

export default new AuthenticationService();