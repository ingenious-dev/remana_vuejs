import axios, {isCancel, AxiosError} from 'axios';

function configureClient() {
    // OPTION 1
    // var token = "f65b7b1d8bbdcca80929ae8ddce1e6132873882c"
    // var authorization = `Token ${token != null ? token : ''}`;

    // const http_client = axios.create({
    //     // baseURL: 'https://some-domain.com/api/',
    //     // timeout: 30000,
    //     headers: {
    //         // 'X-Custom-Header': 'foobar',
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         "Authorization": authorization,
    //     }
    // });

    // OPTION 2
    const headers = {
        // 'X-Custom-Header': 'foobar',
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_TOKEN != null ? import.meta.env.VITE_TOKEN : localStorage.getItem("token")}`,
    }

    // if(import.meta.env.VITE_TOKEN) {
    //     headers["Authorization"] = import.meta.env.VITE_TOKEN
    // }

    const http_client = axios.create({
        // baseURL: 'https://some-domain.com/api/',
        // timeout: 30000,
        headers
    });

    return http_client;
}

// const http_client = configureClient();
// export default http_client;

// so that when token is update it captured rather than forcing the user to reload the SPA
export default configureClient;