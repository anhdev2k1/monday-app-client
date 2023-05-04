import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Input, Form } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/services/redux/store';
import { useForm } from 'antd/es/form/Form';
import { renameWorkspace } from '~/services/redux/features/updateWorkspace';
interface IModalBoxProps {
   label: string;
   icon: string;
}

const ModalBox = ({ label, icon }: IModalBoxProps) => {
   const dispatch = useDispatch();
   const getToken = useSelector((state: RootState) => state.infoToken.token);
   const id = useSelector((state: RootState) => state.user._id);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [name, setName] = useState('');
   const [dataWorkspace, setDataWorkspace] = useState<any>({});
   const [form] = useForm();
   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      const data = {
         name,
      };
      const createWorkspace = async () => {
         const res = await axios({
            method: 'POST',
            url: 'http://localhost:3001/v1/api/workspace',
            data,
            headers: {
               'Content-Type': 'application/json',
               'x-client-id': `${id}`,
               Authorization: `Bearer ${getToken}`,
            },
         });
         dispatch(renameWorkspace(res.data.metadata.workspace.name));
         setDataWorkspace(res.data.metadata.workspace);
         localStorage.setItem('idWorkspace', JSON.stringify(res.data.metadata.workspace._id));
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
