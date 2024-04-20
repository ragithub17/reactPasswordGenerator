import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*(){}[]";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //useRef hook
  const PasswordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <div
      className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
       text-orange-500 bg-slate-800"
    >
      <h1 className="text-white text-center my-2 font-bold text-xl">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={Password}
          className=" outline-none w-full py-1 px-3 text-sky-500"
          placeholder="Password"
          readOnly
          ref={PasswordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white p-2 text-center font-semibold
           text-2xl shrink-0 hover:bg-blue-900 active:bg-blue-600 transition duration-200 ease-in-out "
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="text-green-400">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label className="text-green-400" htmlFor="numberInput">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label className="text-green-400" htmlFor="numberInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
