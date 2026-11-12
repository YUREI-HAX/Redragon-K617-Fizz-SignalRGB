[README_Redragon_K617_Fizz.md](https://github.com/user-attachments/files/34765260/README_Redragon_K617_Fizz.md)
# Redragon K617 Fizz – SignalRGB Plugin

A custom **SignalRGB per-key RGB Plugin** for the Redragon K617 Fizz keyboard.

The plugin maps the keyboard's 65 keys to SignalRGB LED positions and sends RGB values to the keyboard through its HID feature-report interface.

## Features

- Per-key RGB color control
- 15 × 5 SignalRGB layout
- Custom key names and key positions
- HID device matching using the keyboard's vendor and product IDs
- RGB data sent in the keyboard's LED-slot order

## Device information

| Property | Value |
|---|---|
| Keyboard | Redragon K617 Fizz |
| USB Vendor ID (VID) | `0x258A` |
| USB Product ID (PID) | `0x0049` |
| HID interface | `1` |
| HID usage page | `0xFF00` |
| HID collection | `0x0008` |
| Report size | `382` bytes |
| SignalRGB layout | `15 × 5` |

The plugin validates the HID endpoint using the interface, usage page, and collection values above.

## Repository files

```text
Redragon-K617-Fizz-SignalRGB/
├── Redragon_K617_Fizz.js
├── Redragon_K617_Fizz.png
├── README.md
└── LICENSE
```

- `Redragon_K617_Fizz.js` — SignalRGB keyboard plugin.
- `Redragon_K617_Fizz.png` — keyboard image used by the plugin.

## Installation

1. Download or clone this repository.
2. Copy paste the files to your plugins folder located in `%USERPROFILE%\OneDrive\Documents\WhirlwindFX\Plugins`.
3. Restart SignalRGB if required.
4. Connect the Redragon K617 Fizz and check whether SignalRGB detects it.
5. Test several lighting effects and verify that the colors appear on the correct keys.

**Important:** SignalRGB's custom-device installation paths and requirements can change. Follow the current SignalRGB documentation for the correct location and installation procedure. Do not copy the plugin into an arbitrary folder.

## Technical notes

- The plugin exports the device metadata and layout functions expected by its SignalRGB integration.
- `KEYS` defines the key labels and physical key widths.
- `SLOTS` maps each key to the keyboard's LED matrix slot.
- `buildKeyPositions()` calculates the key sampling positions for the 15 × 5 layout.
- `sendColors()` builds a 382-byte HID report, places RGB values in the mapped LED slots, and sends the report.
- `Initialize()`, `Render()`, and `Shutdown()` control the driver's lifecycle.

The current source uses the following report header:

```js
packet[0] = 0x08;
packet[1] = 0x0A;
packet[2] = 0x7A;
packet[3] = 0x01;
```

## Troubleshooting

- **Keyboard not detected:** Confirm that the connected keyboard exposes the expected VID/PID and HID endpoint information.
- **Plugin loads but lighting does not change:** Check that the correct HID interface is being selected and that the report format matches your keyboard revision.
- **Some keys show the wrong colors:** Review the `SLOTS` mapping and compare it with the physical LED order.
- **Plugin stops working after a SignalRGB update:** Check the current SignalRGB custom-device API and update the driver if necessary.

## Contributions

Issues, corrections to the LED-slot mapping, compatibility reports, and pull requests are welcome.

When reporting a problem, include:
- Your exact keyboard model/revision, if known
- Your SignalRGB version
- Whether the keyboard is detected
- Which keys or lighting behaviors are not working

## Disclaimer

This is an independent community project and is not an official Redragon or SignalRGB release. Redragon and SignalRGB are trademarks of their respective owners.
