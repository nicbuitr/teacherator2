import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Teachers = new Mongo.Collection('teachers');
 
if (Meteor.isServer) {
  // This code only runs on the server
    Meteor.publish('teachers', function teachersPublication() {
        return Teachers.find();
    });
}
 
Meteor.methods({
    'teachers.addReview'(teacherId, review) {
 
        Teachers.update(teacherId, { $push: { reviews: review } });
    },

    'teachers.deleteReview'(teacherId, review) {
 
        Teachers.update(teacherId, { $pop: { reviews: review } });
    },
});