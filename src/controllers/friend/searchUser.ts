import UserModel from '../../models/user';
import { Request, Response } from 'express';

const searchUser = async (req: Request, res: Response ) => {
    const { username } = req.query;
    const users = await UserModel.find({ username });
    if (!users) return res.status(404).json({ message: `No user found with username: ${username}` });
    return res.status(200).json({ users });
}

export default searchUser;
