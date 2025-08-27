import { matchingService } from "../service/matchService.js";

export const matchingController = async(req, res) => {
    try{
        const userId = req.user._id;
        const matches = await matchingService(userId); 

        if(matches.error){
            res.status(400).json({message: matches.error});
        }

        return res.status(200).json({
            message: 'matching users found', 
            matches
        });
    }
    catch(error){
        console.log('error in matching', error); 
    }
}