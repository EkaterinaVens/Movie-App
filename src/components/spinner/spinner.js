import { Spin } from 'antd';
import './spinner.css';

function Spinner() {
  return (
    <div className="example">
      <Spin size="large">
        <div className="loading">
          Очень скоро появятся нужные вам фильмы, а пока можете заварить себе
          вкусный чай и запастись вкусняшками.
        </div>
      </Spin>
    </div>
  );
}

export default Spinner;
