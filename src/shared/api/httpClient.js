const BASE_URL = 'http://localhost:8080/web4';
let isRefreshing = false;
let refreshPromise = null;

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

    if (res.ok) {
        return data;
    }

    if (res.status === 401 && !config._retry) {
        if (!isRefreshing) {
            console.log('Refreshing...');
            isRefreshing = true;
            refreshPromise = fetch(`${BASE_URL}/api/v1/auth/refresh`, {
                method: 'POST',
                credentials: 'include'
            })
            .then((res) => {
                if (!res.ok) throw new Error('Refresh failed');
                return res.json();
            })
            .finally(() => isRefreshing = false);
        }

        try {
            await refreshPromise;

            const retryHeaders = {
                'Content-type': 'application/json',
                ...(options.headers || {})
            };

            const retryConfig = { 
                ...options,
                retryHeaders,
                _retry: true,
                credentials: 'include'
            };
            return await httpClient(url, retryConfig);
        } catch (err) {
            console.warn('Refresh failed, logging out...');
            throw err;
        }
    }

    const message = data?.message || 'Server error, please try again';
    throw new Error(message);
};