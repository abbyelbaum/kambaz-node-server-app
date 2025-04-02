import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const {enrollments}  = Database;
    enrollments.push({_id: uuidv4(), user: userId, course: courseId});
}

export function unenrollUserFromCourse(userId, courseId) {
    Database.enrollments = Database.enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
}

export function findEnrollmentsForUser(userId) {
    const { enrollments, courses } = Database;
    return courses.filter(course => 
      enrollments.some(enrollment => enrollment.user === userId && enrollment.course === course._id)
    );
  }