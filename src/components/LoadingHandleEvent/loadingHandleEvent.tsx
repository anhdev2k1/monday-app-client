import icons from '../../assets/images/loading.gif';
const LoadingHandleEvent = () => {
   return (
      <>
         <div
            className="loading__event"
            style={{
               width: '100%',
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <img src={icons} alt="" style={{ width: '100px', height: '100px' }} />
         </div>
      </>
   );
};

export default LoadingHandleEvent;
