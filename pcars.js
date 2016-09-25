'use strict';

var PCARS = PCARS || {};

const ENCODING = 'utf8';

PCARS.PacketType = function(buffer) {

    if (this instanceof PCARS.PacketType) {
        this.PacketType = buffer.readUInt8(2) & 0x3;
    } else {
        return new PCARS.PacketType(buffer);
    }

};

PCARS.Telemetry = function(buffer) {

    if (this instanceof PCARS.Telemetry) {

        this.BuildVersionNumber = buffer.readUInt16LE(0);
        this.PacketType = buffer.readUInt8(2) & 0x3;

        // Game states
        this.GameSessionState = buffer.readUInt8(3);

        this.GameState = this.GameSessionState & 0x07;
        this.SessionState = (this.GameSessionState & 0x38) >> 2;

        // Participant info
        this.ViewedParticipantIndex = buffer.readInt8(4);
        this.NumParticipants = buffer.readInt8(5);

        // Unfiltered input
        this.UnfilteredThrottle = buffer.readUInt8(6);
        this.UnfilteredBrake = buffer.readUInt8(7);
        this.UnfilteredSteering = buffer.readInt8(8);
        this.UnfilteredClutch = buffer.readUInt8(9);
        this.RaceStateFlags = buffer.readUInt8(10);

        // Event information
        this.LapsInEvent = buffer.readUInt8(11);

        // Timings
        this.BestLapTime = buffer.readFloatLE(12);
        this.LastLapTime = buffer.readFloatLE(16);
        this.CurrentTime = buffer.readFloatLE(20);
        this.SplitTimeAhead = buffer.readFloatLE(24);
        this.SplitTimeBehind = buffer.readFloatLE(28);
        this.SplitTime = buffer.readFloatLE(32);
        this.EventTimeRemaining = buffer.readFloatLE(36);
        this.PersonalFastestLapTime = buffer.readFloatLE(40);
        this.WorldFastestLapTime = buffer.readFloatLE(44);
        this.CurrentSector1Time = buffer.readFloatLE(48);
        this.CurrentSector2Time = buffer.readFloatLE(52);
        this.CurrentSector3Time = buffer.readFloatLE(56);
        this.FastestSector1Time = buffer.readFloatLE(60);
        this.FastestSector2Time = buffer.readFloatLE(64);
        this.FastestSector3Time = buffer.readFloatLE(68);
        this.PersonalFastestSector1Time = buffer.readFloatLE(72);
        this.PersonalFastestSector2Time = buffer.readFloatLE(76);
        this.PersonalFastestSector3Time = buffer.readFloatLE(80);
        this.WorldFastestSector1Time = buffer.readFloatLE(84);
        this.WorldFastestSector2Time = buffer.readFloatLE(88);
        this.WorldFastestSector3Time = buffer.readFloatLE(92);

        this.JoyPad = buffer.readUInt16LE(96);

        // Flags
        this.HighestFlag = buffer.readUInt8(98);

        // Pit info
        this.PitModeSchedule = buffer.readUInt8(99);

        // Car state
        this.OilTempCelsius = buffer.readInt16LE(100);
        this.OilPressureKPa = buffer.readUInt16LE(102);
        this.WaterTempCelsius = buffer.readInt16LE(104);
        this.WaterPressureKPa = buffer.readUInt16LE(106);
        this.FuelPressureKPa = buffer.readUInt16LE(108);
        this.CarFlags = buffer.readUInt8(110);
        this.FuelCapacity = buffer.readUInt8(111);
        this.Brake = buffer.readUInt8(112);
        this.Throttle = buffer.readUInt8(113);
        this.Clutch = buffer.readUInt8(114);
        this.Steering = buffer.readInt8(115);
        this.FuelLevel = buffer.readFloatLE(116);
        this.Speed = buffer.readFloatLE(120);
        this.Rpm = buffer.readUInt16LE(124);
        this.MaxRpm = buffer.readUInt16LE(126);
        var gearNumGears = buffer.readUInt8(128);
        this.Gear = gearNumGears & 0xf;
        this.NumGears = gearNumGears >> 4;
        this.BoostAmount = buffer.readUInt8(129);
        this.EnforcedPitStopLap = buffer.readInt8(130);
        this.CrashState = buffer.readUInt8(131);
        this.OdometerKM = buffer.readFloatLE(132);
        this.Orientation = [
            buffer.slice(136, 140).readFloatLE(0),
            buffer.slice(140, 144).readFloatLE(0),
            buffer.slice(144, 148).readFloatLE(0)
        ];
        this.LocalVelocity = [
            buffer.slice(148, 152).readFloatLE(0),
            buffer.slice(152, 156).readFloatLE(0),
            buffer.slice(156, 160).readFloatLE(0)
        ];
        this.WorldVelocity = [
            buffer.slice(160, 164).readFloatLE(0),
            buffer.slice(164, 168).readFloatLE(0),
            buffer.slice(168, 172).readFloatLE(0)
        ];
        this.AngularVelocity = [
            buffer.slice(172, 176).readFloatLE(0),
            buffer.slice(176, 180).readFloatLE(0),
            buffer.slice(180, 184).readFloatLE(0)
        ];
        this.LocalAcceleration = [
            buffer.slice(184, 188).readFloatLE(0),
            buffer.slice(188, 192).readFloatLE(0),
            buffer.slice(192, 196).readFloatLE(0)
        ];
        this.WorldAcceleration = [
            buffer.slice(196, 200).readFloatLE(0),
            buffer.slice(200, 204).readFloatLE(0),
            buffer.slice(204, 208).readFloatLE(0)
        ];
        this.ExtentsCentre = [
            buffer.slice(208, 212).readFloatLE(0),
            buffer.slice(212, 216).readFloatLE(0),
            buffer.slice(216, 220).readFloatLE(0)
        ];

        // Wheels / Tyres
        this.TyreFlags = [
            buffer.slice(220, 221).readUInt8(0),
            buffer.slice(221, 222).readUInt8(0),
            buffer.slice(222, 223).readUInt8(0),
            buffer.slice(223, 224).readUInt8(0)
        ];
        this.Terrain = [
            buffer.slice(224, 225).readUInt8(0),
            buffer.slice(225, 226).readUInt8(0),
            buffer.slice(226, 227).readUInt8(0),
            buffer.slice(227, 228).readUInt8(0)
        ];
        this.TyreY = [
            buffer.slice(228, 232).readFloatLE(0),
            buffer.slice(232, 236).readFloatLE(0),
            buffer.slice(236, 240).readFloatLE(0),
            buffer.slice(240, 244).readFloatLE(0)
        ];
        this.TyreRPS = [
            buffer.slice(244, 248).readFloatLE(0),
            buffer.slice(248, 252).readFloatLE(0),
            buffer.slice(252, 256).readFloatLE(0),
            buffer.slice(256, 260).readFloatLE(0)
        ];
        this.TyreSlipSpeed = [
            buffer.slice(260, 264).readFloatLE(0),
            buffer.slice(264, 268).readFloatLE(0),
            buffer.slice(268, 272).readFloatLE(0),
            buffer.slice(272, 276).readFloatLE(0)
        ];
        this.TyreTemp = [
            buffer.slice(276, 277).readUInt8(0),
            buffer.slice(277, 278).readUInt8(0),
            buffer.slice(278, 279).readUInt8(0),
            buffer.slice(279, 280).readUInt8(0)
        ];
        this.TyreGrip = [
            buffer.slice(280, 281).readUInt8(0),
            buffer.slice(281, 282).readUInt8(0),
            buffer.slice(282, 283).readUInt8(0),
            buffer.slice(283, 284).readUInt8(0)
        ];
        /*
        u8    sTyreFlags[4];                // 220
        u8    sTerrain[4];                  // 224
        f32   sTyreY[4];                    // 228
        f32   sTyreRPS[4];                  // 244
        f32   sTyreSlipSpeed[4];            // 260
        u8    sTyreTemp[4];                 // 276
        u8    sTyreGrip[4];                 // 280
        f32   sTyreHeightAboveGround[4];    // 284
        f32   sTyreLateralStiffness[4];     // 300
        u8    sTyreWear[4];                 // 316
        u8    sBrakeDamage[4];              // 320
        u8    sSuspensionDamage[4];         // 324
        s16   sBrakeTempCelsius[4];         // 328
        u16   sTyreTreadTemp[4];            // 336
        u16   sTyreLayerTemp[4];            // 344
        u16   sTyreCarcassTemp[4];          // 352
        u16   sTyreRimTemp[4];              // 360
        u16   sTyreInternalAirTemp[4];      // 368
        f32   sWheelLocalPositionY[4];      // 376
        f32   sRideHeight[4];               // 392
        f32   sSuspensionTravel[4];         // 408
        f32   sSuspensionVelocity[4];       // 424
        u16   sAirPressure[4];              // 440
        */

        // Weather
        this.AmbientTemperature = buffer.readInt8(458);
        this.TrackTemperature = buffer.readInt8(459);
        this.RainDensity = buffer.readUInt8(460);
        this.WindSpeed = buffer.readInt8(461);
        this.WindDirectionX = buffer.readInt8(462);
        this.WindDirectionY = buffer.readInt8(463);


        var participants = buffer.slice(464, 1360);

        var i, tempArray = [], chunk = 16, offset;

        for (i = 0;  i < 56; i++) {
            offset = i * chunk;

            tempArray.push( new PCARS.ParticipantInfo( participants.slice(offset, offset+chunk) ) );
        }

        this.ParticipantInfo = tempArray;

        // sParticipantInfo sParticipantInfo[56];  // 464
        // 56*16=896

        // array van 56 length ParticipantInfo objecten, elk 16 lang
        // buffer.slice()
        // buffer.copy()
        // buffer.entries()
        // buffer.keys()

        this.TrackLength = buffer.readFloatLE(1360);
        //u8    sWings[2];                    // 1364
        this.DPad = buffer.readUInt8(1366);

    } else {
        return new PCARS.Telemetry(buffer);
    }

};

PCARS.ParticipantInfo = function(buffer) {

    if (this instanceof PCARS.ParticipantInfo) {

        this.WorldPosition = [
            buffer.readInt16LE(0),
            buffer.readInt16LE(2),
            buffer.readInt16LE(4)
        ];
        this.CurrentLapDistance = buffer.readUInt16LE(6);
        //
        this.RacePositionRaw = buffer.readUInt8(8);
        this.isActive = (this.RacePositionRaw & 0x80) >> 7;
        this.RacePosition = this.RacePositionRaw & 0x7F;
        //
        this.LapsCompletedRaw = buffer.readUInt8(9);
        this.LapInvalidated = (this.LapsCompletedRaw & 0x80) >> 7;
        this.LapsCompleted = this.LapsCompletedRaw & 0x7F;
        this.CurrentLap = buffer.readUInt8(10);
        //
        this.SectorRaw = buffer.readUInt8(11);
        this.ClassSameAsPlayer = (this.SectorRaw & 0x08) > 0;
        this.Sector = this.SectorRaw & 0x07;
        this.LastSectorTime = buffer.readFloatLE(12);

    } else {
        return new PCARS.ParticipantInfo(buffer);
    }

};

PCARS.ParticipantInfoStrings = function(buffer) {

    if (this instanceof PCARS.ParticipantInfoStrings) {

        this.BuildVersionNumber = buffer.readUInt16LE(0);
        this.PacketType = buffer.readUInt8(2) & 0x3;
        this.CarName = buffer.toString(ENCODING, 3, 64).replace(/\0/g, '');
        this.CarClassName = buffer.toString(ENCODING, 67, 131).replace(/\0/g, '');
        this.TrackLocation = buffer.toString(ENCODING, 131, 195).replace(/\0/g, '');
        this.TrackVariation = buffer.toString(ENCODING, 195, 259).replace(/\0/g, '');

        var names = buffer.slice(259, 1283);
        var i, tempArray = [], chunk = 64, offset;

        for (i = 0;  i < 16; i++) {
            offset = i * chunk;
            tempArray.push(names.slice(offset, offset+chunk).toString(ENCODING, 0, 64).replace(/\0/g, ''));
        }

        this.Names = tempArray;

        var times = buffer.slice(1283, 1347);
        tempArray = []; chunk = 4; offset = null;

        for (i = 0; i < 16; i++) {
            offset = i * chunk;
            tempArray.push(times.slice(offset, offset+chunk).readFloatLE(0));
        }

        this.FastestLapTimes = tempArray;

    } else {
        return new PCARS.ParticipantInfoStrings(buffer);
    }

};

PCARS.ParticipantInfoStringsAdditional = function(buffer) {

    if (this instanceof PCARS.ParticipantInfoStringsAdditional) {

        this.BuildVersionNumber = buffer.readUInt16LE(0);
        this.PacketType = buffer.readUInt8(2) & 0x3;
        this.Offset = buffer.readUInt8(3);

        var names = buffer.slice(4, 1028);
        var i, tempArray = [], chunk = 64, offset;

        for (i = 0;  i < 16; i++) {
            offset = i * chunk;
            tempArray.push(names.slice(offset, offset+chunk).toString(ENCODING, 0, 64).replace(/\0/g, ''));
        }

        this.Names = tempArray;

    } else {
        return new PCARS.ParticipantInfoStringsAdditional(buffer);
    }
};

exports.PCARS = PCARS;