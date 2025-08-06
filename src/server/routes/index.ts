import { Router } from 'express';
import { CityController, PeopleController } from './../controllers';

const router = Router();

// TODO: Separate '/cities' into const

router.post('/cities', CityController.createValidation, CityController.create);

router.get('/cities', CityController.getAllValidation, CityController.getAll);

router.get('/cities/:id', CityController.getByIdValidation, CityController.getById);

router.put('/cities/:id', CityController.updateByIdValidation, CityController.updateById);

router.delete('/cities/:id', CityController.deleteByIdValidation, CityController.deleteById);

export { router };
