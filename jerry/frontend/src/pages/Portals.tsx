import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CityInfo } from "@/widgets/CityInfo"
import { Button } from "@/shared/ui"
import clsx from "clsx"

export function PortalsPage() {
  const API_URL = "wss://jerry.sus.kz/ws"
  // const API_URL = "ws://localhost:8420/ws"

  const configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  }

  const offerOptions: RTCOfferOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  } as const

  const selfCamRef = useRef<HTMLVideoElement>(null)
  const [startButtonDisabled, setStartButtonDisabled] = useState(false)
  // const [callButtonDisabled, setCallButtonDisabled] = useState(true)
  // const [hangupButtonDisabled, setHangupButtonDisabled] = useState(true)
  const [webSocket, setWebSocket] = useState<WebSocket>()
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [peerConnectionMap, setPeerConnectionMap] = useState(new Map())
  const [remoteStreamMap, setRemoteStreamMap] = useState(new Map())

  const start = async () => {
    setStartButtonDisabled(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
      if (!selfCamRef.current) return

      selfCamRef.current.srcObject = stream
      setLocalStream(stream)
      // setCallButtonDisabled(false)

      call()
    } catch (e) {
      // alert(`getUserMedia() error: ${e.name}`)
    }
  }

  // function createPeerConnection() {
  //   const pc = new RTCPeerConnection(configuration)
  //   // Any required set up...
  //   return pc
  // }
  async function offer(id: number) {
    const pc = new RTCPeerConnection(configuration)
    // const pc = createPeerConnection()

    pc.oniceconnectionstatechange = () =>
      console.log("Ice connection state", pc.iceConnectionState)

    pc.onicecandidate = (event) => {
      if (!webSocket) {
        console.warn("No websocket connection")
        return
      }

      webSocket.send(
        JSON.stringify({ typ: 3, receiver_id: id, data: event.candidate }),
      )
    }
    pc.ontrack = (event) => {
      setRemoteStreamMap(
        (remoteStreamMap) => new Map(remoteStreamMap.set(id, event.streams[0])),
      )
    }

    if (localStream) {
      await localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream))
      const d = await pc.createOffer(offerOptions)
      await pc.setLocalDescription(d)
      setPeerConnectionMap(new Map(peerConnectionMap.set(id, pc)))

      return d
    }
  }

  async function answer(id: string, offerDesc: RTCSessionDescriptionInit) {
    // const pc = createPeerConnection()
    const pc = new RTCPeerConnection(configuration)

    pc.oniceconnectionstatechange = () =>
      console.log("Ice connection state", pc.iceConnectionState)
    pc.onicecandidate = (event) => {
      if (!webSocket) {
        console.warn("No websocket connection")
        return
      }
      webSocket.send(
        JSON.stringify({ typ: 3, receiver_id: id, data: event.candidate }),
      )
    }
    pc.ontrack = (event) => {
      setRemoteStreamMap(
        (remoteStreamMap) => new Map(remoteStreamMap.set(id, event.streams[0])),
      )
    }

    if (localStream) {
      await localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream))

      await pc.setRemoteDescription(offerDesc)
      const d = await pc.createAnswer(offerOptions)
      await pc.setLocalDescription(d)
      setPeerConnectionMap(new Map(peerConnectionMap.set(id, pc)))

      return d
    }
  }

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = async function (evt) {
        const { typ, sender_id, data } = JSON.parse(evt.data)

        switch (typ) {
          case 0: {
            const desc = await offer(sender_id)
            webSocket.send(
              JSON.stringify({ typ: 1, receiver_id: sender_id, data: desc }),
            )
            break
          }
          case 1: {
            const desc = await answer(sender_id, data)
            webSocket.send(
              JSON.stringify({ typ: 2, receiver_id: sender_id, data: desc }),
            )
            break
          }
          case 2:
            updateLocal(sender_id, data)
            break
          case 3:
            updateCandidate(sender_id, data)
            break
          case 4:
            closePC(sender_id)
            break
          default:
            console.log("Invalid message type", typ)
        }
      }
    }
  }, [webSocket])

  const updateLocal = (
    id: string,
    desc: RTCSessionDescriptionInit | RTCSessionDescription,
  ) => {
    const pc = peerConnectionMap.get(id)
    if (pc === undefined || pc === null) {
      console.log("Invalid pc", desc)
      return
    }
    pc.setRemoteDescription(desc)
  }

  const updateCandidate = (
    id: string,
    candidate: RTCPeerConnectionIceEvent["candidate"],
  ) => {
    const pc = peerConnectionMap.get(id)
    if (pc === undefined || pc === null) {
      return
    }

    pc.addIceCandidate(candidate)
  }

  const closePC = (id: string) => {
    const pc = peerConnectionMap.get(id)
    if (pc === undefined || pc === null) {
      return
    }

    pc.close()
    peerConnectionMap.delete(id)
  }

  const call = () => {
    // setCallButtonDisabled(true)
    // setHangupButtonDisabled(false)

    const conn = new WebSocket(API_URL)

    conn.onclose = function () {
      console.log("WebSocket connection closed")
    }

    setWebSocket(conn)
  }

  const hangup = () => {
    peerConnectionMap.forEach((pc) => pc.close())
    setPeerConnectionMap(new Map())

    if (webSocket) {
      webSocket.close()
    }

    // setHangupButtonDisabled(true)
    // setCallButtonDisabled(false)
    setStartButtonDisabled(false)

    if (!selfCamRef.current) return
    selfCamRef.current.srcObject = null
  }

  return (
    <>
      <div className="h-screen bg-black text-white p-4">
        <CityInfo />
        <motion.main
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="animate-background relative inline-block h-[85svh] mt-4 rounded-lg w-full bg-white from-blue-700 via-red-500 to-yellow-500 bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] bg-gradient-to-r">
            <div className="flex bg-black h-full justify-center w-full text-white rounded-lg">
              <video
                className={clsx("rounded-lg object-cover", [
                  [
                    [...remoteStreamMap.entries()].length === 0
                      ? "w-full"
                      : "w-48 h-auto absolute bottom-4 right-4",
                  ],
                ])}
                ref={selfCamRef}
                playsInline
                autoPlay
                muted
              />
              <div className="grid grid-flow-row-dense w-full gap-4 auto-rows-min">
                {[...remoteStreamMap.entries()].map(([id, stream]) => (
                  <video
                    key={id}
                    autoPlay
                    className="object-cover w-full h-screen"
                    ref={(videoRef) => {
                      if (videoRef && videoRef.srcObject !== stream) {
                        videoRef.srcObject = stream
                      }
                    }}
                  />
                ))}
              </div>
              <div className="absolute bottom-6">
                {!startButtonDisabled && (
                  <Button
                    color="primary"
                    onClick={start}
                    disabled={startButtonDisabled}
                    className="btn"
                  >
                    Подключиться
                  </Button>
                )}
                {startButtonDisabled && (
                  <Button color="error" onClick={hangup} className="btn">
                    Отключиться
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </>
  )
}
