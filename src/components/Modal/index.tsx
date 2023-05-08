import React, { useState } from 'react';
import { Modal } from 'antd';
import { Input, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch } from '~/config/store';
import { createWorkSpace } from '~/pages/Workspace/workspace.reducer';
interface IModalBoxProps {
   label: string;
   icon: string;
}

const ModalBox = ({ label, icon }: IModalBoxProps) => {
   const dispatch = useAppDispatch();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [name, setName] = useState('');
   const [form] = useForm();
   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      const data = {
         name,
      };
      const createWorkspace = async () => {
         dispatch(createWorkSpace(data));
      };
      createWorkspace();
      form.resetFields();
      setIsModalOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };
   return (
      <>
         <li onClick={showModal}>
            <span>{label}</span>
         </li>
         <Modal title={label} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
