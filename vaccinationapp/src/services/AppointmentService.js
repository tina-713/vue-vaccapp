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
  postAppointment(appointment){
    return axios.post(endpoint.baseURL+`appointment/`,{
      kind: appointment.kind,
      date: appointment.date,
      office: appointment.office,
      person: appointment.person,
      status: appointment.status,
      time: appointment.time,
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }

  getAppointment(person,office,kind,date,time,status,userId) {
    return axios.get(endpoint.baseURL+`appointment/user/${userId}/`, {
      person: person,
      kind: kind,
      status: status,
      office: office,
      date: date,
      time: time,
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  postWaitingList(wlist){
    return axios.post(endpoint.baseURL+`waiting-list/`,{
      office: wlist.office,
      person: wlist.person,
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  // postStatus(id, appointment){
  //   return axios.post(endpoint.baseURL+`appointment/${id}/`,{
  //     status: appointment.status,
  //   },{
  //     headers:{
  //        Authorization:  `Bearer `+ user.data.access
  //   }}
  //   );
  // }
}

export default new AppointmentService();