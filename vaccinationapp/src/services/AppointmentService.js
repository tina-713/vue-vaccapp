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
  getAdminAppointment(id) {
    return axios.get(endpoint.baseURL+`appointment/${id}/`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  getAllAppointments(){
    return axios.get(endpoint.baseURL+`appointment/`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  getAppointment(userId) {
    return axios.get(endpoint.baseURL+`appointment/user/${userId}/`, {
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
  deleteWaitingList(id,personid){
    return axios.delete(endpoint.baseURL+`waiting-list/person/${personid}/office/${id}`,{
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  putStatus(appointment){
    return axios.put(endpoint.baseURL+`appointment/${appointment.id}/`,{
      kind: appointment.kind,
      office: appointment.office,
      status: appointment.status,
      time: appointment.time,
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  putAppointment(appointment) {
    return axios.put(endpoint.baseURL+`appointment/${appointment.id}/`,{
      id: appointment.id,
      name: appointment.name, 
      kind: appointment.kind,
      status: appointment.status, 
      time: appointment.time,
      office: appointment.office,
      person: appointment.person,
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
}

export default new AppointmentService();