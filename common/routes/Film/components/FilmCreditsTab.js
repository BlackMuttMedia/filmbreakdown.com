/* eslint-disable */
var React = require('react');
var Panel = require('react-bootstrap/lib/Panel');
var Row = require('react-bootstrap/lib/Row');

var FilmCreditTabs = React.createClass({
	render: function() {
		var tabStyle = {
	    textShadow: 'none'
		};

		return (
			<Row style={tabStyle}>
				<ul className="tabs" data-tab>
				  <li className="tab-title active"><a href="#panel11">Tab 1</a></li>
				  <li className="tab-title"><a href="#panel21">Tab 2</a></li>
				  <li className="tab-title"><a href="#panel31">Tab 3</a></li>
				  <li className="tab-title"><a href="#panel41">Tab 4</a></li>
				</ul>
				<div className="tabs-content">
				  <div className="content active" id="panel11">
				    <p>This is the first panel of the basic tab example. You can place all sorts of content here including a grid.</p>
				  </div>
				  <div className="content" id="panel21">
				    <p>This is the second panel of the basic tab example. This is the second panel of the basic tab example.</p>
				  </div>
				  <div className="content" id="panel31">
				    <p>This is the third panel of the basic tab example. This is the third panel of the basic tab example.</p>
				  </div>
				  <div className="content" id="panel41">
				    <p>This is the fourth panel of the basic tab example. This is the fourth panel of the basic tab example.</p>
				  </div>
				</div>
			</Row>
		);
	}
});

module.exports = FilmCreditTabs;