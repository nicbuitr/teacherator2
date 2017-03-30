import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Teachers = new Mongo.Collection('teachers');
 
if (Meteor.isServer) {
  // This code only runs on the server

  /** Me parece muy chevere esto, sin embargo no se si sea apropiado darle absolutamente todos los profesotes al cleinte.
  Es decir, si hay un millón de profesores el cliente deberia sincronizarlos todos?
**/
    Meteor.publish('teachers', function teachersPublication() {
        return Teachers.find();
    });
}
 
Meteor.methods({
    'teachers.addReview'(teacherId, review) {
 
 /**
 Esta cehvere que cada review se agregue a la lista existente
 **/
        Teachers.update(teacherId, { $push: { reviews: review } });
    },

    'teachers.deleteReview'(teacherId, review) {
 
        Teachers.update(teacherId, { $pop: { reviews: review } });
    },
});