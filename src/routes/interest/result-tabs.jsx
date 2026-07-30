import classnames from 'classnames';

export const ResultTabs = ({ activeTab, setActiveTab }) => {
  const isTableActive = activeTab === 'table';
  const isGraphActive = activeTab === 'graph';

  const onTableClick = () => setActiveTab('table');
  const onGraphClick = () => setActiveTab('graph');

  return (
    <div className="tabs is-medium">
      <ul>
        <li className={classnames({ 'is-active': isTableActive })}>
          <a onClick={onTableClick}>Table</a>
        </li>
        <li className={classnames({ 'is-active': isGraphActive })}>
          <a onClick={onGraphClick}>Graph</a>
        </li>
      </ul>
    </div>
  );
};
