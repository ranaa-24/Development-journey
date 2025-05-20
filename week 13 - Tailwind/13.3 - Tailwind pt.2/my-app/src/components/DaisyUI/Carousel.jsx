import img1 from '../../assets/img1.jpg'; 
import img2 from '../../assets/img2.jpg'; 
import img3 from '../../assets/img3.jpg'; 
import img4 from '../../assets/img4.jpg'; 
import img5 from '../../assets/img5.jpg'; 
import img6 from '../../assets/img6.jpg'; 

function Carousel() {
    return (
        <div className="carousel rounded-box w-96 h-[500px] shadow-[0px_2px_7px_1px_rgba(0,_0,_0,_0.1)]">
            <div className="carousel-item w-full">
                <img
                    src={img1}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
                <img
                    src={img2}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
                <img
                    src={img3}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
                <img
                    src={img4}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
                <img
                    src={img5}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
                <img
                    src={img6}
                    className="w-full"
                    alt="Tailwind CSS Carousel component" />
            </div>
        </div>
    )
}

export default Carousel