/* eslint-disable */
import React from 'react'
import TabbedSidebarItem from './TabbedSidebarItem'
import PostDisplay from '../Post/PostDisplay'
import ElementButtonList from '../Element/ElementButtonList'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

const TabbedSidebar = ({ genreName, elementName, panelStyle }) => (
			<Row style={panelStyle || defaultPanelStyle}>
			  <TabbedSidebarItem contentItem={getElementButtonList(genreName)} heading="Elements" />
			  <TabbedSidebarItem contentItem={postDisplay} moreContent={postMoreContent(genreName, elementName)} fontStyle={fontStyle} heading="Contexts" />
			</Row>
)

const defaultPanelStyle = {
	textShadow: 'none'
}

const fontStyle = {
	color: '#666666'
}

const postMoreContent = (genreName, elementName) =>  
	<div>
		<h2 style={fontStyle}>Summary</h2>
		<PostDisplay genreName={genreName} elementName={elementName} />
		<PostDisplay genreName={genreName} elementName={elementName} />
		<PostDisplay genreName={genreName} elementName={elementName} />
	</div>

var postDisplay = <PostDisplay sidebar={true} />

var getElementButtonList = (genreName) => <ElementButtonList genreName={genreName} heading="Atmosphere" items={['Bleak', 'Dark', 'Chilling', 'Ugly', 'Scary']} />

export default TabbedSidebar