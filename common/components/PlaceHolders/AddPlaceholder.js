/* eslint-disable */
import React from 'react'
import { Col, Row, Panel, Glyphicon, Button, FormControl } from 'react-bootstrap'

const AddPlaceholder = () => (
	<Row>
		<Col sm={12}>
			<Row>
				<Col sm={12}>
					<p>
						This is just a placeholder add new content. You could have a form here to add to stuff and things.
						There would be a few things that could go here. For one, you can add new contexts, like the place that a film 
						or a genre has in history. You could bring up things like how Expressionism came about because of the 
						state that Germany was in after war made them broke, the bleak nature of Noir as a result of the 
						realities of war ... apparently, how all genres relate to war.
					</p>
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<FormControl type="text" placeholder="Post Content Goes Here ..." /> 
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<FormControl type="text" placeholder="Here's Another Field ..." />
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<FormControl type="text" placeholder="And Finally This Field ..." />
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<Button type="submit" active>Add New Things</Button>
				</Col>
			</Row>
		</Col>
	</Row>
)

export default AddPlaceholder