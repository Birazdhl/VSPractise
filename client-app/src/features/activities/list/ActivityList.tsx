import React, { useContext } from 'react'
import { Item, Segment, Button, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'
import { Link } from 'react-router-dom';

const ActivityList = () => {

    const activityStore = useContext(ActivityStore);
    const {activitesByDate, deleteActivity, target, submitting} = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {activitesByDate.map(activity => (
                    <Item key={activity.id}>

                    <Item.Content>
                      <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                      <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                      </Item.Description>
                      <Item.Extra>
                          <Button 
                          as={Link} to={`/activities/${activity.id}`} 
                          floated='right' 
                          content='View' 
                          color='blue' />
                          
                          <Button 
                          name={activity.id}
                          loading={target === activity.id && submitting}
                          onClick={(e) => deleteActivity(e,activity.id)} 
                          floated='right' content='Delete' color='red' />
                          <Label basic content={activity.category} />

                      </Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
                </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)
