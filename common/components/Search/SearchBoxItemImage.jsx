var React = require('react');

var SearchBoxItemImage = React.createClass({
     render: function() {
        return(<img src={this.props.baseImageUrl + this.props.posterPath} />);
     }
});

module.exports = SearchBoxItemImage;