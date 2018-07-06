"""Custom actions to contorl Kodi"""

import logging

#try:
#    from .. import (
#        device_helpers
#    )
#except (SystemError, ImportError):
import device_helpers

def deviceRequestHandler(device_id):
    device_handler = device_helpers.DeviceRequestHandler(device_id)

    @device_handler.command('action.devices.commands.OnOff')
    def onoff(on):
        if on:
            logging.info('Turning device on')
        else:
            logging.info('Turning device off')

    @device_handler.command('com.example.commands.BlinkLight')
    def blink(speed, number):
        logging.info('Blinking device %s times.' % number)
        delay = 1
        if speed == "slowly":
            delay = 2
        elif speed == "quickly":
            delay = 0.5
        for i in range(int(number)):
            logging.info('Device is blinking.')
            time.sleep(delay)

    @device_handler.command('com.minsoft.actions.PlayMusic')
    def playMusic(artist, album):
        logging.info('Llega reproducir música de %s y %s.', artist, album)

    return device_handler
