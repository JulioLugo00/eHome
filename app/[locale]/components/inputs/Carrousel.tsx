'use-client';

interface InputEditProps{
    image: string;
}

const Carrousel: React.FC<InputEditProps> = ({
   image
}) => {
    return(
        <div className="flex flex-row  overflow-x-hidden justify-between items-center">
            <div className="carousel-container flex-none">
                <div className="carousel-content flex">
                    <div className="carousel-item w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="carousel-item w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="carousel-item w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="carousel-item w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="carousel-item w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <div onClick={() => {}} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 underline transition cursor-pointer">
                Edit
            </div>
        </div>
    )
}

export default Carrousel;


        {/* <div className="scroll-arrow">
        <button id="scrollRightBtn" className="bg-gray-300 text-gray-600 px-2 py-1 ml-2">→</button>
        </div>
        </div>
        
        <div className={'flex overflow-x-scroll'}>
            <div className="flex-none w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-none w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-none w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-none w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-none w-64 h-40 bg-gray-200 mr-4">
                        <img src={image} alt="Imagen 1" className="w-full h-full object-cover"/>
            </div>
        </div> */}