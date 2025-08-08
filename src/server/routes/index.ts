import { Router } from 'express';
import { CityController, PersonController, UserController } from './../controllers';
import { ensureAuth } from '../shared/middleware';

const router = Router();

// TODO: Separate '/cities' and '/people' into const

router.get('/', (_, res) => res.send('Hello!'));

router.post('/cities', ensureAuth, CityController.createValidation, CityController.create);
router.get('/cities', ensureAuth, CityController.getAllValidation, CityController.getAll);
router.get('/cities/:id', ensureAuth, CityController.getByIdValidation, CityController.getById);
router.put('/cities/:id', ensureAuth, CityController.updateByIdValidation, CityController.updateById);
router.delete('/cities/:id', ensureAuth, CityController.deleteByIdValidation, CityController.deleteById);

router.post('/people', ensureAuth, PersonController.createValidation, PersonController.create);
router.get('/people', ensureAuth, PersonController.getAllValidation, PersonController.getAll);
router.get('/people/:id', ensureAuth, PersonController.getByIdValidation, PersonController.getById);
router.put('/people/:id', ensureAuth, PersonController.updateByIdValidation, PersonController.updateById);
router.delete('/people/:id', ensureAuth, PersonController.deleteByIdValidation, PersonController.deleteById);

router.post('/sign-in', UserController.signInValidation, UserController.signIn);
router.post('/register', UserController.signUpValidation, UserController.signUp);

export { router };
