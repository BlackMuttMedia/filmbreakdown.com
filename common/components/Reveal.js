/* eslint-disable */
var React = require('react');
import { Modal } from 'react-bootstrap'

export default class extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
	    showModal: false,
	  }
	}

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

	render(){
		var revealStyle = {
			color: '#666666'
		};
		var revealHeader = <h2 style={revealStyle}>{this.props.revealHeader}</h2>;

		return (
			<Modal show={this.state.showModal} onHide={this.close}>
				{ this.props.revealHeader ?
					<Modal.Header closeButton>
						{revealHeader}
					</Modal.Header>
					: null }
				<Modal.Body>
					{this.props.revealContent}
				</Modal.Body>
			</Modal>
		);
	}

	handleClick = (e) => {
		this.open();
	}
}
