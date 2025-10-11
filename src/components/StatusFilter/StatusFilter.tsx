import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import { statusFilters } from '../../redux/filters/constants';
import { RootState } from '../../redux/store';
import { setStatusFilter } from '../../redux/filters/filtersSlice';

import styles from './StatusFilter.module.css';

export const StatusFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filters.status);

  const handleFilterChange = (filter: string) => {
    dispatch(setStatusFilter(filter));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Filter by status</h2>
      <CustomButton
        selected={filter === statusFilters.total}
        onClick={() => handleFilterChange(statusFilters.total)}
      >
        Total
      </CustomButton>

      <CustomButton
        selected={filter === statusFilters.favorite}
        onClick={() => handleFilterChange(statusFilters.favorite)}
      >
        Favorite
      </CustomButton>

      <CustomButton
        selected={filter === statusFilters.priority}
        onClick={() => handleFilterChange(statusFilters.priority)}
      >
        Priority
      </CustomButton>
    </div>
  );
};
