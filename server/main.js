import { Meteor } from 'meteor/meteor';
import '../imports/api/teachers.js';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MONGO_URL="mongodb://nicbuitr:admin@ds119750.mlab.com:19750/heroku_42vhqtwt";
  console.log(process.env);
});
