'use strict';

var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var PCARS = require('./pcars').PCARS;

const PORT = 5606;

var PacketTypeEnum = {
    TELEMETRY_DATA: 0,
    PARTICIPANT_INFO_STRINGS: 1,
    PARTICIPANT_INFO_STRING_ADDITIONAL: 2
};

// Tyres
var TyresEnum = {
    TYRE_FRONT_LEFT: 0,
    TYRE_FRONT_RIGHT: 1,
    TYRE_REAR_LEFT: 2,
    TYRE_REAR_RIGH: 3,
    TYRE_MAX: 4
};

// Vector
var VectorEnum = {
    VEC_X: 0,
    VEC_Y: 1,
    VEC_Z: 2,
    VEC_MAX: 3
};

// GameState
var GameStateEnum = {
    GAME_EXITED: 0,
    GAME_FRONT_END: 1,
    GAME_INGAME_PLAYING: 2,
    GAME_INGAME_PAUSED: 3,
    GAME_INGAME_RESTARTING: 4,
    GAME_INGAME_REPLAY: 5,
    GAME_FRONT_END_REPLAY: 6,
    GAME_MAX: 7
};

// SessionState
var SessionStateEnum = {
    SESSION_INVALID: 0,
    SESSION_PRACTICE: 1,
    SESSION_TEST: 2,
    SESSION_QUALIFY: 3,
    SESSION_FORMATION_LAP: 4,
    SESSION_RACE: 5,
    SESSION_TIME_ATTACK: 6,
    SESSION_MAX: 7
};

// RaceState
var RaceStateEnum = {
    RACESTATE_INVALID: 0,
    RACESTATE_NOT_STARTED: 1,
    RACESTATE_RACING: 2,
    RACESTATE_FINISHED: 3,
    RACESTATE_DISQUALIFIED: 4,
    RACESTATE_RETIRED:5 ,
    RACESTATE_DNF: 6,
    RACESTATE_MAX: 7
};

// CurrentSector
var CurrentSectorEnum = {
    SECTOR_INVALID: 0,
    SECTOR_START: 1,
    SECTOR_SECTOR1: 2,
    SECTOR_SECTOR2: 3,
    SECTOR_FINISH: 4,
    SECTOR_STOP: 5,
    SECTOR_MAX: 6
};

// FlagColours
var FlagColourEnum = {
    FLAG_COLOUR_NONE: 0,
    FLAG_COLOUR_GREEN: 1,
    FLAG_COLOUR_BLUE: 2,
    FLAG_COLOUR_WHITE: 3,
    FLAG_COLOUR_YELLOW: 4,
    FLAG_COLOUR_DOUBLE_YELLOW: 5,
    FLAG_COLOUR_BLACK: 6,
    FLAG_COLOUR_CHEQUERED: 7,
    FLAG_COLOUR_MAX: 8
};

// FlagReason
var FlagReasonEnum = {
    FLAG_REASON_NONE: 0,
    FLAG_REASON_SOLO_CRASH: 1,
    FLAG_REASON_VEHICLE_CRASH: 2,
    FLAG_REASON_VEHICLE_OBSTRUCTION: 3,
    FLAG_REASON_MAX: 4
};

// PitMode
var PitModeEnum = {
    PIT_MODE_NONE: 0,
    PIT_MODE_DRIVING_INTO_PITS: 1,
    PIT_MODE_IN_PIT: 2,
    PIT_MODE_DRIVING_OUT_OF_PITS: 3,
    PIT_MODE_IN_GARAGE: 4,
    PIT_MODE_MAX: 5
};

// Pit Stop Schedule
var PitScheduleEnum = {
    PIT_SCHEDULE_NONE: 0,
    PIT_SCHEDULE_STANDARD: 1,
    PIT_SCHEDULE_DRIVE_THROUGH: 2,
    PIT_SCHEDULE_STOP_GO: 3,
    PIT_SCHEDULE_MAX: 4
};

socket.on('error', function(error) {
    console.log('error', error);
});

socket.on('message', function(message) {

    if(Buffer.isBuffer(message)) {

        var packetType = new PCARS.PacketType(message).PacketType;

        switch (packetType) {

            // TelemetryData
            case PacketTypeEnum.TELEMETRY_DATA:

                var telemetryData = new PCARS.Telemetry(message);
                //console.log(telemetryData);

                //console.log('RPM [MAX]: ' + telemetryData.Rpm + '['+ telemetryData.MaxRpm + '] => ' + Math.floor((telemetryData.Rpm/telemetryData.MaxRpm) * 100) + '%');
                console.log('SPEED [KPH]: ' + Math.floor(telemetryData.Speed * 3.6));
                console.log('GEAR: ' + telemetryData.Gear);
                console.log('NUMGEARS: ' + telemetryData.NumGears);
                console.log('POS: ' + telemetryData.ParticipantInfo[0].RacePosition + '/' + telemetryData.NumParticipants);
                console.log('LAP: ' + telemetryData.ParticipantInfo[0].CurrentLap + '/' + telemetryData.LapsInEvent);
                //console.log('participant info ' + JSON.stringify(telemetryData.ParticipantInfo[telemetryData.ViewedParticipantIndex]));

                break;

            // ParticipantInfoStrings
            case PacketTypeEnum.PARTICIPANT_INFO_STRINGS:

                var participantInfoStrings = new PCARS.ParticipantInfoStrings(message);
                console.log(participantInfoStrings);
                break;

            // ParticipantInfoStringsAdditional
            case PacketTypeEnum.PARTICIPANT_INFO_STRING_ADDITIONAL:

                var participantInfoStringsAdditional = new PCARS.ParticipantInfoStringsAdditional(message);
                console.log(participantInfoStringsAdditional);
                break;

            default:
                console.log(message);
        }
    }

});

socket.on('listening', function() {
    var address = socket.address();
    console.log('listening on ' + address.address + ':' + address.port);
});

socket.on('connected', function() {
    console.log('connected');
});

socket.bind(PORT);