"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResources = (numberOfResources) => {
    const resources = [];
    for (let x = 0; x < numberOfResources; x++) {
        resources.push({
            id: x,
            cs: generateRandomCs(),
            ct: 'CFT',
            type: generateRandomType(),
            status: generateRandomStatus(),
            location: getRandomCoordinates(),
            travelTime: '',
            eta: '',
            distance: '',
            station: 'Police Station'
        });
    }
    return resources;
};
const generateRandomCs = () => {
    const cs = [];
    for (let x = 0; x < 6; x++) {
        if (getRandomNumber(2) === 1) {
            cs.push(getRandomNumber(9).toString());
        }
        else {
            cs.push(getLetter(getRandomNumber(26)));
        }
    }
    return cs.join();
};
const generateRandomType = () => {
    switch (getRandomNumber(4)) {
        case 1:
            return 'CID';
        case 2:
            return 'RC';
        case 3:
            return 'PCSO';
        case 4:
            return 'COD';
        default:
            return 'CIS';
    }
};
const generateRandomStatus = () => {
    switch (getRandomNumber(4)) {
        case 1:
            return '05';
        case 2:
            return '02';
        case 3:
            return '06';
        default:
            return 'AS';
    }
};
const getRandomNumber = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber);
};
const getRandomDecimalNumber = (maxNumber) => {
    return Math.random() * maxNumber;
};
const getLetter = (letterOfAlphabet) => {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alphabet[letterOfAlphabet - 1];
};
const getRandomCoordinates = () => {
    // top-left : -10555.636313457067, 6716935.030221752
    // top-right : 9145.48520829907, 6716919.130722704
    // bottom-right : 147.052764543198, 6706485.327070707
    // bottom-left : -10480.990778022326, 6706207.421742284
    const minX = -10555.636313457067;
    const maxX = 9145.48520829907;
    const minY = 6706207.421742284;
    const maxY = 6716919.130722704;
    const differenceX = maxX - minX;
    const differenceY = maxY - minY;
    const x = minX + getRandomDecimalNumber(differenceX);
    const y = minY + getRandomDecimalNumber(differenceY);
    return [x, y];
};
