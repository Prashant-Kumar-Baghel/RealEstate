
const CardSlider=(props)=>{
    const {
        ImageLink,
        areaName,
        Price,
        avgRating,
        Bedrooms,
        Bathrooms
    }=props?.homedata;
    return(
        <>
        <div className="flex flex-col mb-[5vh] border-[5px] border-double border-green-500">
            <div>
                <img className="w-[100%] h-[35vh]"src={ImageLink} alt="Loding...." />
            </div>
            <div className="flex flex-col gap-[20px] px-[20px] bg-white">
                <h3 className="mt-[20px] text-[1.5rem] font-bold">{areaName}</h3>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <strong className="text-[1.2rem]">Bedrooms</strong>
                        <span>{Bedrooms}</span>
                    </div>
                    <div className="flex flex-col">
                        <strong className="text-[1.2rem]">Bathrooms</strong>
                        <span>{Bathrooms}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <strong className="text-[1.2rem]">Rating</strong>
                        <span>{avgRating}</span>
                    </div>
                    <div className="flex flex-col">
                        <strong className="text-[1.2rem]">Sq.footage</strong>
                        <span>{areaName}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                        <strong className="text-[1.2rem]">Price</strong>
                        <span>{Price}</span>
                </div>
            </div>
        </div>
        </>
    )
}
export default CardSlider;