import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import male from '../assets/male.jpg'
import female from '../assets/female.jpg'
import Loader from './Loader';
import { ToastContainer, toast, Bounce } from 'react-toastify';


function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function Prediction() {
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state?.name || '';
    const gender = location.state?.gender || '';

    if (name === '' || gender === '') navigate('/');

    const URL = `https://api.agify.io?name=${name}`;
    const { data, isLoading } = useFetch(URL);

    return (
        <>
            <div className="hero">
                <div className="gradient"></div>
                <div className="container">
                    {isLoading ? <h3>{<Loader />} Lemme take a look.. </h3> : <Content name={name} gender={gender} data={data} />}
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
            />
        </>
    )
}

function Content({ gender, name, data }) {
    const naviagte = useNavigate();

    const handleMiracle = () => {
        toast('🦄 Thats the Power of our AI model', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setTimeout(() => {
            naviagte('/');
        }, 5000);
    }

    const handleBullshit = () => {
        toast("🧑🏿 Opsie! we're just predicting a random age", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setTimeout(() => {
            naviagte('/');
        }, 5000);
    }

    return <>
        <div className="userPrediction">
            <div className="img" style={{
                backgroundImage: `url(${gender == 'male' ? male : female})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>
            <div className="text">
                <div className="greet">Hi, <span style={{ color: gender === 'female' ? '#FFC1DA' : '#A0C878' }}>{capitalizeFirstLetter(name)}</span></div>
                <div className="age">Are you {data.age} years old?</div>
            </div>
        </div>
        <div className="conformation">
            <button onClick={handleMiracle} className='btn flex'>Miracle 🎉</button>
            <button onClick={handleBullshit} className='btn flex secondary-btn'>Bullsh!t</button>
        </div>
    </>
}


export default Prediction

// male and femmale has the image path
// src = {male}

// const location = useLocation();
//     const name = location.state?.name || '';
//     const gender = location.state?.gender || '';
