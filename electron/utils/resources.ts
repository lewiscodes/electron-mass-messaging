import { IResource } from "../../globalTypes/resources";

const minX = -10555.636313457067;
const maxX = 9145.48520829907;
const minY = 6706207.421742284;
const maxY = 6716919.130722704;

export const generateResources = (numberOfResources: number): IResource[] => {
    const resources: IResource[] = [];

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
}

export const moveResources = (resources: IResource[]): IResource[] => {
    return resources.map(resource => {
        return {
            ...resource,
            location: randomlyMoveLocation(resource.location)
        }
    });
}

const randomlyMoveLocation = (currentLocation: number[]): number[] => {
    const xOrYCoordinate = getRandomNumber(2); // 1 = x, 2 = y
    const plusOrMinus = getRandomNumber(2); // 1 = plus, 2 = minus
    let x = currentLocation[0];
    let y = currentLocation[1];

    if (xOrYCoordinate === 1) {
        x = plusOrMinus === 1 ? x + 50 : x - 50
    } else {
        y = plusOrMinus === 1 ? y + 50 : y - 50;
    }

    return [x, y];
}

const generateRandomCs = (): string => {
    const cs: string[] = [];

    for (let x = 0; x < 6; x++) {
        if (getRandomNumber(2) === 1) {
            cs.push(getRandomNumber(9).toString());
        } else {
            cs.push(getLetter(getRandomNumber(26)));
        }
    }

    return cs.join('');
}

const generateRandomType = (): string => {
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
}

const generateRandomStatus = (): string => {
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
}

const getRandomNumber = (maxNumber: number): number => {
    return Math.floor(Math.random() * maxNumber);
}

const getRandomDecimalNumber = (maxNumber: number) => {
    return Math.random() * maxNumber;
}

const getLetter = (letterOfAlphabet: number): string => {
    const alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alphabet[letterOfAlphabet - 1];
};

const getRandomCoordinates = (): number[] => {
    // top-left : -10555.636313457067, 6716935.030221752
    // top-right : 9145.48520829907, 6716919.130722704
    // bottom-right : 147.052764543198, 6706485.327070707
    // bottom-left : -10480.990778022326, 6706207.421742284
    const differenceX = maxX - minX;
    const differenceY = maxY - minY;
    const x = minX + getRandomDecimalNumber(differenceX);
    const y = minY + getRandomDecimalNumber(differenceY);
    return [x, y];
}