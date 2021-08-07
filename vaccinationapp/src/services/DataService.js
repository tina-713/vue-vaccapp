import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));
class DataService {
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
  getAllCategories() {
    return axios.get(endpoint.baseURL+`categories/`,{
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    )
  }
  getAllOffices() {
    return axios.get(endpoint.baseURL+`office/`,{
    },{
      headers:{
         Authorization:  `Bearer `+ user.data.access
    }}
    )
  }
}

export default new DataService();