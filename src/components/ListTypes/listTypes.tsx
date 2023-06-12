import React from 'react';
import { useAppSelector } from '~/config/store';
import './listTypes.scss';
import ButtonCustom from '../Button/ButtonCustom';
interface IListTypesProps {
  handleAddColumn: (id: string) => void;
  isOpenAddColumn: boolean;
  setIsOpenAddColumn: React.Dispatch<React.SetStateAction<boolean>>;
}
const ListTypes = ({ handleAddColumn, isOpenAddColumn, setIsOpenAddColumn }: IListTypesProps) => {
  const listTypes = useAppSelector((state) => state.listTypesSlice.listTypes.datas);

  return (
    <>
      {isOpenAddColumn && (
        <div className="list__types--custom">
          <ul className="list__types">
            {listTypes &&
              listTypes.map((typeItem) => {
                return (
                  <li className="type__item" key={typeItem._id}>
                    <ButtonCustom
                      leftIcon={
                        <img
                          className="list__types-icon"
                          src={typeItem.icon}
                          style={{
                            backgroundColor: `${typeItem.color}`,
                          }}
                          alt="icon"
                        />
                      }
                      title={typeItem.name}
                      onClick={() => handleAddColumn(typeItem._id)}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default ListTypes;
