import model from "./model.js";

export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 const courses = enrollments.filter(e => e.course !== null).map((enrollment) => enrollment.course);
 console.log(courses, courses.length, userId);
 return courses
}
export async function findUsersForCourse(courseId) {
  console.log(courseId)
 const enrollments = await model.find({ course: courseId }).populate("user");
 const users = enrollments.filter(e => e.user !== null).map((enrollment) => enrollment.user);
 console.log(users, users.length)
 return users
}
export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  console.log(newEnrollment)
  return model.create(newEnrollment);
 }
 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 

 export function findAllEnrollments() {
  return model.find();
 }



// export function findEnrollmentsForUser(userId) {
//     const { enrollments, courses } = Database;
//     return courses.filter(course => 
//       enrollments.some(enrollment => enrollment.user === userId && enrollment.course === course._id)
//     );
// }
