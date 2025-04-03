import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const { courseId } = req.body;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    dao.enrollUserInCourse(currentUser._id, courseId);
    res.sendStatus(201);
  });

  app.delete("/api/enrollments/:courseId", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    dao.unenrollUserFromCourse(currentUser._id, req.params.courseId);
    res.sendStatus(204);
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      userId = currentUser._id;
    }
    const courses = dao.findEnrollmentsForUser(userId);
    res.json(courses);
  });
}
