import * as api from "./api.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllJobs() {
    return api.get('/data/offers?sortBy=_createdOn%20desc');
}

export async function addJob(job) {
    return api.post('/data/offers', job)
}

export async function getJobById(id) {
    return api.get('/data/offers/' + id)
}

export async function editJobById(id, job) {
    return api.put('/data/offers/' + id, job);
}

export async function deleteJob(id) {
    return api.del('/data/offers/' + id)
}


export async function applyJob(jobId) {
    return api.post('data/applications', {jobId});
}

export async function getAppliesByJobId(jobId) {
    return api.get(`/data/applications?where=offerId%3D%22${jobId}%22&distinct=_ownerId&count`)
}
export async function getMyAppliesByJobId(jobId, userId) {
    return api.get(`/data/applications?where=offerId%3D%22${jobId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

