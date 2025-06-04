import { useContext, useEffect, useState } from "react"
import { FileContext } from "../contexts/FileProvider"
import { baseImgUrl } from "../utils/baseImageUrl";
import Downloadicon from "../utils/Downloadicon";


function ImagePreview() {
    const [imageUrl, setImageUrl] = useState<string>(baseImgUrl);
    const { file, loading, enhanced } = useContext(FileContext);

    // showing the uploaded image, generating a url when ever file changes 
    useEffect(() => {
        const objUrl = file ? URL.createObjectURL(file) : baseImgUrl;
        setImageUrl(objUrl);

    }, [file, setImageUrl])


    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = enhanced;
        link.download = `Enhanced-${file?.name}`;
        link.click();
    }

    return (
        <div className="w-full sm:w-[95%] bg-secondary-paint/20 h-[250px] sm:h-[400px] rounded-2xl flex flex-col justify-center items-center relative">
            {loading ?
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-600  animate-bounce [animation-delay:.2s]"></div>
                    <div className="w-4 h-4 rounded-full bg-green-600  animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-green-600  animate-bounce [animation-delay:.4s]"></div>
                </div>

                :
                <figure className="diff aspect-4/3 h-full w-full rounded-2xl" tabIndex={0}>
                    <div className="diff-item-1" role="img" tabIndex={0}>
                        <img alt="daisy" className={`${enhanced == baseImgUrl && "blur-[1px]"}`} src={imageUrl} />
                    </div>
                    <div className="diff-item-2" role="img">
                        <img
                            alt="daisy"
                            src={enhanced} />
                    </div>
                    <div className="diff-resizer "></div>
                </figure>
            }

           <div className={`absolute z-10 bottom-3 right-3 ${enhanced != baseImgUrl && !loading ? "block" : "hidden"}`} onClick={handleDownload}>
            <Downloadicon/>
           </div>
        </div>
    )
}

export default ImagePreview

