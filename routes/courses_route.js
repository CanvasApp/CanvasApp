'use strict';

module.exports = function(app, jwtauth) {
  var Course = require('../models/courses_model');
  var User = require('../models/user_model');
  var moment = require('moment');

  //creates a course
  app.post('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        var course = new Course({
          name: req.body.name,
          summary: req.body.description.substr(0, 15) + '...',
          schedule: req.body.schedule,
          description: req.body.description,
          code: moment().unix(),
          prereq: [],
          pass: {confirmed: false}
        });
        console.log(user.teacher.confirmed);
        course.save(function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg: 'information not saved'});
          console.log(data);
          res.json({msg: 'course created', code: data.code});
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //gets all of the courses
  app.get('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.teacher.confirmed === true) {
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
  app.post('/api/course', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        Course.findOne({code: req.body.code}, function(err, data) {
          console.log('coursing it up');
          if (err) return res.status(500).send('error.');
          if (!data) return res.send({msg:'course not found'});
          res.json(data);
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //changes class summary and description
  app.put('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (!user) return res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        Course.findOne({code: req.body.code}, function(err, course) {
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
      if (user.teacher.confirmed === true) {
        Course.remove({code: req.body.code}, function(err, data) {
          if (err) return res.status(500).send('error');
          if (!data) return res.send({msg:'error. not deleted'});
          console.log(data);
          res.json({ msg: 'course removed'});
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });
};
