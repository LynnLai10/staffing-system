import React from 'react'
import { Nav } from 'rsuite'
  
const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect}>
      <Nav.Item eventKey="next" href="/dashboard/schedule/next">
        <h5>Next Schedule</h5>
      </Nav.Item>
      <Nav.Item eventKey="default" href="/dashboard/schedule/default">
        <h5>Default Setting</h5>
      </Nav.Item>
    </Nav>
  );
};

class PanelNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.activeKey
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(activeKey) {
    this.setState({ active: activeKey });
  }
  render() {
    const { active } = this.state;
    return (
      <div>
        <CustomNav appearance="tabs" active={active} onSelect={this.handleSelect} />
      </div>
    );
  }
}

  export default PanelNav