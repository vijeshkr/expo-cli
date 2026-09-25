import axios from "axios"

export type LikeAction = 'like' | 'unlike';

export const likeButtonApi = async (action: LikeAction) => {
    try {
        const response = await axios.post(`https://questions.greatfrontend.com/api/questions/like-button`, { action });
        return response;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}