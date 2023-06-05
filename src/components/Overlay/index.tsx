import React from 'react';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { IChildrenComponentProps } from '~/shared/model/global';
// import { resetSelectLabel } from '../SelectLabel/SelectLabel.reducer';
import './overlay.scss';
import { setDisplayOverlay } from './overlay.reducer';
import { setTaskToDisplay } from '~/pages/Board/board.reducer';
// import { setDisplayOverlay } from './overlay.reducer';
const Overlay: React.FC<IChildrenComponentProps> = () => {
   const dispatch = useAppDispatch();
   const ChildrenItem = useAppSelector((state) => state.overlaySlice.children);
   const isDisplayOverlay = useAppSelector((state) => state.overlaySlice.isDisplay);
   const handleHideOverlay = () => {
      dispatch(
         setDisplayOverlay({
            isDisplay: false,
            children: <></>,
         }),
      );
      dispatch(
         setTaskToDisplay({
            task: undefined,
         }),
      );
   };
   return (
      <>
         {isDisplayOverlay ? (
            <div onClick={handleHideOverlay} className="overlay">
               <div className="overlay__wrappChildren">{ChildrenItem}</div>
            </div>
         ) : null}
      </>
   );
};

export default Overlay;
