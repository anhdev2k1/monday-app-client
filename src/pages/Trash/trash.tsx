import React from 'react';
import './trash.scss';
import trashImg from '~/assets/images/trash.jpg';
import ButtonCustom from '~/components/Button/ButtonCustom';
import { StatusType } from '~/shared/model/global';
const Trash = () => {
   return (
      <div className="trash_wrap">
         <div className="trash">
            <div
               className="trash__img"
               style={{
                  backgroundImage: `url(https://cdn.monday.com/images/recycle_bin/empty_state_deleted_3.svg)`,
               }}
            />
            <h2 className="trash__title">Board has been deleted</h2>
            <ButtonCustom
               className="trash__btn"
               statusType={StatusType.Primary}
               title="Back to workspace"
            />
         </div>
      </div>
   );
};

export default Trash;
