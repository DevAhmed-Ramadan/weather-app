import Loader from "../Loader/Loader"


const LoaderPage = () => {
    return (
        <div className="absolute flex justify-center items-center bg-black left-0 right-0 bottom-0 top-0 z-10">
            <Loader />
        </div>
    )
}

export default LoaderPage