import { CREATE_COURSE } from "./actionTypes";

//actions must have types
export function createCourse(course) {
    return { type: CREATE_COURSE, course}
}