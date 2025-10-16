import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CustomButton from '../CustomButton/CustomButton';
import { resetFilters } from '../../redux/filters/filtersSlice';
import { statusFilters } from '../../redux/filters/constants';
import {
  setNameFilter,
  setPhoneFilter,
} from '../../redux/filters/filtersSlice';
import {
  selectNameFilter,
  selectPhoneFilter,
  selectStatusFilter,
} from '../../redux/filters/selectors';

import styles from './SearchFilter.module.css';

export const SearchFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectNameFilter);
  const phone = useAppSelector(selectPhoneFilter);
  const status = useAppSelector(selectStatusFilter);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneFilter(e.target.value));
  };

  const clearName = () => dispatch(setNameFilter(''));
  const clearPhone = () => dispatch(setPhoneFilter(''));

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const filtersChanged =
    name !== '' || phone !== '' || status !== statusFilters.total;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={handleNameChange}
          className={styles.input}
        />
        {name && (
          <button type="button" className={styles.clearBtn} onClick={clearName}>
            ×
          </button>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search by phone"
          value={phone}
          onChange={handlePhoneChange}
          className={styles.input}
        />
        {phone && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearPhone}
          >
            ×
          </button>
        )}
      </div>
      {filtersChanged && (
        <CustomButton
          variant="secondary"
          onClick={handleReset}
          style={{ width: 'auto', whiteSpace: 'nowrap' }}
        >
          Reset all
        </CustomButton>
      )}
    </div>
  );
};

export default SearchFilter;
