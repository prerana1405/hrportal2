import {Router } from 'express';
import { loginUserController,
        registerUserController,
        updatePasswordController,
        updateProfileController,
        verifyEmailTokenController,
} from '../controllers/user.controller.js';



const router = Router();

router.route("/register").post(registerUserController);
router.route('/verify-email').post(verifyEmailTokenController);

router.route("/login").post(loginUserController);

router.route('/updateUserDetail').patch(updateProfileController);
router.route('/updatePassword').patch(updatePasswordController)


export default  router;