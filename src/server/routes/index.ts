import { Router } from 'express';
import { CityController, PersonController } from './../controllers';

const router = Router();

// TODO: Separate '/cities' and '/people' into const

router.post('/cities', CityController.createValidation, CityController.create);
router.get('/cities', CityController.getAllValidation, CityController.getAll);
router.get('/cities/:id', CityController.getByIdValidation, CityController.getById);
router.put('/cities/:id', CityController.updateByIdValidation, CityController.updateById);
router.delete('/cities/:id', CityController.deleteByIdValidation, CityController.deleteById);

router.post('/people', PersonController.createValidation, PersonController.create);
router.get('/people', PersonController.getAllValidation, PersonController.getAll);
router.get('/people/:id', PersonController.getByIdValidation, PersonController.getById);
router.put('/people/:id', PersonController.updateByIdValidation, PersonController.updateById);
router.delete('/people/:id', PersonController.deleteByIdValidation, PersonController.deleteById);

export { router };
