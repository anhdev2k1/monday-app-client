import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import './column.scss';
import { Dropdown, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '~/config/store';
import images from '~/assets/svg';
import { useParams } from 'react-router-dom';
import { IDeleteColumn, deleteColumn, editColumn } from '../MainTable/mainTable.reducer';
import { handleDelColumnAndValueTask, handleEditColumn } from '~/pages/Board/board.reducer';
import { IColumn } from '~/shared/model/column';
interface IPropsColumn {
   col: IColumn;
   position: number;
   handleAddColumn: (id: string, position?: number) => Promise<void>;
}

interface IHandleDeleteColumn extends IDeleteColumn {
   position: number;
}

const Column = ({ col, position, handleAddColumn }: IPropsColumn) => {
   const [isEditInput, setIsEditInput] = useState<boolean>(false);
   const listTypes = useAppSelector((state) => state.listTypesSlice.listTypes.datas);
   //    const dataCreateCol = useAppSelector((state) => state.columnSlice.createColumn.data);
   //    const statusDeleteCol = useAppSelector((state) => state.columnSlice.deleteColumn.status);
   const { edit, deleteIcon, add } = images;
   const inputElement = useRef<HTMLInputElement>(null);
   const { idBoard } = useParams();
   const dispatch = useAppDispatch();
   // const [valueInput, setValueInput] = useState<string>(name);

   const handleDeleteColumn = async ({ idBoard, idColumn, position }: IHandleDeleteColumn) => {
      await dispatch(
         deleteColumn({
            idBoard,
            idColumn,
         }),
      );

      dispatch(
         handleDelColumnAndValueTask({
            position,
         }),
      );
      // const newArr = listColumns.filter((column) => column._id !== _id);
      // //          console.log(newArr);

      // dispatch(deleteColumnMainTable(newArr));
   };

   const handleEditNameCol = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const target = e.target as HTMLInputElement;
      if (target.value !== col.name) {
         dispatch(
            editColumn({
               idColumn: col._id,
               name: target.value,
            }),
         );
         dispatch(
            handleEditColumn({
               idColumn: col._id,
               key: 'name',
               value: target.value,
            }),
         );
      }
   };

   const items: MenuProps['items'] = [
      {
         key: '1',
         label: <span>Add colunm to the right</span>,
         icon: <img src={add} alt="icon-board" />,
         //    onClick: handleAddNewGroup,
         children: listTypes?.map((item, index) => {
            return {
               key: `2-${index}`,
               label: item.name,
               icon: (
                  <img
                     style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: item.color,
                     }}
                     src={item.icon}
                     alt="dropdow--icon"
                  />
               ),
               onClick: () => handleAddColumn(item._id, position + 1),
            };
         }),
      },
      //   {
      //      key: '2',
      //      label: <span>Move to</span>,
      //      //    icon: <img src={move} alt="icon-board" />,
      //      children: [
      //         {
      //            key: '2-1',
      //            label: 'Move to board',
      //         },
      //      ],
      //   },
      {
         key: '2',
         label: <span>Rename column</span>,
         icon: <img src={edit} alt="icon-board" />,
         onClick: () => {
            setIsEditInput(true);
            inputElement.current?.focus();
            console.log(inputElement.current);
         },
      },
      {
         key: '3',
         label: <span>Delete column</span>,
         icon: <img src={deleteIcon} alt="icon-board" />,
         onClick: () => {
            if (idBoard)
               handleDeleteColumn({
                  idColumn: col._id,
                  idBoard,
                  position,
               });
         },
      },
   ];

   return (
      <th className="column__group">
         {isEditInput ? (
            <input
               className="col__item--input"
               ref={inputElement}
               autoFocus
               onBlur={(e) => {
                  if (e.target.value && e.target.value !== col.name) {
                     handleEditNameCol(e);
                  }
                  setIsEditInput(false);
               }}
               type="text"
               onChange={(e) => {}}
               defaultValue={col.name}
            />
         ) : (
            <span
               onClick={() => {
                  setIsEditInput(true);
               }}
            >
               {col.name}
            </span>
         )}
         {!isEditInput && (
            <Dropdown
               placement="bottomRight"
               overlayStyle={{
                  width: 'auto',
               }}
               trigger={['click']}
               menu={{ items }}
            >
               <button className="btn__option--col">
                  <FontAwesomeIcon icon={faEllipsis} />
               </button>
            </Dropdown>
         )}
      </th>
   );
};

export default Column;
