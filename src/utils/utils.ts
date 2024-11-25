export const getBasicAuthHeader = (username: string, password: string) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
};

export const logoutTicketguru = (navigate) => {
    localStorage.removeItem('authenticationHeader');
    navigate("/login");
};