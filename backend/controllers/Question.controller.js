import { Question } from "../models/Question.model.js";

export const questionSearch= async(req, res) =>{
    // try{
    //     const {title} = req.body;
    //     const ques = Anagram.find({title});

    //     if(!ques) {
    //         return res.status(404).json({
    //             message:"Question not found",
    //             success:false
    //         })
    //     }

    //     return res.status(200).json({
    //         message:"Question found",
    //         success:true,
    //         ques
    //     })

    //     } catch (error) {
    //         console.log("Error getting profile: ", error.message);
    //     }

    try {
        const allQues = await Question.find();
        return res.status(200).json({
            message:"Got all Question",
            success: true,
            allQues
        })
    } catch (error) {
        console.log("getAllQues error: "+error);
    }

};
