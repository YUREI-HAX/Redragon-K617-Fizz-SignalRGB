/*
 * Redragon K617 Fizz
 * SignalRGB per-key RGB driver
 *
 * VID: 0x258A
 * PID: 0x0049
 * Vendor HID interface: 1
 * Feature report: 382 bytes
 */

const WIDTH = 15;
const HEIGHT = 5;
const REPORT_SIZE = 382;
const ROW_LENGTHS = [14, 14, 13, 12, 8];

// K617 key order, left to right and top to bottom. Widths are in key units.
const KEYS = [
    // Row 0
    ["Esc",1], ["1",1], ["2",1], ["3",1],
    ["4",1], ["5",1], ["6",1], ["7",1],
    ["8",1], ["9",1], ["0",1], ["-",1],
    ["=",1], ["Backspace",2],

    // Row 1
    ["Tab",1.5], ["Q",1], ["W",1], ["E",1],
    ["R",1], ["T",1], ["Y",1], ["U",1],
    ["I",1], ["O",1], ["P",1], ["[",1],
    ["]",1], ["\\",1.5],

    // Row 2
    ["Caps Lock",1.75], ["A",1], ["S",1], ["D",1],
    ["F",1], ["G",1], ["H",1], ["J",1],
    ["K",1], ["L",1], [";",1], ["'",1],
    ["Enter",2.25],

    // Row 3
    ["Left Shift",2.25], ["Z",1], ["X",1], ["C",1],
    ["V",1], ["B",1], ["N",1], ["M",1],
    [",",1], [".",1], ["/",1], ["Right Shift",2.75],

    // Row 4
    ["Left Ctrl",1.25], ["Left Win",1.25],
    ["Left Alt",1.25], ["Space",6.25],
    ["Right Alt",1.25], ["Fn",1.25],
    ["Menu",1.25], ["Right Ctrl",1.25]
];

// K617 key index -> Sinodragon LED matrix slot.
const SLOTS = [
    1,7,13,19,25,31,37,43,49,55,61,67,73,79,
    2,8,14,20,26,32,38,44,50,56,62,68,74,80,
    3,9,15,21,27,33,39,45,51,57,63,69,81,
    4,10,16,22,28,34,40,46,52,58,64,82,
    5,11,17,35,53,59,77,83
];

let initialized = false;

function buildKeyPositions() {
    const positions = [];
    let keyIndex = 0;

    for (let row = 0; row < ROW_LENGTHS.length; row++) {
        let col = 0;
        for (let i = 0; i < ROW_LENGTHS[row]; i++) {
            const key = KEYS[keyIndex++];
            // SignalRGB's device.color() samples integer pixel coordinates.
            positions.push([Math.floor(col + key[1] / 2), row]);
            col += key[1];
        }
    }

    return positions;
}

const KEY_POSITIONS = buildKeyPositions();

export function Name() { return "Redragon K617 Fizz"; }
export function Image() { return "Redragon_K617_Fizz.png"; }
export function Publisher() { return "Custom K617 Driver"; }
export function VendorId() { return 0x258A; }
export function ProductId() { return 0x0049; }
export function Type() { return "hid"; }
export function DeviceType() { return "keyboard"; }

export function Validate(endpoint) {
    return endpoint.interface === 1 &&
           endpoint.usage_page === 0xFF00 &&
           endpoint.collection === 0x0008;
}

export function Size() { return [WIDTH, HEIGHT]; }
export function LedNames() { return KEYS.map(key => key[0]); }
export function LedPositions() { return KEY_POSITIONS; }

function sendColors() {
    // 4-byte report header followed by RGB values in the device's LED-slot order.
    const packet = new Array(REPORT_SIZE).fill(0);
    packet[0] = 0x08;
    packet[1] = 0x0A;
    packet[2] = 0x7A;
    packet[3] = 0x01;

    for (let i = 0; i < KEYS.length; i++) {
        const position = KEY_POSITIONS[i];
        const color = device.color(position[0], position[1]);
        const offset = 4 + SLOTS[i] * 3;

        // device.color() returns [red, green, blue], not an object.
        packet[offset] = color[0];
        packet[offset + 1] = color[1];
        packet[offset + 2] = color[2];
    }

    device.send_report(packet, REPORT_SIZE);
}

export function Initialize() {
    initialized = true;
}

export function Render() {
    if (initialized) sendColors();
}

export function Shutdown() {
    initialized = false;
}










