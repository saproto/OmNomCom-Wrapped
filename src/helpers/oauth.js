import {generateCodeVerifier, OAuth2Client, OAuth2Fetch} from "@badgateway/oauth2-client";

const redirectUri = 'https://wrapped.sabroto.nl';
// const redirectUri = 'http://localhost:5173';

const getCodeVerifier = async() => {
    let codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) {
        codeVerifier = await generateCodeVerifier();
        localStorage.setItem('codeVerifier', codeVerifier);
    }
    return codeVerifier;
}

const client = new OAuth2Client({
    server: 'https://www.proto.utwente.nl',
    // server: 'http://localhost:8080',
    clientId: '10',
    // clientId: '2',
    tokenEndpoint: '/oauth/token',
    authorizationEndpoint: '/oauth/authorize',
});

export const login = async () => {
    let codeVerifier = await getCodeVerifier();
    document.location = await client.authorizationCode.getAuthorizeUri({
        redirectUri: redirectUri,
        codeVerifier,
        scope: ['*'],
        state: 'login',
    });
}

export const callback = async () => {
    let codeVerifier = await getCodeVerifier();
    try {
        let token = await client.authorizationCode.getTokenFromCodeRedirect(
            document.location,
            {
                redirectUri: redirectUri,
                codeVerifier,
                state: 'login',
            }
        );
        history.pushState('', document.title, document.location.origin);
        localStorage.setItem('token-store', JSON.stringify(token));
    } catch (e) {
    }
}

const fetchWrapper = new OAuth2Fetch({
    client: client,
    getNewToken: async () => {
        const token = localStorage.getItem('token-store');
        if (token) return JSON.parse(token);
        return null;
    },
    storeToken: token => {
        localStorage.setItem('token-store', JSON.stringify(token));
    },
    getStoredToken: () => {
        const token = localStorage.getItem('token-store');
        if (token) return JSON.parse(token);
        return null;
    },
    onError: (err) => {
    },
});

export const protoApi = async (endpoint, method='GET') => {
    try {
        const response = await fetchWrapper.fetch(client.settings.server+'/api/'+endpoint, {
            method: method,
        });
        return await response.json();
    } catch (err) {
        throw err;
    }
}

export const isLoggedIn = async () => {
    if (localStorage.getItem('token-store')) {
        try {
            const data = await protoApi('user/info');
            return !!data.member.id;
        } catch (err) {
            localStorage.removeItem('token-store');
        }
    }
    return false;
}
