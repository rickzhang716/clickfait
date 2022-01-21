import http from "../http-common";


class HeadlineDataService {
    getAll() {
        return http.get("/headlines");
    }
    getSaved() {
        return http.get("/headlines/saved")
    }
    get(id) {
        return http.get(`/headlines/${id}`);
    }

    create(data) {
        return http.post("/headlines", data);
    }

    update(id, data) {
        return http.put(`/headlines/${id}`, data);
    }

    delete(id) {
        return http.delete(`/headlines/${id}`);
    }

    deleteAll() {
        return http.delete("/headlines");
    }
    findByTitle(title) {
        return http.get(`/headlines?title=${title}`);
    }
    evaluate(title) {
        return http.get(`/headlines/evaluate?title=${title}`);
    }
}


export default new HeadlineDataService();