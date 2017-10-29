/*
 * firebase
 * Convert data to the Firebase version as expected by mobile app
 * It creates three files: fb_schedule.json, fb_sessions.json, fb_speakers.json
 */
'use strict';

var fs = require('fs');
var ent = require('ent');
var YAML = require('yamljs');
var shell = require('shelljs');
var deHtml = function(s) {
  if (s) {
    s = s.replace(/<br>/g, '\n');
    s = s.replace(/<a[- a-zA-Z\"\'=\/:._]*>/g, '');
    s = s.replace(/<\/[a-zA-Z]*>/g, '');
    s = ent.decode(s);
  }
  return s;
};

var src = '_data';
var trg = '.tmp';
// load files from src: speakers.yml, sessions.yml, schedule-data.yml
var speakers = YAML.load(src + '/speakers.yml');
var sessions = YAML.load(src + '/sessions.yml');
var schedule = YAML.load(src + '/schedule.yml');
// give each speaker a unique number
// create output arrays
var i, j, k;
var speakerNum = {};
var speakersOut = [];
var aSpeaker;
var baseImgUrl = 'https://devfest.at/img/';
var baseSpeakerImgUrl = baseImgUrl + 'speakers/';
for (i=0; i<speakers.length; i++) {
  if (!speakers[i].current) continue;
  speakerNum[speakers[i].id] = i+1;
  aSpeaker = {
    'id': i+1,
    'bio': deHtml(speakers[i].bio),
    'company': speakers[i].company,
    'name': speakers[i].name + ' ' + speakers[i].surname,
    'lastname': speakers[i].name,
    'rockstar': !!speakers[i].rockstar,
    'thumbnailUrl': baseSpeakerImgUrl + speakers[i].thumbnailUrl
  }
  if (speakers[i].title && speakers[i].company) {
    aSpeaker.title = speakers[i].title + ', ' + speakers[i].company;
  }
  else if (speakers[i].title) {
    aSpeaker.title = speakers[i].title;
  }
  else {
    aSpeaker.title = speakers[i].company;
  }
  if (speakers[i].social) {
    for (j=0; j<speakers[i].social.length; j++) {
      var aLink = speakers[i].social[j];
      if (aLink.name == "twitter") {
        aSpeaker.twitter = aLink.link.replace(/https?:\/\/w?w?w?.?twitter.com\//, '');
      }
      else if (aLink.name == "google-plus") {
        aSpeaker.gplus = aLink.link;
      }
      else if (aLink.name == "linkedin") {
        aSpeaker.linkedin = aLink.link;
      }
      else if (aLink.name == "github") {
        aSpeaker.github = aLink.link.replace(/https?:\/\/w?w?w?.?github.com\//, '');
      }
      else if (aLink.link.indexOf("xing.com") !== -1) {
        aSpeaker.xing = aLink.link;
      }
      else {
        aSpeaker.website = aLink.link;
      }
    }
  }
  speakersOut[i] = aSpeaker;
}
// create assoc of sessions by id
var sessionsById = {};
for (i=0; i<sessions.length; i++) {
  sessionsById[sessions[i].id] = sessions[i];
}
var x = 1;
var sessionsOut = [];
var scheduleOut = [];
// create output sessions
for (i=0; i<schedule.length; i++) {
  scheduleOut[i] = {}
  scheduleOut[i].date = schedule[i].date;
  scheduleOut[i].dateReadable = schedule[i].dateReadable;
  scheduleOut[i].dateDescription = schedule[i].dateDescription;
  scheduleOut[i].rooms = schedule[i].rooms;
  scheduleOut[i].timeslots = [];
  for (j=0; j<schedule[i].timeslots.length; j++) {
    scheduleOut[i].timeslots[j] = {};
    scheduleOut[i].timeslots[j].starts = schedule[i].timeslots[j].startTime;
    scheduleOut[i].timeslots[j].ends = schedule[i].timeslots[j].endTime;
    scheduleOut[i].timeslots[j].sessions = [];
    for (k=0; k<schedule[i].timeslots[j].sessionIds.length; k++) {
      var sessionId = schedule[i].timeslots[j].sessionIds[k];
      if (sessionId in sessionsById) {
        var aSession = {
          'description': deHtml(sessionsById[sessionId].description),
          'id': x,
          'title': deHtml(sessionsById[sessionId].title),
          'track': sessionsById[sessionId].track
        };
        scheduleOut[i].timeslots[j].sessions.push(x);
        x++;
        // get session image (if exists)
        if ('imageUrl' in sessionsById[sessionId]) {
          aSession.thumbnailUrl = baseImgUrl + sessionsById[sessionId].imageUrl;
        }
        // get the duration
        var date1 = schedule[i].date + ' ' + schedule[i].timeslots[j].startTime;
        var date2 = schedule[i].date + ' ' + schedule[i].timeslots[j].endTime;
        var duration = ((new Date(date2).getTime()) - (new Date(date1).getTime())) / (1000 * 60);
        aSession.startAt = date1;
        aSession.endAt = date2;
        aSession.duration = duration;
        var sessionSpeakers = [];
        if ('speakers' in sessionsById[sessionId]) {
          for (var t=0; t<sessionsById[sessionId].speakers.length; t++) {
            var speakerStrId = sessionsById[sessionId].speakers[t];
            if (speakerStrId in speakerNum) {
              sessionSpeakers.push(speakerNum[speakerStrId]);
            }
          }
        }
        if (sessionSpeakers.length) {
          aSession.speakers = sessionSpeakers;
        }
        // get the room id
        if (schedule[i].timeslots[j].sessionIds.length == 1) {
          if (sessionsById[sessionId].service) {
            // we have a service session
            aSession.roomId = 0;
          }
          else {
            // we have a content session
            aSession.roomId = 1;
          }
        }
        else if (schedule[i].timeslots[j].sessionIds.length == 2) {
          // first session in room 1, second in room 2
          if (k == 0) {
            aSession.roomId = 1;
          }
          else {
            aSession.roomId = 2;
          }
        }
        else {
          aSession.roomId = k + 1;
        }
        // add session
        sessionsOut.push(aSession);
      }
    }
  }
}
// create output schedule

// serialize sessions, schedule & speakers to file
try {
  fs.accessSync(trg);
}
catch(e) {
  // fs.mkdirSync(trg);
  shell.mkdir('-p', trg);
}
fs.writeFileSync(trg + '/fb-speakers.json', JSON.stringify(speakersOut));
fs.writeFileSync(trg + '/fb-sessions.json', JSON.stringify(sessionsOut));
fs.writeFileSync(trg + '/fb-schedule.json', JSON.stringify(scheduleOut));
