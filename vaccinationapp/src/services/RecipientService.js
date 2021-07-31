import axios from "axios";
import endpoint from  "../http-common";


class RecipientService {
  
  postRecipient(user,name,last_name,cnp,gender,age,phone,email,city,category) {
    return axios.post(endpoint.baseURL+"person/",{
      user: user.user,
      name: name,
      last_name: last_name,
      cnp: cnp,
      gender: gender,
      age: age,
      phone: phone,
      email: email,
      city: city,
      category: category
    })
  }

}

export default new RecipientService();