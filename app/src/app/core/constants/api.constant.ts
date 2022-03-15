import { environment } from "src/environments/environment"

// Replace {:uuid} with actual value before calling API

export const API = {
    transfer: {
        getAll: `${environment.baseUrl}/transfers`,  // get
        getByUuid: `${environment.baseUrl}/transfers/{:uuid}`, // get 
        create: `${environment.baseUrl}/transfers`,  // post
        deleteByUuid: `${environment.baseUrl}/transfers/{:uuid}`, // delete
        update: `${environment.baseUrl}/transfers/{:uuid}`,  // put
    }
}