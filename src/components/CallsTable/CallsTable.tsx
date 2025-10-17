import React from 'react';
import { Call } from '../../types';

import styles from './CallsTable.module.css';

type CallsTableProps = {
  calls?: Call[];
};

const CallsTable: React.FC<CallsTableProps> = ({ calls = [] }) => {
  if (calls.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: 20 }}>No calls</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>In/Out</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr key={call.id}>
              <td>{call.date}</td>
              <td>{call.incoming}</td>
              <td>{call.time}</td>
              <td>{call.duration}</td>
              <td>{call.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallsTable;
