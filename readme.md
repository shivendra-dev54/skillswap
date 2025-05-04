
# SkillSwap
A web app where students can teach and learn from each other. For example, someone good at Python can teach it in exchange for learning design from someone else.

---
---

# Techstack

## Frontend
```
- React  
- Tailwind CSS  
- React Router  
- TypeScript  
```

## Backend
```
- Node.js  
- Express.js  
- MongoDB  
- Auth.js  
```

---
---

# API endpoints

```
- Auth
    - /api/auth/sign_up     // for new account reg
    - /api/auth/sign_in     // for login
    - /api/auth/current     // for info about logged in user

- Skills
    - /api/skills/get_users?skillName=skill     // for requesting users with particular skill
    - /api/skills/add_skill                     // for adding new skill to profile
    - /api/skills/want_skill                    // for adding skill to wishlist
    - /api/skills/remove_skill                  // for removing skill from profile
    - /api/skills/remove_skill_wanted           // for removing skill from wishlist
```
