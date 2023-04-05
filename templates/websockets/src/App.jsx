import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button, Header } from "./components";
import "./App.css";

function App() {
  const wsUrl = import.meta.env["VITE_AMPT_WS_URL"];
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    () =>
      sendMessage(
        JSON.stringify({
          task: "start",
        })
      ),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      <div className="App">
        <Header text={`WebSocket Status: ${connectionStatus}`} />
        <h1 className="text-3xl font-bold">Welcome to Ampt WebSockets!</h1>
        <div style={{ height: "30px" }} />
        <div style={{ flex: 1, flexDirection: "column" }}>
          <Button text="Start Async Process" onPress={handleClickSendMessage} />
          <div style={{ height: "30px" }} />
          <h1 className="text-2xl font-bold underline">Received Messages</h1>
          {messageHistory.map((message, idx) => (
            <p key={idx} className="text-2xl ...">
              {message ? message.data : null}
            </p>
          ))}
        </div>
        <Header top={false} text={`Connected to ${wsUrl}`} />
      </div>
    </>
  );
}

export default App;
