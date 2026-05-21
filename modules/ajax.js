class Ajax {
    async get(url, callback) {
        try {
            const response = await fetch(url);
            const data = await response.json().catch(() => null);
            callback(data, response.status);
        } catch (error) {
            console.error('Ошибка GET запроса (Fetch):', error);
            callback(null, 500);
        }
    }

    async post(url, bodyData, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            const data = await response.json().catch(() => null);
            callback(data, response.status);
        } catch (error) {
            console.error('Ошибка POST запроса (Fetch):', error);
            callback(null, 500);
        }
    }

    async patch(url, bodyData, callback) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            const data = await response.json().catch(() => null);
            callback(data, response.status);
        } catch (error) {
            console.error('Ошибка PATCH запроса (Fetch):', error);
            callback(null, 500);
        }
    }

    async delete(url, callback) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            const data = await response.json().catch(() => null);
            callback(data, response.status);
        } catch (error) {
            console.error('Ошибка DELETE запроса (Fetch):', error);
            callback(null, 500);
        }
    }
}

export const ajax = new Ajax();
