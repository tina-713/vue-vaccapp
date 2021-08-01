import axios from "axios";
import endpoint from  "../http-common";


class RecipientService {
  
  postRecipient(person) {
    return axios.post(endpoint.baseURL+"person/",{
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
    })
  }

}

export default new RecipientService();