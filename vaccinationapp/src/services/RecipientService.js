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
    });
  }

  // getRecipients(user,name,last_name,cnp,gender,age,phone,email,city,category) {
  //   return axios.get(endpoint.baseURL+"person/", {
  //     user: user.user,
  //     name: name,
  //     last_name: last_name,
  //     cnp: cnp,
  //     gender: gender,
  //     age: age,
  //     phone: phone,
  //     email: email,
  //     city: city,
  //     category: category
  //    });
  // }

}

export default new RecipientService();