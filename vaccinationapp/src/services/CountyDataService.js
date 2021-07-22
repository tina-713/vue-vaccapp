import http from "../http-common";

class CountyDataService {
  getAll() {
    return http.get("/counties/");
  }

  get(id) {
    return http.get(`/counties/${id}/`);
  }

  create(data) {
    return http.post("/counties/", data);
  }

  update(id, data) {
    return http.put(`/counties/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/counties/${id}/`);
  }

  // deleteAll() {
  //   return http.delete(`/counties/`);
  // }

  findByName(name) {
    return http.get(`/counties?name=${name}/`);
  }
}

export default new CountyDataService();