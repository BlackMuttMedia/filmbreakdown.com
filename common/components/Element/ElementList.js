/* eslint-disable */
var ElementList = React.createClass({
	render: function() {
		var self = this;
		var Elements = this.props.Elements;
		return (
			<div className="row">
				<div className="small-12 columns">
					{Elements && typeof Elements[0] !== 'undefined' && Elements[0] !== null ? 
						Elements.map(function(Element){
							return <ElementListItem key={Element.id} itemContent={Element.content} showSeparator={self.props.showSeparator} />
						}) : 
						<p>{this.props.defaultText}</p>
					} 
				</div>
			</div>
		);
	}
});
