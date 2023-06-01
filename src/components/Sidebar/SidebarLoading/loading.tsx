import "./loading.scss"
interface ILoadingProps {
    height: string
}
const Loading = ({height}:ILoadingProps) => {
    return ( 
        <>
            <div className="loading__wrapper" style={{height: height}}>
                <div className="loading__swiper"></div>
            </div>
        </>
     );
}
 
export default Loading;