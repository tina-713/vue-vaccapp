import axios from "axios";
import endpoint from  "../http-common";

let user = JSON.parse(localStorage.getItem('user'));

class AppointmentService {
  


//   getRecipients(id,name,last_name,cnp,userId) {

//     return axios.get(endpoint.baseURL+`person/user/${userId}`, {
//       id: id,
//       name: name,
//       last_name: last_name,
//       cnp: cnp,
//      },{
//       headers:{
//          Authorization:  `Bearer `+ user.data.access
//     }}
//     );
//   }


  getAppointmentDate(id,date) {
    return axios.get(endpoint.baseURL+`office/${id}/${date}`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }

}

export default new AppointmentService();