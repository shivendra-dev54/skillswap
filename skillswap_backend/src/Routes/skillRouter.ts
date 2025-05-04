import express from "express";
import skillController from "../Controllers/skillController";
import validateTokens from "../Middlewares/validateTokens";

const SkillRouter = express.Router();

// for searching a skill - now using query parameter
SkillRouter.route("/api/skills/get_users").get(validateTokens, skillController.getSkilledUsers);

// for adding new skill
SkillRouter.route("/api/skills/add_skill").post(validateTokens, skillController.addSkill);

// for adding new skill in request section
SkillRouter.route("/api/skills/make_request").post(validateTokens, skillController.makeRequest);

// for removing a skill
SkillRouter.route("/api/skills/remove_skill").delete(validateTokens, skillController.removeSkill);

// for removing a wanted skill
SkillRouter.route("/api/skills/answer_request").post(validateTokens, skillController.answerRequest);

export default SkillRouter;