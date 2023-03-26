import * as interfaces from '../../interfaces/interfaces';
import models from '../../models/models';

const getUser = async (payload: interfaces.IPayload): Promise<interfaces.IUser | null> => {
    const id = payload.id;

    const user = await models.User.findById(id);

    return user;
};

export default getUser;
