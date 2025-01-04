import { API_V1_CANNONICAL } from '../network/network_info';

export function getProfilePictureSrc(url) {
    if(url) {
        return url.includes("http") ? url : `${API_V1_CANNONICAL}${url}`;
    } else {
        return `${API_V1_CANNONICAL}/static/remana/icon-transparent.png`
    }
}