import ButtonCustom from '../Button/ButtonCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './headView.scss';
import {
   faAngleDown,
   faEyeSlash,
   faFilter,
   faMagnifyingGlass,
   faSort,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '../Tippy';
import { StatusType } from '~/shared/model/global';
import { Select } from 'antd';
import uniqid from 'uniqid';
import icons from '../../assets/svg/index';
import { useState } from 'react';
import { useAppSelector } from '~/config/store';
import { Option } from 'antd/es/mentions';

interface IFilterItem {
   id: string;
}
const HeadView = () => {
   const newListColumn: any[] = [];
   const [listFilter, setListFilter] = useState<IFilterItem[]>([]);
   const [selectColumn, setSelectColumn] = useState('');
   const listColumn = useAppSelector((state) => state.boardSlice.currBoard.data?.columns);
   const [selectCondition, setSelectCondition] = useState('')
   const [selectValue, setSelectValue] = useState('')
   const [selectCase, setSelectCase] = useState('')
   listColumn!.map((item) => {
      const newItem = {
         label: item.name,
         belongType: item.belongType,
         value: item.name,
      };
      newListColumn.push(newItem);
   });

   const handleChangeCondition = (value: string) => {
      setSelectCondition(value);
   };
   const handleChangeValue = (value: string) => {
      setSelectValue(value);
   };
   const handleChangeColumn = (value: string) => {
      setSelectColumn(value);
   };
   const handleChangeCase = (value: string) => {
      setSelectCase(value);
   };
   const handleAddFilter = () => {
      setListFilter((pre) => [...pre, { id: uniqid() }]);
   };
   const handleDelete = (id: string) => {
      setListFilter((pre) => pre.filter((item) => item.id !== id));
   };
   const renderValueColumn = (nameColumn: string) => {
      const statusValues = listColumn
         ?.filter((col) => col.name === nameColumn)[0]
         ?.defaultValues.flatMap((value) => value.value);
      return statusValues;
   };
   const renderFilterColumn = (selectCase:string, condition: string, value:string) => {
      if(selectCase){
         if(selectCase === 'and'){
            const result = renderValueColumn(selectColumn)?.filter(item => item === value && item === value)
         }else if(selectCase === 'or'){
            const result = renderValueColumn(selectColumn)?.filter(item => item === value || item === value)
         }
      }
      
   }
   
   return (
      <div className="table__head">
         <ButtonCustom
            statusType={StatusType.Primary}
            title="New item"
            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
         />
         <ButtonCustom title="Search" leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
         <Tippy position="top" html={<p>Filter by anything</p>}>
            <div className="filter">
               <div className="filter__icon">
                  <img src={icons.filter} alt="" />
               </div>
               <span>Filter</span>
               <div className="filter__icon filter__down">
                  <FontAwesomeIcon icon={faAngleDown} />
               </div>
               <div className="filter__menu">
                  <div className="filter__menu-header">
                     <h3 className="filter__menu-header-heading">Advanced filters</h3>
                     <span>Showing all of 4 tasks</span>
                     <div className="filter__menu-clear">
                        <button className="filter__menu-clear-btn">Clear all</button>
                     </div>
                  </div>

                  <div className="filter__menu-content">
                     <div className="filter__menu-content-item default">
                        <h3>Where</h3>
                        <div className="select__item select__column">
                           <Select
                              style={{ width: 150 }}
                              onChange={handleChangeColumn}
                              placeholder="Column"
                              // optionLabelProp="label"
                           >
                              {newListColumn.map((item) => (
                                 <Option value={item.value}>
                                    <div
                                       className="item__flex"
                                       style={{ width: '100px', display: 'flex', gap: '6px' }}
                                    >
                                       <div
                                          className="item__icon"
                                          style={{
                                             backgroundColor: item.belongType.color,
                                             width: 'max-content',
                                          }}
                                       >
                                          <img
                                             src={item.belongType.icon}
                                             alt=""
                                             style={{ width: '20px', height: '10px' }}
                                          />
                                       </div>
                                       <span>{item.label}</span>
                                    </div>
                                 </Option>
                              ))}
                           </Select>
                        </div>

                        <div className="select__item select__condition">
                           <Select
                              style={{ width: 120 }}
                              onChange={handleChangeCondition}
                              placeholder="Condition"
                              options={[
                                 { value: '===', label: 'is' },
                                 { value: '!==', label: 'is not' },
                              ]}
                           />
                        </div>
                        <div className="select__item select__status">
                           <Select
                              mode="multiple"
                              allowClear
                              placeholder="Value"
                              style={{ width: '400px' }}
                              onChange={handleChangeValue}
                           >
                              {selectColumn &&
                                 renderValueColumn(selectColumn)?.map((item) => (
                                    <Option value={item}>{item}</Option>
                                 ))}
                           </Select>
                        </div>
                        {listFilter.length > 0 && (
                           <div className="select__item item__delete">
                              <img src={icons.deleteTask} alt="" />
                           </div>
                        )}
                     </div>
                     {listFilter.map((item, index) => {
                        return (
                           <div className="filter__menu-content-item" key={index}>
                              <div className="select__item select__column">
                                 <Select
                                    defaultValue="And"
                                    style={{ width: 80 }}
                                    onChange={handleChangeCase}
                                    options={[
                                       { value: 'and', label: 'And' },
                                       { value: 'or', label: 'Or' },
                                    ]}
                                 />
                              </div>
                              <div className="select__item select__column">
                                 <Select
                                    style={{ width: 150 }}
                                    onChange={handleChangeColumn}
                                    placeholder="Column"
                                 >
                                    {newListColumn.map((item) => (
                                       <Option value={item.value}>
                                          <div
                                             className="item__flex"
                                             style={{ width: '100px', display: 'flex', gap: '6px' }}
                                          >
                                             <div
                                                className="item__icon"
                                                style={{
                                                   backgroundColor: item.belongType.color,
                                                   width: 'max-content',
                                                }}
                                             >
                                                <img
                                                   src={item.belongType.icon}
                                                   alt=""
                                                   style={{ width: '20px', height: '10px' }}
                                                />
                                             </div>
                                             <span>{item.label}</span>
                                          </div>
                                       </Option>
                                    ))}
                                 </Select>
                              </div>

                              <div className="select__item select__compare">
                                 <Select
                                    style={{ width: 120 }}
                                    onChange={handleChangeCondition}
                                    placeholder="Condition"
                                    options={[
                                       { value: '===', label: 'is' },
                                       { value: '!==', label: 'is not' },
                                    ]}
                                 />
                              </div>
                              <div className="select__item select__status">
                                 <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Value"
                                    style={{ width: 400 }}
                                    onChange={handleChangeValue}
                                 >
                                    {selectColumn &&
                                       renderValueColumn(selectColumn)?.map((item) => (
                                          <Option value={item}>{item}</Option>
                                       ))}
                                 </Select>
                              </div>
                              <div
                                 className="select__item item__delete"
                                 onClick={() => handleDelete(item.id)}
                              >
                                 <img src={icons.deleteTask} alt="" />
                              </div>
                           </div>
                        );
                     })}
                     <button className="filter__add-btn">
                        <img src={icons.add} alt="" />
                        <span className="filter__add-btn-label" onClick={handleAddFilter}>
                           Add new filter
                        </span>
                     </button>
                  </div>
               </div>
            </div>
         </Tippy>
         <Tippy position="top" html={<p>Sort by any column</p>}>
            <ButtonCustom title="Sort" leftIcon={<FontAwesomeIcon icon={faSort} />} />
         </Tippy>
         <Tippy position="top" html={<p>Hidden columns</p>}>
            <ButtonCustom title="Hide" leftIcon={<FontAwesomeIcon icon={faEyeSlash} />} />
         </Tippy>
      </div>
   );
};

export default HeadView;
