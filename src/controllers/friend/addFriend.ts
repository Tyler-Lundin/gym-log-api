
import UserModel from '../../models/user';
import { Request, Response } from 'express';

type reqBody = { friendPin: string, friendId: string };


const addFriend = async (req: Request, res: Response) => {
    const { userId } = req;
    const { friendPin, friendId }:reqBody = req.body;

    try {
        const user = await UserModel.findById( userId );
        const friend = await UserModel.findById( friendId );

        if ( !user || !friend ) return res.status(400).json({ message: 'User not found' });
        if ( friend.pin !== friendPin ) return res.status(400).json({ message: 'Invalid pin' });
        if ( user.friends.includes( friendId ) ) return res.status(400).json({ message: 'User already added' });
        if ( friend.friends.includes( userId ) ) return res.status(400).json({ message: 'User already added' });

        user.friends.push( friendId );
        friend.friends.push( userId );

        await user.save();
        await friend.save();


    return res.status(200).json({ message: `Successfully added ${friend.username} as a friend` });
}

export default addFriend;
