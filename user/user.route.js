var router = require("express").Router();
var uploadProfileImage = require("./../middleware/uploadProfileImage");
var userCtrl = require("./user.controller");

router.get("/", userCtrl.getAll);
router.post(
  "/uploadProfileImage",
  uploadProfileImage.single("img"),
  userCtrl.uploadImage
);
router
  .route("/:id")
  .get(userCtrl.getById)
  .put(userCtrl.update)
  .delete(userCtrl.remove);


module.exports = router;
