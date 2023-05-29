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
import { useState } from 'react';
import { useAppDispatch } from '~/config/store';
import { setSearchValueInput } from '~/pages/Board/board.reducer';
import icons from '../../assets/svg/index';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
const arr = new Array()
const HeadView = () => {
   const [focusSearch, setFocusSearch] = useState<boolean>(false);
   const [valueSearch, setValueSearch] = useState<string>('');
   const dispatch = useAppDispatch();
   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueSearch(e.target.value);
      dispatch(setSearchValueInput(e.target.value));
   };

   const options: SelectProps['options'] = [];
   for (let i = 10; i < 36; i++) {
      options.push({
         label: i.toString(36) + i,
         value: i.toString(36) + i,
      });
   }
   const handleChange = (value: string) => {
      console.log(`selected ${value}`);
   };
   return (
      <div className="table__head">
         <ButtonCustom
            statusType={StatusType.Primary}
            title="New item"
            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
         />
         {/* <ButtonCustom title="Search" leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />} /> */}
         <div
            className={`search ${focusSearch ? 'search-active' : ''}`}
            onClick={() => setFocusSearch(true)}
         >
            <div className="search__btn">
               <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
               type="text"
               className="search__input"
               onBlur={() => setFocusSearch(false)}
               placeholder="Search"
               value={valueSearch}
               onChange={handleSearchInput}
            />
         </div>
         <Tippy position="top" html={<p>Filter by anything</p>}>
            <div className="filter">
               <div className="filter__icon">
                  <img src={icons.filter} alt="" />
               </div>
               <span>Filter</span>
               <div className="filter__icon filter__down">
                  <FontAwesomeIcon icon={faAngleDown} />
               </div>
               {/* <div className="filter__menu">
                  <div className="filter__menu-header">
                     <h3 className="filter__menu-header-heading">Advanced filters</h3>
                     <span>Showing all of 4 tasks</span>
                     <div className="filter__menu-clear">
                        <button className="filter__menu-clear-btn">Clear all</button>
                     </div>
                  </div>

                  <div className="filter__menu-content">
                     <div className="filter__menu-content-item default">
                        <span>Where</span>
                        <div className="select__item select__column">
                           <Select
                              defaultValue="Status"
                              style={{ width: 200 }}
                              onChange={handleChange}
                              placeholder="Column"
                              options={[
                                 { value: 'status', label: 'Status' },
                                 { value: 'date', label: 'Date' },
                              ]}
                           />
                        </div>

                        <div className="select__item select__compare">
                           <Select
                              defaultValue="is"
                              style={{ width: 150 }}
                              onChange={handleChange}
                              placeholder="Column"
                              options={[
                                 { value: 'is', label: 'is' },
                                 { value: 'isnot', label: 'is not' },
                              ]}
                           />
                        </div>
                        <div className="select__item select__status">
                           <Select
                              mode="multiple"
                              allowClear
                              placeholder="Please select"
                              style={{ width: 200 }}
                              onChange={handleChange}
                              options={options}
                           />
                        </div>
                     </div>
                     {new Array(2).fill(0).map((item) => {
                        return (
                           <div className="filter__menu-content-item">
                              <div className="select__item select__column">
                                 <Select
                                    defaultValue="And"
                                    style={{ width: 200 }}
                                    onChange={handleChange}
                                    placeholder="Column"
                                    options={[
                                       { value: 'and', label: 'And' },
                                       { value: 'or', label: 'Or' },
                                    ]}
                                 />
                              </div>
                              <div className="select__item select__column">
                                 <Select
                                    defaultValue="Status"
                                    style={{ width: 200 }}
                                    onChange={handleChange}
                                    placeholder="Column"
                                    options={[
                                       { value: 'status', label: 'Status' },
                                       { value: 'date', label: 'Date' },
                                    ]}
                                 />
                              </div>

                              <div className="select__item select__compare">
                                 <Select
                                    defaultValue="is"
                                    style={{ width: 150 }}
                                    onChange={handleChange}
                                    placeholder="Column"
                                    options={[
                                       { value: 'is', label: 'is' },
                                       { value: 'isnot', label: 'is not' },
                                    ]}
                                 />
                              </div>
                              <div className="select__item select__status">
                                 <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Please select"
                                    style={{ width: 200 }}
                                    onChange={handleChange}
                                    options={options}
                                 />
                              </div>
                           </div>
                        );
                     })}
                     <button className="filter__add-btn">
                        <img src={icons.add} alt="" />
                        <span>Add new filter</span>
                     </button>
                  </div>
               </div> */}
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
