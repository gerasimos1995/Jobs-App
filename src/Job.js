import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import JobsPagination from './JobsPagination'

function Job({job}) {

    const [open, setOpen] = useState(false)
    const [location, setLocation] = useState('')

    useEffect(() => {
        let temp = JSON.stringify(job.location).slice(1, -1)
        console.log("temp: " + temp)
        if (temp.includes(')')){
            let temp2 = temp.split(')')[0]
            temp2 = temp2 + ")"
            console.log("temp2: " + temp2)
            setLocation(temp2)
        }else{
            setLocation(temp)
        }   
    }, [])

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        {/* substring(0, s.indexOf('?') */}
                        <Badge variant="secondary">{location}</Badge>
                        <div style={{wordBreak: 'break-all'}}>
                            <ReactMarkdown source={job.how_to_apply}/>
                        </div>
                    </div>
                    <img className="d-sm-none d-md-block" height="50" width="100" alt={job.company} src={job.company_logo}/>
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} 
                            variant="primary">{open ? "Hide Details" : "View Details"}</Button>
                </Card.Text>
                <Collapse in={open}>
                <div className="mt-4">
                    <ReactMarkdown source={job.description}/>
                </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default Job
