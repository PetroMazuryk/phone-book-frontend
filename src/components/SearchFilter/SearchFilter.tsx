import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setNameFilter,
  setPhoneFilter,
} from '../../redux/filters/filtersSlice';
import {
  selectNameFilter,
  selectPhoneFilter,
} from '../../redux/filters/selectors';

import styles from './SearchFilter.module.css';

export const SearchFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectNameFilter);
  const phone = useAppSelector(selectPhoneFilter);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneFilter(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={handleNameChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Search by phone"
        value={phone}
        onChange={handlePhoneChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchFilter;
