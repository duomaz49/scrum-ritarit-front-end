export const getBasicAuthHeader = (username: string, password: string) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
};