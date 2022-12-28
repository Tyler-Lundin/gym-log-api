import { Document, Schema } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    sessionId: string; // rotates every time user logs in
    days: Schema.Types.ObjectId[];
    settings: {
        theme: string;
        language: 'english' | 'spanish' | 'french'
    }
    stats: Stats;
    createdAt: Date;
    updatedAt: Date;
    assessments: Schema.Types.ObjectId[];
}

export interface Day extends Document {
    weekday: string;
    date: string; // MM/DD/YYYY
    userId: Schema.Types.ObjectId;
    exercises: [Schema.Types.ObjectId];
    stats: Stats
    createdAt: Date;
    updatedAt: Date;
}

export interface Exercise extends Document {
    dayId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    time: string; // 04:00 (military)
    tags: Tag[];
    exercise: string;
    weight: number;
    reps: number;
}


export interface Tag {
    label: string;
    color: string;
}

export interface Stats {
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
            tagLocations: [Schema.Types.ObjectId];
        };
    };
}

// Everything below this line is just for testing purposes // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export interface InitialAssessment extends Document {
    userId: Schema.Types.ObjectId;
    assessment: {
        age: number;
        height: number;
        weight: number;
        goal: 'lose' | 'maintain' | 'gain';
        activityLevel: 'sedentary' | 'light' | 'moderate' | 'heavy' | 'extreme';
    };
};

export interface DayAssessment extends Document {
    userId: Schema.Types.ObjectId;
    dayId: Schema.Types.ObjectId;
    assessment: {
        weight: number;
        sleep: number;
        stress: number;
        energy: number;
        mood: number;
        appetite: number;
        hydration: number;
        notes: string;
    };
};

export type AllExercises =
    | { name: 'bench press', variations: ['incline', 'decline'], equipment: ['barbell', 'dumbbell' ],  muscleGroups: ['chest', 'triceps'], tags: [ 'bro-split', 'push', 'upper-body'], relatedTo: ['chest fly', 'push ups'] }
    | { name: 'chest fly', variations: ['incline', 'decline'], equipment: ['dumbbell'], muscleGroups: ['chest', 'triceps'], tags: ['bro-split', 'push', 'upper-body'], relatedTo: ['bench press', 'push ups'] }
    | { name: 'push ups', variations: ['incline', 'decline', 'knee',], equipment: ['bodyweight'], muscleGroups: ['chest', 'triceps'], tags: ['bro-split', 'push', 'upper-body'], relatedTo: ['chest fly', 'bench press'] }
    | { name: 'shoulder press', variations: [], equipment: ['barbell', 'dumbbell'], muscleGroups: ['shoulders'], tags: ['bro-split', 'push', 'upper-body'], relatedTo: ['shoulder fly', 'lateral raise'] }
    | { name: 'shoulder fly', variations: [], equipment: ['dumbbell'], muscleGroups: ['shoulders'], tags: ['bro-split', 'push', 'upper-body'], relatedTo: ['shoulder press', 'lateral raise'] }
    | { name: 'lateral raise', variations: [], equipment: ['dumbbell'], muscleGroups: ['shoulders'], tags: ['bro-split', 'push', 'upper-body'], relatedTo: ['shoulder fly', 'shoulder press'] }
    | { name: 'pull ups', variations: ['wide', 'narrow', 'chin', 'knee'], equipment: ['bodyweight'], muscleGroups: ['back', 'biceps'], tags: ['bro-split', 'pull', 'upper-body'], relatedTo: ['lat pull down', 'row'] }
    | { name: 'lat pull down', variations: [], equipment: ['cable'], muscleGroups: ['back', 'biceps'], tags: ['bro-split', 'pull', 'upper-body'], relatedTo: ['pull ups', 'row'] }
    | { name: 'row', variations: [], equipment: ['barbell', 'dumbbell'], muscleGroups: ['back', 'biceps'], tags: ['bro-split', 'pull', 'upper-body'], relatedTo: ['lat pull down', 'pull ups'] }
    | { name: 'deadlift', variations: ['sumo', 'conventional'], equipment: ['barbell'], muscleGroups: ['back', 'biceps', 'quads', 'hamstrings', 'glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['squat', 'leg press'] }
    | { name: 'squat', variations: ['front', 'back'], equipment: ['barbell', 'dumbbell'], muscleGroups: ['quads', 'hamstrings', 'glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['deadlift', 'leg press'] }
    | { name: 'leg press', variations: [], equipment: ['machine'], muscleGroups: ['quads', 'hamstrings', 'glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['squat', 'deadlift'] }
    | { name: 'leg curl', variations: [], equipment: ['machine'], muscleGroups: ['hamstrings'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg extension', 'leg press'] }
    | { name: 'leg extension', variations: [], equipment: ['machine'], muscleGroups: ['quads'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg curl', 'leg press'] }
    | { name: 'calf raise', variations: ['standing', 'seated'], equipment: ['machine'], muscleGroups: ['calves'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg curl', 'leg press'] }
    | { name: 'bicep curl', variations: ['hammer', 'concentration'], equipment: ['barbell', 'dumbbell'], muscleGroups: ['biceps'], tags: ['bro-split', 'pull', 'upper-body'], relatedTo: ['tricep extension', 'pull ups'] }
    | { name: 'tricep extension', variations: ['overhead', 'skullcrusher'], equipment: ['barbell', 'dumbbell'], muscleGroups: ['triceps'], tags: ['bro-split', 'pull', 'upper-body'], relatedTo: ['bicep curl', 'push ups'] }
    | { name: 'ab crunch', variations: ['knee', 'leg raise'], equipment: ['bodyweight'], muscleGroups: ['abs'], tags: ['bro-split', 'pull', 'core'], relatedTo: ['plank', 'side plank'] }
    | { name: 'plank', variations: ['side', 'front'], equipment: ['bodyweight'], muscleGroups: ['abs'], tags: ['bro-split', 'pull', 'core'], relatedTo: ['ab crunch', 'side plank'] }
    | { name: 'side plank', variations: ['left', 'right'], equipment: ['bodyweight'], muscleGroups: ['abs'], tags: ['bro-split', 'pull', 'core'], relatedTo: ['ab crunch', 'plank'] }
    | { name: 'hip thrust', variations: [], equipment: ['barbell', 'dumbbell'], muscleGroups: ['glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg press', 'squat'] }
    | { name: 'hip abduction', variations: [], equipment: ['machine'], muscleGroups: ['glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg press', 'squat'] }
    | { name: 'hip adduction', variations: [], equipment: ['machine'], muscleGroups: ['glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg press', 'squat'] }
    | { name: 'hip flexion', variations: [], equipment: ['machine'], muscleGroups: ['glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg press', 'squat'] }
    | { name: 'hip extension', variations: [], equipment: ['machine'], muscleGroups: ['glutes'], tags: ['bro-split', 'pull', 'lower-body'], relatedTo: ['leg press', 'squat'] }


