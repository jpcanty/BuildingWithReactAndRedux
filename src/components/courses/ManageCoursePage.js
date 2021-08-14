import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import * as courseActions from "../../redux/actions/courseActions"
import * as authorActions from "../../redux/actions/authorActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'

const ManageCoursePage = ({ courses, authors, actions, ...props }) => {
    const [course, setCourse] = useState({...props.course})
    const [errors, setErrors] = useState({...props.errors})
    useEffect( () => {
        if (courses.length === 0) {
            actions.courses.loadCourses().catch(error => {
                alert("Loading courses failed " + error)
            })
        }
        if (authors.length === 0) {
            actions.authors.loadAuthors().catch(error => {
                alert("Loading authors failed " + error)
            })
        }
    //useEffect with an empty array is equivalent to componentDidMount
    //Otherwise, would run everytime it renders
    }, [])
    return <CourseForm course={course} errors={errors} authors={authors}></CourseForm>
    
}

ManageCoursePage
.propTypes = {
    course: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return {
        //newCourse is an empty course
        courses: state.courses,
        authors: state.authors,
        course: newCourse,
        errors: []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            courses: bindActionCreators(courseActions, dispatch),
            authors: bindActionCreators(authorActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage
    );