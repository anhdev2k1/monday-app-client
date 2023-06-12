import releaseImg from '../../assets/images/release.png';
import './release.scss'
const ReleaseSoon = () => {
  return (
    <div className="release__container" onClick={(e) => e.stopPropagation()}>
      <img src={releaseImg} alt="" />
      <p className="release__container-desc">
        This feature will be available in the next version soon!
      </p>
    </div>
  );
};

export default ReleaseSoon;
