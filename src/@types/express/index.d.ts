export {};

declare global {
	namespace Express {
		interface Request {

            userId: string;
            exerciseId?: string;
            yearId?: string;
            monthId?: string;
            weekId?: string;
            dayId?: string;


            year?: number;
            month?: number;
            week?: number;
            day?: number;



		}
	}
}
