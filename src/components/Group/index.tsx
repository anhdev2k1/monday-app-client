import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './group.scss';
import { useRef, useState } from 'react';
import Tippy from '../Tippy';
import { IGroup } from '~/shared/model/group';
import { Dropdown, MenuProps } from 'antd';
import images from '~/assets/svg';
import { useAppDispatch } from '~/config/store';
import { deleteGroup, updateGroup } from './group.reducer';
import Table from './Table/table';
import { handleDelGroup, handleRenameGroup } from '~/pages/Board/board.reducer';
import { isNotification } from '../Notification/notification.reducer';
interface IPropsGroup {
  data: IGroup;
  idBoard?: string;
  position: number;
  numberOfGroup: number;
  // columns?: IColumn[];
  handleAddNewGroup: (position?: number) => Promise<void>;
}
const Group = ({ data, idBoard, numberOfGroup, position, handleAddNewGroup }: IPropsGroup) => {
  const [valueNameInput, setValueNameInput] = useState<string>(data.name);
  const dispatch = useAppDispatch();
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setValueNameInput(value);
  };
  const handleDeleteGroup = (id: string, position: number) => {
    if (numberOfGroup === 1) {
      dispatch(
        isNotification({
          type: 'error',
          message: 'Board has to have at least one group',
          autoClose: 1000,
          isOpen: true,
        }),
      );
    } else {
      dispatch(
        handleDelGroup({
          position,
        }),
      );
      dispatch(
        isNotification({
          type: 'success',
          message: 'Đã xoá group thành công!',
          autoClose: 1000,
          isOpen: true,
        }),
      );
      if (idBoard)
        dispatch(
          deleteGroup({
            idGroup: id,
            idBoard,
          }),
        );
    }
  };

  const inputElement = useRef<HTMLInputElement>(null);
  const { edit, add, move, deleteIcon } = images;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>Add group</span>,
      icon: <img src={add} alt="icon-board" />,
      onClick: () => handleAddNewGroup(position + 1),
    },
    {
      key: '2',
      label: <span>Move to</span>,
      icon: <img src={move} alt="icon-board" />,
      children: [
        {
          key: '2-1',
          label: 'Move to board',
        },
      ],
    },
    {
      key: '3',
      label: <span>Rename group</span>,
      icon: <img src={edit} alt="icon-board" />,
      onClick: () => {
        inputElement.current?.focus();
      },
    },
    {
      key: '4',
      label: <span>Delete group</span>,
      icon: <img src={deleteIcon} alt="icon-board" />,
      onClick: () => {
        handleDeleteGroup(data._id, data.position);
      },
    },
  ];

  const handleRenameInput = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const target = e.target as HTMLInputElement;
    if (target.value !== data.name) {
      await dispatch(
        updateGroup({
          idGroup: data._id,
          name: target.value,
        }),
      );
      // Call API EDIT NAME
      dispatch(
        handleRenameGroup({
          newName: target.value,
          position,
        }),
      );
    }
  };
  return (
    <div className="group">
      <div className="group__head">
        <Dropdown
          overlayStyle={{
            width: '200px',
          }}
          trigger={['click']}
          menu={{ items }}
        >
          <button className="head__btn--option">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </Dropdown>
        <div className="head__input--wrap">
          <Tippy position="top" html={<p>Collapse group</p>}>
            <FontAwesomeIcon className="input--icon" icon={faAngleDown} />
          </Tippy>

          <Tippy position="top" html={<p>Click to edit</p>}>
            <input
              ref={inputElement}
              onChange={(e) => {
                handleChangeValue(e);
              }}
              onBlur={(e) => {
                handleRenameInput(e);
              }}
              className="input__group"
              type="text"
              value={valueNameInput}
            />
          </Tippy>
        </div>
      </div>
      <div className="group__table">
        <Table data={data} idBoard={idBoard} />
      </div>
    </div>
  );
};

export default Group;
