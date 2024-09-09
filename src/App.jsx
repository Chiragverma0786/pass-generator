import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, lengthIncrease] = useState("8")
  const [number, numberAllowed] = useState(false)
  const [character, characterAllowed] = useState(false)
  const [password, passwordbtn] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    passwordbtn(pass)
  }, [length, number, character, passwordbtn]
)

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

useEffect( ()=> {
  passwordGenerator()
}, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className='contain'>
        <div className="input">
          <input type="text" 
          value={password}
          readOnly
          ref={passwordRef} />
          <button 
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>

        <div className="main1"><input 
        type="range"
        min={6}
        max={30}
        value={length}
         onChange={(e) => {lengthIncrease(e.target.value)}}
          />
        <fieldset>length {length}</fieldset></div>

        <div className="main2">
          <input 
           type="checkbox"
           defaultChecked={number}
           id="numberInput"
           onChange={() => {
               numberAllowed((prev) => !prev);
           }}
          /> 
        <fieldset>Numerics</fieldset>
        </div>

        <div className="main2">
          <input type="checkbox" 
          defaultChecked={characterAllowed} 
          onChange={()=>{
          characterAllowed((prev)=> !prev)
        }}/><fieldset>Symbols</fieldset></div>
        
      </div>
    </>
  )
}

export default App
