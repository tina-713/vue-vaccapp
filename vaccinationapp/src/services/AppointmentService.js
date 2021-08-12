import axios from "axios";
import endpoint from  "../http-common";

let user = JSON.parse(localStorage.getItem('user'));

class AppointmentService {
  
  getAppointmentDate(id,date) {
    return axios.get(endpoint.baseURL+`office/${id}/${date}/`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  getAppointmentHours(id,date) {
    return axios.get(endpoint.baseURL+`office/${id}/${date}/time`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  postAppointment(appoinment){
    return axios.post(endpoint.baseURL+`appointment/`,{
      kind: appoinment.kind,
      date: appoinment.date,
      office: appoinment.office,
      person: appoinment.person,
      status: appoinment.status,
      time: appoinment.time,
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
}

export default new AppointmentService();