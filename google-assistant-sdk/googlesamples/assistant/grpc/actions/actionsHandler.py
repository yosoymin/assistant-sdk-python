"""Custom actions to contorl Kodi"""

import logging
import socket
import select

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

    @device_handler.command('com.minsoft.actions.PlayMusic')
    def playMusic(artist, album):
        logging.info('Llega reproducir música de %s y %s.', artist, album)

        #create an INET, STREAMing socket
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        #now connect to rattle
        s.connect(("localhost", 9090))

        # Send an Introspect command
        #s.send(b"{\"jsonrpc\": \"2.0\", \"method\": \"JSONRPC.Introspect\", \"id\": 1}")
        s.send(b"{\"jsonrpc\": \"2.0\", \"method\": \"Player.SetPartymode\", \"id\": 1, \"params\": { \"playerid\": 0, \"partymode\": true } }")
        #s.send(b"{\"jsonrpc\": \"2.0\", \"method\": \"Player.GetPlayers\", \"id\": 1, \"params\": { \"media\": \"all\" } }")

        # Print the results
        while True:
            print(s.recv(0x4000))
            if len(select.select([s], [], [], 0)[0]) == 0:
                break;

        # Finished
        s.shutdown(socket.SHUT_RDWR)
        s.close()

    return device_handler
