import { axios_error_message } from '../utilities/axios_helper';
import http_client from '../network/http_client';
import { API_V1_CANNONICAL } from '../network/network_info';

// TODO https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function fetchPersons({start, end, keyword, limit, page}) {
    var query = start == null ? '' : `start=${start}`;
    query += end == null ? '' : `&end=${end}`;
    query += keyword == null ? '' : `&q=${keyword}`;
    query += limit == null ? '' : `&limit=${limit}`;
    query += page == null ? '' : `&page=${page}`;
    query = `?${query}`;

    try {
      const response = await http_client().get(`${API_V1_CANNONICAL}/person${query}`);
    //   console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(axios_error_message(error));
    }
}
  
async function createPerson(data, ) {
    try {
        const response = await http_client().post(`${API_V1_CANNONICAL}/person`, data, {
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function getPerson(id) {
    try {
        const response = await http_client().get(`${API_V1_CANNONICAL}/person/${id}`);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function updatePerson(id, data) {
    try {
        const response = await http_client().patch(`${API_V1_CANNONICAL}/person/${id}`, data, {
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function deletePerson(id) {
    try {
        const response = await http_client().delete(`${API_V1_CANNONICAL}/person/${id}`);
        // console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

export {
    fetchPersons,
    createPerson,
    getPerson,
    updatePerson,
    deletePerson,
};