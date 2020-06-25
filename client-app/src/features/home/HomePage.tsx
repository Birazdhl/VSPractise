import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const HomePage = () => {
    return (
        <div>
            <Container style={{marginTop : '7em'}}>
            <h1>Home Page</h1>
            <h3>Goto <Link  to='/activities'>Activities</Link></h3>
            </Container>
        </div>
    )
}

export default HomePage
