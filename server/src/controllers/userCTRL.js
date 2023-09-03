import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/responseHandler.js';
import User from '../models/user.js';

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkUser = await User.findOne({ email });
        if (checkUser)
            return responseHandler.badRequest(res, 'Email already used');

        const user = new User();

        user.name = name;
        user.email = email;
        user.setPassword(password);

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        responseHandler.created(res, { token, ...user._doc, id: user.id });
    } catch {
        responseHandler.error(res);
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select(
            'email password salt id name'
        );

        if (!user)
            return responseHandler.badRequest(res, 'Email or Password invalid');

        if (!user.validPassword(password))
            return responseHandler.badRequest(res, 'Email or Password invalid');

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.created(res, { token, ...user._doc, id: user.id });
    } catch {
        responseHandler.error(res);
    }
};

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await User.findById(req.user.id).select(
            'password id salt'
        );

        if (!user) return responseHandler.unauthorize(res);

        if (!user.validPassword(password))
            return responseHandler.badRequest(res, 'Wrong password');

        user.setPassword(newPassword);

        await user.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getinfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) return responseHandler.notFound(res);

        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
};

export default { signup, signin, updatePassword, getinfo };
