import './loadingLogo.scss';
interface ILoadingLogoProps {
   height: string;
}
const LoadingLogo = ({ height }: ILoadingLogoProps) => {
   return (
      <div className="loading__logo" style={{ height: height }}>
         <div className="logo">
            <img src="https://cdn.monday.com/images/loader/loader.gif" alt="" />
         </div>
      </div>
   );
};

export default LoadingLogo;
