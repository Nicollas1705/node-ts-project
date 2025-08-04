import { Router } from 'express';
import { CitiesController, PeopleController } from './../controllers';

const router = Router();

router.post('/cities', CitiesController.createValidation, CitiesController.create);

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);

router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);

router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);

router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);

export { router };
