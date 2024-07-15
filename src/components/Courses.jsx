import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://172.25.0.105:8181/api/course/fetchAllCourses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('API response:', data); 

        if (data) {
          setCourses(data);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setCourseId(course.courseId);
    setCourseName(course.courseName);
    setCourseDescription(course.courseDescription);
    setCourseFee(course.courseFee);
    setCourseImage(null); 
    setOpen(true);
  };

  const handleDeleteClick = async (courseId) => {
    try {
      const response = await fetch(`http://172.25.0.105:8181/api/course/deleteCourse/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCourses(courses.filter(course => course.courseId !== courseId));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
    setCourseId("");
    setCourseName("");
    setCourseDescription("");
    setCourseFee("");
    setCourseImage(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("courseName", courseName);
      formData.append("courseDescription", courseDescription);
      formData.append("courseFee", courseFee);
      if (courseImage) {
        formData.append("courseImage", courseImage);
      }

      const url = `http://172.25.0.105:8181/api/course/updateCourse/${courseId}`;
      const method = 'PUT';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);

      setCourses(courses.map(course => (course.courseId === courseId ? data : course)));

      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="courses table">
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Description</TableCell>
              <TableCell>Course Fee</TableCell>
              <TableCell>Course Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Error: {error}</TableCell>
              </TableRow>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell>{course.courseId}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.courseDescription}</TableCell>
                  <TableCell>{course.fee}</TableCell>
                  <TableCell>
                    {course.courseImage && (
                      <img 
                        src={`http://172.25.0.105:8181/api/course/${course.courseImage}`} 
                        alt={course.courseName} 
                        className="w-32 h-32 object-cover" 
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(course)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(course.courseId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No courses available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedCourse ? 'Update the details of the course.' : 'Enter the details of the new course.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="courseId"
            label="Course ID"
            type="text"
            fullWidth
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            disabled={selectedCourse}
          />
          <TextField
            margin="dense"
            id="courseName"
            label="Course Name"
            type="text"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="courseDescription"
            label="Course Description"
            type="text"
            fullWidth
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="courseFee"
            label="Course Fee"
            type="number"
            fullWidth
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
          />
          <TextField
            margin="dense"
            id="courseImage"
            type="file"
            fullWidth
            onChange={(e) => setCourseImage(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Courses;
