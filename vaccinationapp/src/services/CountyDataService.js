import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));
class CountyDataService {
  getAllCounties() {
    return axios.get(endpoint.baseURL+'counties/',{
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    )
  }
  getCitiesByCounty(countyId) {
    return axios.get(endpoint.baseURL+`cities/${countyId}/`,{
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    )
  }

  // get(id) {
  //   return http.get(`/counties/${id}/`);
  // }

  // create(data) {
  //   return http.post("/counties/", data);
  // }

  // update(id, data) {
  //   return http.put(`/counties/${id}/`, data);
  // }

  // delete(id) {
  //   return http.delete(`/counties/${id}/`);
  // }

  // findByName(name) {
  //   return http.get(`/counties?name=${name}/`);
  // }
}

export default new CountyDataService();