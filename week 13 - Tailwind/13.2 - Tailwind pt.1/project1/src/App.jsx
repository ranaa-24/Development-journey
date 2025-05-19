import { useRef, useState } from "react"

function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef();

  function handleChange(e) {
    let data = e.target.value.trim();
    data != '' ? setIsDisabled(false) : setIsDisabled(true);
  }

  return (
    <header className="h-screen bg-main-bg text-white">
      <div className="container h-screen mx-auto flex justify-center items-center flex-col">
        <div className="logo text-3xl text-center mb-18 red-shadow"><span className="text-primary font-bold">Webiner</span>.gg</div>

        <div className=" p-4 w-sm">
          <h1 className="text-4xl text-center font-bold font-san mb-9">Let's Get Started</h1>

          <form onSubmit={(e) => {
            e.preventDefault();
            alert("Weclome..");
            inputRef.current.value = "";
            setIsDisabled(true);
          }} className="flex flex-col gap-4">
            <input onChange={handleChange} ref={inputRef} type="email" placeholder="Email id" className="bg-secondary/30 px-5 py-2.5 rounded-xl" />
            <Button isDisabled={isDisabled} />
          </form>
        </div>

      </div>
    </header>
  )
}



function Button({ isDisabled }) {
  return <input type="submit" value={"Continue"} placeholder="Continue" disabled={isDisabled} className={`${isDisabled ? "bg-primary-hover cursor-not-allowed" : "bg-primary hover:bg-primary-hover cursor-pointer"} font-bold text-slate-900 px-5 py-2.5 rounded-xl  transition duration-150`} />
}
export default App