import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './index.less';
import { config } from 'utils'
import { Calendar } from 'antd'

function Dashboard({dashboard, dispatch}) {
  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'normal', content: 'This is usual event.' },
        ]; break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'normal', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ]; break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'normal', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ]; break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <span className={`event-${item.type}`}>●</span>
              {item.content}
            </li>
          ))
        }
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div> : null;
  }
  return (
    <div className={styles.dashboard}>
    	<Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    </div>
  );
}

Dashboard.propTypes = {
	dashboard: PropTypes.object,
	dispatch: PropTypes.func,
};

export default connect(({dashboard}) => ({dashboard}))(Dashboard);
