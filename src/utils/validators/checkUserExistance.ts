import models from "../../models/models";

const checkUserExistance = async (email: string): Promise<Boolean | undefined> => {
    try {
        const user = await models.User.findOne({ email: email});

        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return true;
    }
};

export default checkUserExistance;
