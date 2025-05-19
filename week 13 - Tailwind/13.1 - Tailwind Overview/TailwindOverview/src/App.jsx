function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-amber-200 p-[12px] flex flex-col rounded-[6px] w-sm">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="xyz@gmail.com" className="bg-gray-100 px-2 py-1 w-full"/>

        <label htmlFor="pass" className="mt-4 ">Password</label>
        <input type="password" name="password" className="bg-gray-100 px-2 py-1 round mb-4" id="pass" />

        <input type="submit" value="Login" className="bg-rose-200 w-1/2 m-auto py-1 font-bold rounded-lg border-1 border-amber-50"/>
      </form>
    </div>
  )
}

export default App