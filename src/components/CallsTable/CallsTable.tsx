// import React from 'react';
// import { Call } from '../../types';
// import { useAppDispatch } from '../../hooks';
// import { deleteCall } from '../../redux/calls/operations';

// import icon from '../../assets/sprite.svg';
// import styles from './CallsTable.module.css';

// type CallsTableProps = {
//   calls: Call[];
//   contactId: string;
// };

// const CallsTable: React.FC<CallsTableProps> = ({ calls, contactId }) => {
//   const dispatch = useAppDispatch();

//   const handleDelete = (callId: string) => {
//     dispatch(deleteCall({ contactId, callId }));
//   };

//   if (calls.length === 0) {
//     return <p style={{ textAlign: 'center', marginTop: 20 }}>No calls</p>;
//   }

//   return (
//     <div className={styles.tableWrapper}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>In/Out</th>
//             <th>Time</th>
//             <th>Duration</th>
//             <th>Description</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {calls.map((call) => (
//             <tr key={call.id}>
//               <td>{call.date}</td>
//               <td>{call.incoming}</td>
//               <td>{call.time}</td>
//               <td>{call.duration}</td>
//               <td>{call.description}</td>
//               <td>
//                 <button className={styles.iconButton}>
//                   <svg className={`${styles.icon}`}>
//                     <use href={`${icon}#icon-pencil`} />
//                   </svg>
//                 </button>
//               </td>
//               <td>
//                 <button
//                   onClick={() => handleDelete(call.id)}
//                   className={styles.iconButton}
//                 >
//                   <svg className={`${styles.icon}`}>
//                     <use href={`${icon}#icon-bin`} />
//                   </svg>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CallsTable;
import React from 'react';
import { Call } from '../../types';
import { useAppDispatch } from '../../hooks';
import { deleteCall } from '../../redux/calls/operations';

import icon from '../../assets/sprite.svg';
import styles from './CallsTable.module.css';

type CallsTableProps = {
  calls: Call[];
  contactId: string;
};

const CallsTable: React.FC<CallsTableProps> = ({ calls, contactId }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (callId: string) => {
    // викликаємо thunk для видалення
    dispatch(deleteCall({ contactId, callId }));
  };

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
            <th>Edit</th>
            <th>Delete</th>
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
              <td>
                <button className={styles.iconButton}>
                  <svg className={`${styles.icon}`}>
                    <use href={`${icon}#icon-pencil`} />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(call.id)}
                  className={styles.iconButton}
                >
                  <svg className={`${styles.icon}`}>
                    <use href={`${icon}#icon-bin`} />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallsTable;
