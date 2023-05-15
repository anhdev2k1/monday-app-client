import React, { useState, useEffect } from 'react';
import './group.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ResizableBox from '../Resizable';
import { IColumn } from '~/shared/model/column';
import ListType from '../ListTypes/listTypes';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '~/config/store';
import { message } from 'antd';

interface IPropsHeaderTable {
   columns: IColumn[];
}
const HeaderTable = ({ columns }: IPropsHeaderTable) => {
   const [isOpenListTypes, setIsOpenListTypes] = useState<boolean>(false);
   const { idBoard } = useParams();
   const [listColumn, setListColumn] = useState<IColumn[]>([]);
   const [messageApi, contextHolder] = message.useMessage();
   useEffect(() => {
      setListColumn(columns);
   }, [columns]);
   const handleAddColumn= (id:string) => {
      const addColumn = async () => {
         try {
            messageApi.loading('Đợi xý nhé...!');
            const res = await axios.post(`http://localhost:3001/v1/api/board/${idBoard}/column`, {
               typeId: id,
               position: columns.length + 1,
            });
            messageApi.success(`Thêm mới column ${res.data.metadata.column.name} thành công!`);
            setListColumn((pre) => [...pre, res.data.metadata.column]);
         } catch (error) {
            messageApi.error(`${error}`);
         }
      };
      addColumn();
   };
   return (
      <ul className="cols__group">
         {contextHolder}
         <li className="col__group__item">
            <label htmlFor="checked"></label>
            <input type="checkbox" id="checked" />
         </li>
         <ResizableBox id={'0'}>
            <span>Item</span>
         </ResizableBox>
         {listColumn.map((col, index) => {
            return (
               <ResizableBox key={col._id} id={col._id}>
                  <span>{col.name}</span>
               </ResizableBox>
            );
         })}
         <li className="col__group__item">
            <input className="col__group--check" type="checkbox" id="plus--col" />
            <label className="plus__lable" htmlFor="plus--col">
               <div className="input--icon" onClick={() => {
                     setIsOpenListTypes((prev) => !prev);
                  }}>
                  <FontAwesomeIcon icon={faPlus} />
                  {isOpenListTypes && <ListType handleAddColumn={handleAddColumn}  />}
               </div>
            </label>
         </li>
      </ul>
   );
};

export default HeaderTable;
