import DayModel from '../../models/day';
import { Request, Response } from "express"

/*
        weekday: string
        date: string // MM/DD/YYYY
        userId: ObjectId
        exercises: ObjectId[]
        stats: {
            exercises: {
                [exercise: string]: {
                    totalReps: number;
                    totalWeight: number;
                    totalSets: number;
                }
            };
            tags: {
                [label: string]: {
                    tagCount: number;
                    tagLocations: [ObjectId];
                };
            };
        }
*/

const getDay = async ( req: Request, res: Response ) => {
    // verify user
    const { userId } = req;
    if (!userId) return res.status(400).json({ message: 'Authorization Error', redirect: '/auth/login' });

    // payload validation
    const { month, day, year } = req.params;
    if (!month || !day || !year) return res.status(400).json({ message: 'Invalid date ?!' });
    const date = `${month}/${day}/${year}`;

    try {
        const day = await DayModel.findOne({ userId, date });
        if (!day) {
            const newDay = new DayModel({ userId, date });
            if (!newDay) return res.status(500).json({ message: 'Internal Server Error' });
            await newDay.save();
            return res.status(200).json({ message: 'Started new Day', day: newDay });
        }
        return res.status(200).json({ message: 'Continuing Existing Day', day });
    }
    catch ( error: any ) {
        return res.status( 500 ).json( { message: error.message } );
    }
}


export default getDay;
