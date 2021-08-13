import React from "react";
import { connect } from 'react-redux'
import * as courseActions from "../../redux/actions/courseActions"
import * as authorActions from "../../redux/actions/authorActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'

class CoursesPage extends React.Component {
    componentDidMount() {
        const { courses, authors, actions} = this.props
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
    }
    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses}></CourseList>
            </>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mergeAuthorsToCourses(state) {
    if (state.authors.length === 0) {
        return []
    }
    return state.courses.map(course => {
        return {
            ...course,
            authorName: state.authors.find(a => a.id === course.authorId).name
        }
    })
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return { 
        courses: mergeAuthorsToCourses(state),
        authors: state.authors
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
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);