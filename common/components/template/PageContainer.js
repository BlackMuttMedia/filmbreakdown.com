import React from 'react'

import { Grid, Row, Col } from 'react-bootstrap'

const PageContainer = (props) => (
  <Grid>
    <Row>
      <Col md={12}>
        {props.children}
      </Col>
    </Row>
  </Grid>
)

export default PageContainer
