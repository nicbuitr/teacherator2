import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Teachers = new Mongo.Collection('teachers');
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('teachers', function teachersPublication() {
    return Teachers.find();
  });
}
 
Meteor.methods({
  'teachers.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a teacher
//    if (! Meteor.userId()) {
//      throw new Meteor.Error('not-authorized');
//    }
 
    Teachers.insert({
      text,
      createdAt: new Date(),
      checked: false,
    });
  },
  'teachers.remove'(teacherId) {
    check(teacherId, String);
 
    Teachers.remove(teacherId);
  },
  'teachers.setChecked'(teacherId, setChecked) {
    check(teacherId, String);
    check(setChecked, Boolean);
 
    Teachers.update(teacherId, { $set: { checked: setChecked } });
  },
});