import ImagePreview from "./ImagePreview"
import ImageUpload from "./ImageUpload"
import SparkleText from "./Heading-Text"
import { FileProvider } from "../contexts/FileProvider"

function Main() {
    
    return (
        <FileProvider>
            <div>
                <main className="min-h-screen w-full bg-gray-100 flex justify-center items-center flex-col py-4 px-2 lg:px-4">
                    <div className="mb-6">
                        <span><SparkleText /></span>
                    </div>

                    <div className="bg-white min-w-2xs sm:w-md md:w-2xl lg:w-3xl px-4 py-4 sm:px-8 sm:py-6 max-w-6xl
                 rounded-2xl grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 shadow-sm animate-fade animate-once">
                        <ImageUpload />
                        <ImagePreview />
                    </div>
                </main>
            </div>
        </FileProvider>
    )
}

export default Main