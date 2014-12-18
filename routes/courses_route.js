'use strict';

module.exports = function(app, jwtauth) {
  var Course = require('../models/courses_model');
  var User = require('../models/user_model');
  var Enrollment = require('../models/enrollment_model');
  var UniqueId = require('../lib/uid');

  //creates a course
  app.post('/api/courseenrollment', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.userStatus.admin === true) {
        var course = new Course({
          name: req.body.name,
          summary: req.body.description.substr(0, 15) + '...',
          schedule: req.body.schedule,
          description: req.body.description,
          code: UniqueId()
        });
        var enrollment = new Enrollment({
          enrollment:{code: course.code}
        });
        enrollment.save(function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'enrollment did not save'});
          console.log(data);
        });
        course.save(function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'course did not save'});
          console.log(data);
          res.json({msg: 'course created', code: data.code, data: data});
        });
      } else {
        res.json({msg: 'not an admin'});
      }
    });
  });

  //gets all of the courses
  app.get('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.userStatus.teacher === true) {
        Course.find(function(err, data) {
          console.log('getting all of the courses');
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'did not get all courses'});
          res.json(data);
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //gets just one course
  app.get('/api/course/:code', jwtauth, function(req, res) {
    Course.findOne({code: req.params.code}, function(err, data) {
      console.log('coursing it up');
      if (err) return res.status(500).send('error.');
      if (!data) return res.send({msg:'course not found'});
      res.json(data);
    });
  });

  //changes class summary and description
  app.put('/api/courses/:code', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.userStatus.teacher === true) {
        Course.findOne({code: req.params.code}, function(err, course) {
          if (err) return res.status(500).send('error');
          if (!course) return res.send({msg: 'course not found'});
          console.log(course);
          course.name = req.body.name;
          course.schedule = req.body.schedule;
          course.description = req.body.description;
          course.save(function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.status({msg:'error.  not updated'});
          console.log(data);
          res.json({msg: 'course updated'});
        });
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //deletes a course
  app.delete('/api/course', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.userStatus.admin === true) {
        Course.remove({code: req.body.code}, function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg:'error. not deleted'});
          res.json({ msg: 'course removed'});
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });
};
