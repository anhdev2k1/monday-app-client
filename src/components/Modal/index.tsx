import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Input, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from '~/config/store';
import { createWorkSpace } from '~/pages/Workspace/workspace.reducer';
import { createBoard } from '~/pages/Board/board.reducer';
import { useParams } from 'react-router-dom';
import './modal.scss';
interface IModalBoxProps {
   label: string;
   icon: string;
   cate?: 'workspace' | 'board';
}

const ModalBox = ({ label, icon, cate }: IModalBoxProps) => {
   const dispatch = useAppDispatch();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [name, setName] = useState('');
   const { idWorkSpace } = useParams();
   const [messageApi, contextHolder] = message.useMessage();
   const [form] = useForm();
   const messageBoard = useAppSelector((state) => state.boardSlice.currBoard.status);
   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      const data = {
         name,
      };
      const createWorkspace = () => {
         if (cate === 'workspace') {
            dispatch(createWorkSpace(data));
         }
         if (idWorkSpace) {
            dispatch(createBoard({ idWorkspace: idWorkSpace, name }));
         }
      };
      console.log(messageBoard);
      
      createWorkspace();
      form.resetFields();
      setIsModalOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };
   return (
      <>
         {contextHolder}
         <li onClick={showModal}>
            <span>{label}</span>
         </li>
         <Modal
            title={label}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className="modal__wrapper"
         >
            <Form layout="vertical">
               <Form.Item label="Type name">
                  <Input placeholder="Type..." onChange={(e) => setName(e.target.value)} />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default ModalBox;
