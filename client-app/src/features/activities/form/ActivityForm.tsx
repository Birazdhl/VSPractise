import React, { useContext, useState, FormEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { IActivity } from '../../../app/Models/activity'
import { Segment, Form, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import {v4 as uuid } from 'uuid' 
import { RouteComponentProps } from 'react-router-dom'


interface DetailParams {
    id:string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {

    const activityStore = useContext(ActivityStore);
    const{createActivity, 
        editActivity, 
        submitting,
        activity: InitializeFormState, 
        loadActivity,
        clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
            id: '',
            title: '',
            category: '',
            description: '',
            date : '',
            city : '',
            venue: ''
    })

    useEffect(() => {
        if(match.params.id && activity.id.length === 0)
        {
            loadActivity(match.params.id)
            .then(() => InitializeFormState && setActivity(InitializeFormState))
        }
        return () => {
            clearActivity()
        }
    }, [loadActivity,clearActivity,match.params.id, InitializeFormState,activity.id.length])
    
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }

    const handleSubmit = () => {
        if(activity.id.length === 0)
        {
            let newActivity = {
                ...activity,
                id: uuid(),
            }
            createActivity(newActivity)
             .then(() => history.push('/activities'))
        } else {
            editActivity(activity)
            .then(() => history.push('/activities'))

        }
    }

    return (
        <Segment clearing>
        <Form onSubmit={handleSubmit}>
            <Form.Input name='title' onChange={handleInputChange} placeholder = 'Title' value={activity.title} />
            <Form.TextArea name='description' onChange={handleInputChange} rows={2} placeholder = 'Description' value={activity.description} />
            <Form.Input name='category' onChange={handleInputChange} placeholder = 'Category' value={activity.category} />
            <Form.Input name='date' onChange={handleInputChange} type='datetime-local' placeholder = 'Date' value={activity.date} />
            <Form.Input name='city' onChange={handleInputChange} placeholder = 'City' value={activity.city} />
            <Form.Input name='venue' onChange={handleInputChange} placeholder = 'Venue' value={activity.venue} />

            <Button loading={submitting}  floated='right' positive type='submit' content='Submit' />
            <Button onClick={() => history.push('/activities')} floated='right' type='button' content='Cancel' />

        </Form>
    </Segment>
    )
}

export default observer(ActivityForm)
