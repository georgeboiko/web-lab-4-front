const BASE_URL = 'http://localhost:8080/web4';

export const httpClient = async (url, options = {}) => {
    
    const headers = {
        'Content-type': 'application/json',
        ...(options.headers || {})
    };

    const config = { 
        ...options,
        headers,
        credentials: 'include'
    };

    const res = await fetch(`${BASE_URL}${url}`, config);

    let data = null;

    try {
        data = await res.json();
    } catch {}

    if (!res.ok) {
        const message = data?.message || 'Server error, please try again';
        throw new Error(message);
    }

    return data;

};