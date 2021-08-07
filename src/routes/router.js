const { Router } = require('express');
const UserController = require('../controllers/UserController');
const StoryController = require('../controllers/StoryController');
const path = require('path');
const passport = require("passport");
const router = Router();

router.use("/private", passport.authenticate('jwt', {session: false}));

router.get('/users',UserController.index);
router.get('/users/:id',UserController.show);
router.put('/users/:id', UserController.update);
router.post('/users',UserController.create);
router.delete('/users/:id', UserController.destroy);

router.get('/storys',StoryController.index);
router.get('/story/:id',StoryController.show);
router.post('/story',StoryController.create);
router.put('/story/:id', StoryController.update);
router.delete('/story/:id', StoryController.destroy)


module.exports = router;