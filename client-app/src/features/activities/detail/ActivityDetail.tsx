import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import activityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

const ActivityDetail: React.FC = () => {

    const acitivtyStore = useContext(activityStore)
    const {selectedActivity : activity, cancelSelectedActivity, openEditForm} = acitivtyStore 

    return (
        <div>
            <Card>
                <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity?.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{activity?.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity?.description}
             </Card.Description>
                </Card.Content>
                <Card.Content extra>
               <Button.Group widths={2}>

                 <Button onClick={() => openEditForm(activity!.id)} basic color='blue' content='Edit'/>
                  
                  <Button onClick={() => cancelSelectedActivity()} basic color='grey' content='Cancel'/>
                  </Button.Group>
                </Card.Content>
            </Card>
        </div>
    )
}

export default observer(ActivityDetail)