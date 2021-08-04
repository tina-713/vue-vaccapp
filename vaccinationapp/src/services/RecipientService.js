import axios from "axios";
import endpoint from  "../http-common";

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
      city: person.city,
      category: person.category
    });
  }

  getRecipients(id,name,last_name,cnp) {
    return axios.get(endpoint.baseURL+`person/`, {
      id: id,
      name: name,
      last_name: last_name,
      cnp: cnp,
     });
  }

  putRecipient(id, person) {
    return axios.put(endpoint.baseURL+`person/${id}`,{
      user: person.user,
      name: person.name,
      last_name: person.last_name,
      cnp: person.cnp,
      gender: person.gender,
      age: person.age,
      phone: person.phone,
      email: person.email,
      city: person.city,
      category: person.category
    });
  }

  deleteRecipient(id) {
    return axios.delete(endpoint.baseURL+`person/${id}`, {
     });
  }

  getRecipient(id) {
    return axios.get(endpoint.baseURL+`person/${id}`, {
     });
  }

}

export default new RecipientService();