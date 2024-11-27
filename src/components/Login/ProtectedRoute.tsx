import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
    // Katso local storageen, jossa kirjautumisessa tallennettu rooli
    const userRole = sessionStorage.getItem('role');

    // Tarkista onko role protected routessa, jos ei niin navigoi unauth
    if (!roles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
