import { CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, LOAD_COURSES_SUCCESS } from "./actionTypes";
import * as courseApi from "../../api/courseApi"
//actions must have types
export function createCourseSuccess(course) {
    return { type: CREATE_COURSE_SUCCESS, course}
}

export function updateCourseSuccess(course) {
    return { type: UPDATE_COURSE_SUCCESS, course}
}

export function loadCourseSuccess(courses) {
    return { type: LOAD_COURSES_SUCCESS, courses}
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi
        .getCourses()
        .then(courses => {
            dispatch(loadCourseSuccess(courses));
        })
        .catch(error => {
            throw error;
        })
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        return courseApi
        .saveCourse(course)
        .then(savedCourse => {
            if (course.id) {
                dispatch(updateCourseSuccess(savedCourse))
            } else {
                dispatch(createCourseSuccess(savedCourse))
            }
        })
    }
}