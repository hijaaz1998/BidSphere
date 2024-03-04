import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const Room = () => {
    const {roomLink} = useParams()

    if(!roomLink){
        return <div>...Loading</div>
    }

    const myMeeting = async (element: any) => {
        const appID = 1430145188;
        const serverSecret = "9cf866644c73e72fb7dd45eea0e6e502";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomLink, Date.now().toString(), "Hijaaz")

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:5173/room/${roomLink}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            }
        })
    }

  return (
    <div>
        <div ref={myMeeting} />
        {/* Room {roomLink} */}
    </div>
  )
}

export default Room