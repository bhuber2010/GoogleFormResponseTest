var express = require('express');
var router = express.Router();
var Airtable = require('airtable');


var base = new Airtable({ apiKey: process.env.AT_KEY }).base('appe1vseq95tiCu8c');

router.get('/', function(req, res) {

  var peeps = {};

  base('Applicants').select({
      // Selecting the first 3 records in All Applicants:
      sort: [{field: "id", direction: "desc"}],
      maxRecords: 1,
      view: "All Applicants"
  }).eachPage(function page(records, fetchNextPage) {

      // This function (`page`) will get called for each page of records.
      records.forEach(function(record) {
          console.log('Retrieved ', record);
          // console.log(record.get('Name'));
          peeps[record.get('Name')] = record;
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(error) {
      if (error) {
          console.log(error);
      }
      res.json({applicants: peeps})
  });

});

router.post('/', function(req, res){
  console.log(req.body);
})

module.exports = router;
