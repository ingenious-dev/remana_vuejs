// ! XANO
// const API_V1_CANNONICAL = "https://x8ki-letl-twmt.n7.xano.io/api:NYm9JgOK";
// const AUTHENTICATION_CANNONICAL = "https://x8ki-letl-twmt.n7.xano.io/api:yXLVtVR9";
// const GOOGLE_OAUTH_CANNONICAL = "https://x8ki-letl-twmt.n7.xano.io/api:Fcy4VpNc";

// ! NODE JS
// const API_V1_CANNONICAL = "http://localhost:3000";
// const AUTHENTICATION_CANNONICAL = "http://localhost:3000";
// const GOOGLE_OAUTH_CANNONICAL = "http://localhost:3000";

const API_V1_CANNONICAL = import.meta.env.VITE_API_V1_CANNONICAL;
const AUTHENTICATION_CANNONICAL = import.meta.env.VITE_AUTHENTICATION_CANNONICAL;
const GOOGLE_OAUTH_CANNONICAL = import.meta.env.VITE_GOOGLE_OAUTH_CANNONICAL;

export {
    API_V1_CANNONICAL,
    AUTHENTICATION_CANNONICAL,
    GOOGLE_OAUTH_CANNONICAL
}