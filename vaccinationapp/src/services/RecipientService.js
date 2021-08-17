import axios from "axios";
import endpoint from  "../http-common";

let user = JSON.parse(localStorage.getItem('user'));

class RecipientService {
  
  postRecipient(person) {
    return axios.post(endpoint.baseURL+`person/`,{
      user: person.user,
      name: person.name,
      last_name: person.last_name,
      cnp: person.cnp,
      gender: person.gender,
      age: person.age,
      phone: person.phone,
      email: person.email,
      county:person.county,
      city: person.city,
      category: person.category
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }

  getRecipients(id,name,last_name,cnp,userId) {

    return axios.get(endpoint.baseURL+`person/user/${userId}/`, {
      id: id,
      name: name,
      last_name: last_name,
      cnp: cnp,
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  adminGetRecipients(id,name,last_name,cnp) {

    return axios.get(endpoint.baseURL+`person/`, {
      id: id,
      name: name,
      last_name: last_name,
      cnp: cnp,
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
  //update
  putRecipient(id, person) {
    return axios.put(endpoint.baseURL+`person/${id}/`,{
      id: person.id,
      user: person.user,
      name: person.name,
      last_name: person.last_name,
      cnp: person.cnp,
      gender: person.gender,
      age: person.age,
      phone: person.phone,
      email: person.email,
      city: person.city,
      county:person.county,
      category: person.category

    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }

  deleteRecipient(id) {
    return axios.delete(endpoint.baseURL+`person/${id}/`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }

  getRecipient(id) {
    return axios.get(endpoint.baseURL+`person/${id}/`, {
     },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    );
  }
}

export default new RecipientService();