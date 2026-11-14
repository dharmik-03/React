import { useSelector } from 'react-redux';
import { IconActivity } from './Icons';

const RecentActivity = () => {
  const activities = useSelector((state) => state.inventory.activities || []);

  return (
    <div className="activity-panel">
      <div className="panel-header">
        <div className="panel-title-wrap">
          <IconActivity size={16} />
          <h3 className="panel-title">Activity Trail</h3>
        </div>
        <span className="panel-meta">Recent changes</span>
      </div>

      <div className="activity-rows">
        {activities.length === 0 ? (
          <div className="activity-empty">
            <span>No activity recorded yet</span>
          </div>
        ) : (
          activities.slice(0, 6).map((act) => (
            <div key={act.id} className="activity-row">
              <span className={`activity-indicator indicator-${act.type}`} />
              <span className="activity-desc">{act.text}</span>
              <span className="activity-time">{act.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
