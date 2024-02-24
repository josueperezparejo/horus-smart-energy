import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        return decodedToken.userId;
    } catch (error) {
        throw new Error('Token inválido');
    }
}

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// middleware para verificar si el usuario está autenticado y tiene permisos para realizar una acción específica.
export const authMiddleware = (userId, req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader;
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            let decodedUserId = decoded.userId;

            if (userId == decodedUserId) {
                console.log('Token ID coincide con el ID de usuario asociado con la solicitud');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al verificar el token JWT:', error.message);
            return false;
        }
    } else {
        console.log('No token JWT');
        return false;
    }
};