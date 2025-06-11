import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';

function Home() {
    const [name, setInput] = useState('');
    const [gender, setGender] = useState('');
    const nevigate = useNavigate();

    function handleClick() {
        if (name == '') {
            toast.warn("Yo! Don't you have a name? ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }
        if (gender === '') {
            toast.warn("Ahh! Choose a relevant gender", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        // a state object is passsed to the redirected route
        nevigate('/prediction', { state: { name: name, gender: gender } });

    }

    return <>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />

        <div className="hero">
            <div className="gradient"></div>
            <div className="container">
                <div className="selection">
                    <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
                        <option value="" selected disabled hidden >Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input type="text" className="input" placeholder='Your Name?' onChange={(e) => setInput(e.target.value)} />
                </div>

                <button className="btn" onClick={handleClick}>Lemme Guess Your Age</button>
            </div>
        </div>

    </>
}



export default Home