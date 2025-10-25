import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRef, useEffect } from "react";

const App = () => {
  const zpRef = useRef(null);
  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "react_" + userID;
  const appID = 2080698290;
  const serverSecret = "07b7d831d8e7514a60eea9b1609131c9";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter callee's userID"),
      userName: prompt("Enter callee's userName"),
    };
    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType,
      timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
    })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return <div className=" w-full h-screen bg-linear-to-b from-[#312f39] to-black flex items-center justify-center">

    <div className="w-[500px] h-[400px] bg-[#0d1014] border-2 border-gray-500 flex flex-col items-center justify-center gap-3">

      <h2 className="text-white text-[20px]"><span className=" text-blue-500">UserName:</span>{userName}</h2>
       <h2 className="text-white text-[20px]"><span className=" text-blue-500">UserId:</span>{userID}</h2>

       <button type="button" className="w-[200px] h-[30px] bg-white cursor-pointer  text-black rounded-2xl text-[20px]" onClick={()=> invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}> Voice call</button>

       <button type="button" className="w-[200px] h-[30px] bg-white cursor-pointer  text-black rounded-2xl text-[20px]" onClick={()=> invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}> Video call</button>
    </div>
  </div>;
};

export default App;
