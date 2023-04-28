import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Input, Form } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '~/services/redux/store';
import Notification from '../Notification';
interface IModalBoxProps {
   label: string;
   icon: string;
}

const ModalBox = ({ label, icon }: IModalBoxProps) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [name, setName] = useState('');
   const [dataWorkspace, setDataWorkspace] = useState<any>({})
   const getToken = JSON.parse(localStorage.getItem("token")!)
   const user = useSelector((state: RootState) => state.user.user)
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
               'x-client-id':`${user._id}`,
               'Authorization': `Bearer ${getToken}`
            },
         });
         if(res.data.status === 'success'){
            <Notification info='success' description = 'Bạn đã tạo thành công workspace' placement='topRight'/>
         }else{
            <Notification info='error' description = 'Đã có lỗi xảy ra!!' placement='topRight'/>
         }
         setDataWorkspace(res.data.metadata)
         localStorage.setItem("idWorkspace",JSON.stringify(dataWorkspace._id))
      };
      createWorkspace();
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
